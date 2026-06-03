import fs from "fs";
import Groq from "groq-sdk";
import prisma from "../prismaClient.js";

const productIdentifierKey = process.env.GROQ_API_KEY_PI || process.env.GROQ_API_KEY;
const groqProductIdentifier = productIdentifierKey
  ? new Groq({ apiKey: productIdentifierKey })
  : null;

const serializePublicCompany = (company, relationshipStatus = "available") => ({
  company_id: company.company_id,
  company_name: company.company_name,
  relationship_status: relationshipStatus,
  business_type: company.business_type,
  company_description: company.company_description,
  annual_trade_volume: company.show_trade_volume ? company.annual_trade_volume : null,
  number_of_employees: company.number_of_employees,
  year_established: company.year_established,
  website: company.website,
  address: company.address,
  industry: company.industry,
  location: company.location,
  supplied_products: company.products.map((item) => item.product.product_name),
  desired_products: company.desired_products.map((item) => item.product.product_name),
  target_regions: company.regions.map((item) => item.region.region_name)
});

const normalizeModelJson = (value) => {
  const clean = String(value || "")
    .replace(/```json|```/gi, "")
    .trim();

  const opens = (clean.match(/{/g) || []).length;
  const closes = (clean.match(/}/g) || []).length;

  if (opens > closes) {
    return `${clean}${"}".repeat(opens - closes)}`;
  }

  return clean;
};

const parseMatchedNames = (value) => {
  try {
    const clean = String(value || "")
      .replace(/```json|```/gi, "")
      .trim();
    const parsed = JSON.parse(clean);

    return Array.isArray(parsed)
      ? parsed.filter((item) => typeof item === "string")
      : [];
  } catch {
    return [];
  }
};

const loadImageBase64 = (image_base64, image_path) => {
  if (image_base64) {
    return String(image_base64).trim();
  }

  if (image_path) {
    const imageBuffer = fs.readFileSync(String(image_path));
    return imageBuffer.toString("base64");
  }

  return null;
};

const RELATED_SEARCH_TERMS = [
  {
    match: ["banana", "bananas", "fruit", "fruits", "citrus", "apple", "apples", "orange", "oranges", "mango", "mangoes", "grape", "grapes", "berries"],
    terms: ["banana", "fruit", "fruits", "fresh produce", "produce", "food", "agriculture", "agricultural", "grocery", "farm"]
  },
  {
    match: ["maize", "corn", "wheat", "grain", "grains", "rice", "soy", "soybean", "soybeans"],
    terms: ["grain", "grains", "food", "agriculture", "agricultural", "commodities", "farm", "produce"]
  },
  {
    match: ["milk", "cheese", "yogurt", "dairy"],
    terms: ["dairy", "food", "beverage", "agriculture", "farm", "grocery"]
  },
  {
    match: ["shirt", "clothes", "clothing", "fabric", "textile", "textiles", "garment", "garments"],
    terms: ["textile", "textiles", "fabric", "garments", "clothing", "apparel", "manufacturing"]
  },
  {
    match: ["phone", "laptop", "computer", "camera", "electronics", "electronic"],
    terms: ["electronics", "technology", "components", "devices", "manufacturing"]
  },
  {
    match: ["solar", "panel", "battery", "inverter", "energy"],
    terms: ["solar", "energy", "renewable", "electronics", "equipment", "manufacturing"]
  }
];

const expandSearchTerms = (value) => {
  const source = String(value || "").toLowerCase();
  const directTerms = source
    .split(/[^a-z0-9]+/i)
    .map((term) => term.trim())
    .filter((term) => term.length > 1);

  const related = RELATED_SEARCH_TERMS
    .filter((group) => group.match.some((term) => source.includes(term)))
    .flatMap((group) => group.terms);

  return [...new Set([...directTerms, ...related])];
};

const buildCompanySearchOr = (terms) => terms.flatMap((term) => [
  {
    company_name: {
      contains: term,
      mode: "insensitive"
    }
  },
  {
    company_description: {
      contains: term,
      mode: "insensitive"
    }
  },
  {
    business_type: {
      contains: term,
      mode: "insensitive"
    }
  },
  {
    products: {
      some: {
        product: {
          product_name: {
            contains: term,
            mode: "insensitive"
          }
        }
      }
    }
  },
  {
    industry: {
      industry_name: {
        contains: term,
        mode: "insensitive"
      }
    }
  },
  {
    location: {
      country: {
        contains: term,
        mode: "insensitive"
      }
    }
  },
  {
    regions: {
      some: {
        region: {
          region_name: {
            contains: term,
            mode: "insensitive"
          }
        }
      }
    }
  }
]);

const getDiscoverRelationshipData = async (current_company_id) => {
  const [matches, requests] = await Promise.all([
    prisma.companyMatches.findMany({
      where: {
        OR: [
          { company1_id: current_company_id },
          { company2_id: current_company_id }
        ]
      },
      select: {
        company1_id: true,
        company2_id: true
      }
    }),
    prisma.companyTargets.findMany({
      where: {
        OR: [
          { source_company_id: current_company_id },
          { target_company_id: current_company_id }
        ],
        status: {
          in: ["pending", "accepted"]
        }
      },
      select: {
        source_company_id: true,
        target_company_id: true
      }
    })
  ]);

  const relationshipStatus = new Map();

  matches.forEach((match) => {
    const otherId = Number(match.company1_id) === Number(current_company_id)
      ? match.company2_id
      : match.company1_id;
    relationshipStatus.set(Number(otherId), "connected");
  });

  requests.forEach((request) => {
    const otherId = Number(request.source_company_id) === Number(current_company_id)
      ? request.target_company_id
      : request.source_company_id;
    if (!relationshipStatus.has(Number(otherId))) {
      const status = String(request.status || "pending").toLowerCase();
      const direction = Number(request.source_company_id) === Number(current_company_id) ? "sent" : "received";
      relationshipStatus.set(Number(otherId), status === "pending" ? `pending_${direction}` : status);
    }
  });

  return {
    relationshipStatus,
    unavailableCompanyIds: [
      ...new Set([
        current_company_id,
        ...matches.flatMap((match) => [match.company1_id, match.company2_id]),
        ...requests.flatMap((request) => [request.source_company_id, request.target_company_id])
      ])
    ]
  };
};

export const discoverCompanies = async (req, res) => {
  try {
    const current_company_id = Number(req.company.company_id);
    const {
      search,
      business_type,
      industry,
      country,
      supplied_product,
      desired_product,
      region
    } = req.query;
    const searchTerms = expandSearchTerms(search);
    const { relationshipStatus, unavailableCompanyIds } = await getDiscoverRelationshipData(current_company_id);

    const excludedCompanyIds = searchTerms.length ? [current_company_id] : unavailableCompanyIds;

    const companies = await prisma.company.findMany({
      where: {
        company_id: {
          notIn: excludedCompanyIds
        },
        account_status: "active",
        profile_visibility: true,
        ...(business_type ? { business_type } : {}),
        ...(industry
          ? {
              industry: {
                industry_name: {
                  contains: String(industry),
                  mode: "insensitive"
                }
              }
            }
          : {}),
        ...(country
          ? {
              location: {
                country: {
                  contains: String(country),
                  mode: "insensitive"
                }
              }
            }
          : {}),
        ...(searchTerms.length
          ? {
              OR: buildCompanySearchOr(searchTerms)
            }
          : {}),
        ...(supplied_product
          ? {
              products: {
                some: {
                  product: {
                    product_name: {
                      contains: String(supplied_product),
                      mode: "insensitive"
                    }
                  }
                }
              }
            }
          : {}),
        ...(desired_product
          ? {
              desired_products: {
                some: {
                  product: {
                    product_name: {
                      contains: String(desired_product),
                      mode: "insensitive"
                    }
                  }
                }
              }
            }
          : {}),
        ...(region
          ? {
              regions: {
                some: {
                  region: {
                    region_name: {
                      contains: String(region),
                      mode: "insensitive"
                    }
                  }
                }
              }
            }
          : {})
      },
      include: {
        industry: true,
        location: true,
        products: {
          include: {
            product: true
          }
        },
        desired_products: {
          include: {
            product: true
          }
        },
        regions: {
          include: {
            region: true
          }
        }
      },
      orderBy: {
        created_at: "desc"
      }
    });

    return res.status(200).json({
      companies: companies.map((company) =>
        serializePublicCompany(company, relationshipStatus.get(Number(company.company_id)) || "available")
      )
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getPublicCompanyProfile = async (req, res) => {
  try {
    const current_company_id = Number(req.company.company_id);
    const company_id = Number(req.params.companyId);

    if (Number.isNaN(company_id)) {
      return res.status(400).json({ error: "companyId must be a valid number" });
    }

    if (company_id === current_company_id) {
      return res.status(400).json({ error: "Use /profile/me to view your own company profile" });
    }

    const company = await prisma.company.findFirst({
      where: {
        company_id,
        account_status: "active",
        profile_visibility: true
      },
      include: {
        industry: true,
        location: true,
        products: {
          include: {
            product: true
          }
        },
        desired_products: {
          include: {
            product: true
          }
        },
        regions: {
          include: {
            region: true
          }
        }
      }
    });

    if (!company) {
      return res.status(404).json({ error: "Company profile not found" });
    }

    await prisma.profileView.create({
      data: {
        viewed_company_id: company_id,
        viewer_company_id: current_company_id,
        viewer_ip: req.ip || null,
        user_agent: req.get("user-agent") || null
      }
    });

    return res.status(200).json({
      company: serializePublicCompany(company)
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const discoverCompaniesByImage = async (req, res) => {
  try {
    if (!groqProductIdentifier) {
      return res.status(500).json({
        error: "GROQ_API_KEY_PI or GROQ_API_KEY is not configured"
      });
    }

    const current_company_id = Number(req.company.company_id);
    const { image_base64, image_path, mime_type = "image/jpeg" } = req.body;
    const encodedImage = loadImageBase64(image_base64, image_path);

    if (!encodedImage) {
      return res.status(400).json({
        error: "Provide image_base64 or image_path"
      });
    }

    const aiResponse = await groqProductIdentifier.chat.completions.create({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      max_tokens: 500,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: {
                url: `data:${mime_type};base64,${encodedImage}`
              }
            },
            {
              type: "text",
              text: `Identify the product in this image. Return ONLY a raw JSON object in this exact shape: {"product_name":"..."}`
            }
          ]
        }
      ]
    });

    const identifiedProduct = JSON.parse(
      normalizeModelJson(aiResponse.choices?.[0]?.message?.content)
    );
    const productName = String(identifiedProduct?.product_name || "").trim();

    if (!productName) {
      return res.status(422).json({
        error: "The image could not be identified as a product"
      });
    }

    const allProducts = await prisma.product.findMany({
      select: {
        product_id: true,
        product_name: true
      },
      orderBy: {
        product_name: "asc"
      }
    });

    if (allProducts.length === 0) {
      return res.status(404).json({
        product_name: productName,
        matched_products: [],
        companies: []
      });
    }

    const productList = allProducts.map((product) => `- ${product.product_name}`).join("\n");

    const matchResponse = await groqProductIdentifier.chat.completions.create({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      max_tokens: 500,
      messages: [
        {
          role: "user",
          content: `The user is searching for companies that supply: "${productName}"

Here is a list of products in our database:
${productList}

Your job: decide which of these database products are related to or fall under what the user is looking for.
A product is related if it is the same thing, a type of it, a part of it, or serves the same purpose.

Return ONLY a raw JSON array of the matching product names.
If none are related return an empty array: []`
        }
      ]
    });

    const aiMatchedNames = parseMatchedNames(matchResponse.choices?.[0]?.message?.content);
    const exactMatches = allProducts
      .filter((product) =>
        product.product_name.toLowerCase().includes(productName.toLowerCase())
      )
      .map((product) => product.product_name);

    const allMatchedNames = [...new Set([...aiMatchedNames, ...exactMatches])];

    const matchedProducts = allProducts.filter((product) =>
      allMatchedNames.some(
        (name) => name.toLowerCase() === product.product_name.toLowerCase()
      )
    );
    const matchedProductIds = matchedProducts.map((product) => product.product_id);
    const { unavailableCompanyIds } = await getDiscoverRelationshipData(current_company_id);
    const relatedTerms = expandSearchTerms([productName, ...allMatchedNames].join(" "));
    const relatedSearchOr = buildCompanySearchOr(relatedTerms);

    const companies = await prisma.company.findMany({
      where: {
        company_id: {
              notIn: unavailableCompanyIds.map(Number)        
            },
        account_status: "active",
        profile_visibility: true,
        OR: [
          ...(matchedProductIds.length
            ? [{
                products: {
                  some: {
                    product_id: {
                      in: matchedProductIds
                    }
                  }
                }
              }]
            : []),
          ...relatedSearchOr
        ]
      },
      include: {
        industry: true,
        location: true,
        products: {
          include: {
            product: true
          }
        },
        desired_products: {
          include: {
            product: true
          }
        },
        regions: {
          include: {
            region: true
          }
        }
      },
      orderBy: {
        company_name: "asc"
      }
    });

    const companiesWithMatches = companies.map((company) => {
      const companyMatchedProducts = company.products
        .map((item) => item.product.product_name)
        .filter((name) =>
          allMatchedNames.some((matched) => matched.toLowerCase() === name.toLowerCase()) ||
          relatedTerms.some((term) => name.toLowerCase().includes(term.toLowerCase()))
        );

      return {
        ...serializePublicCompany(company),
        matched_products: companyMatchedProducts
      };
    });

    return res.status(200).json({
      product_name: productName,
      matched_products: matchedProducts.map((product) => product.product_name),
      companies: companiesWithMatches
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
