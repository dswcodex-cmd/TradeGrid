import prisma from "../prismaClient.js";

const serializePublicCompany = (company) => ({
  company_id: company.company_id,
  company_name: company.company_name,
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

    const companies = await prisma.company.findMany({
      where: {
        company_id: {
          not: current_company_id
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
        ...(search
          ? {
              OR: [
                {
                  company_name: {
                    contains: String(search),
                    mode: "insensitive"
                  }
                },
                {
                  company_description: {
                    contains: String(search),
                    mode: "insensitive"
                  }
                },
                {
                  products: {
                    some: {
                      product: {
                        product_name: {
                          contains: String(search),
                          mode: "insensitive"
                        }
                      }
                    }
                  }
                }
              ]
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
      companies: companies.map(serializePublicCompany)
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

    return res.status(200).json({
      company: serializePublicCompany(company)
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
