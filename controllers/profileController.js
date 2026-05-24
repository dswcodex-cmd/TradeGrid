import prisma from "../prismaClient.js";

const parseCommaSeparatedValues = (input) => {
  if (!input || typeof input !== "string") {
    return [];
  }

  return [...new Set(
    input
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean)
  )];
};

const ensureProducts = async (names) => {
  if (!names.length) {
    return [];
  }

  const existingProducts = await prisma.product.findMany({
    where: {
      product_name: {
        in: names
      }
    }
  });

  const existingMap = new Map(
    existingProducts.map((product) => [product.product_name.toLowerCase(), product])
  );

  const missingNames = names.filter(
    (name) => !existingMap.has(name.toLowerCase())
  );

  if (missingNames.length) {
    await prisma.product.createMany({
      data: missingNames.map((name) => ({
        product_name: name
      })),
      skipDuplicates: true
    });
  }

  return prisma.product.findMany({
    where: {
      product_name: {
        in: names
      }
    }
  });
};

const ensureRegions = async (names) => {
  if (!names.length) {
    return [];
  }

  const existingRegions = await prisma.region.findMany({
    where: {
      region_name: {
        in: names
      }
    }
  });

  const existingMap = new Map(
    existingRegions.map((region) => [region.region_name.toLowerCase(), region])
  );

  const missingNames = names.filter(
    (name) => !existingMap.has(name.toLowerCase())
  );

  if (missingNames.length) {
    await prisma.region.createMany({
      data: missingNames.map((name) => ({
        region_name: name
      })),
      skipDuplicates: true
    });
  }

  return prisma.region.findMany({
    where: {
      region_name: {
        in: names
      }
    }
  });
};

const resolveEmployeeCount = (rawValue) => {
  if (rawValue === undefined || rawValue === null || rawValue === "") {
    return null;
  }

  if (typeof rawValue === "number") {
    return rawValue;
  }

  if (typeof rawValue === "string") {
    if (rawValue.includes("+")) {
      return Number(rawValue.replace("+", "")) || null;
    }

    if (rawValue.includes("-")) {
      const upperBound = rawValue.split("-")[1];
      return Number(upperBound) || null;
    }

    return Number(rawValue) || null;
  }

  return null;
};

const resolveYearEstablished = (rawValue) => {
  if (!rawValue) {
    return null;
  }

  if (typeof rawValue === "number") {
    return rawValue;
  }

  if (typeof rawValue === "string") {
    const dateMatch = rawValue.match(/^(\d{4})/);
    if (dateMatch) {
      return Number(dateMatch[1]);
    }

    return Number(rawValue) || null;
  }

  return null;
};

const serializeCompanyProfile = (company) => ({
  company_id: company.company_id,
  company_name: company.company_name,
  registration_number: company.registration_number,
  email: company.email,
  business_type: company.business_type,
  phone: company.phone,
  website: company.website,
  address: company.address,
  annual_trade_volume: company.annual_trade_volume,
  looking_for_description: company.looking_for_description,
  profile_visibility: company.profile_visibility,
  show_trade_volume: company.show_trade_volume,
  number_of_employees: company.number_of_employees,
  year_established: company.year_established,
  company_description: company.company_description,
  industry: company.industry,
  location: company.location,
  supplied_products: company.products.map((item) => item.product.product_name),
  desired_products: company.desired_products.map((item) => item.product.product_name),
  target_regions: company.regions.map((item) => item.region.region_name)
});

export const getMyProfile = async (req, res) => {
  try {
    const current_company_id = Number(req.company.company_id);

    const company = await prisma.company.findUnique({
      where: { company_id: current_company_id },
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
      profile: serializeCompanyProfile(company)
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateMyProfile = async (req, res) => {
  try {
    const current_company_id = Number(req.company.company_id);
    const {
      company_name,
      email,
      business_type,
      phone,
      website,
      address,
      annual_trade_volume,
      number_of_employees,
      year_established,
      company_description,
      looking_for_description,
      profile_visibility,
      show_trade_volume
    } = req.body;

    const updatedCompany = await prisma.company.update({
      where: { company_id: current_company_id },
      data: {
        ...(company_name !== undefined ? { company_name } : {}),
        ...(email !== undefined ? { email } : {}),
        ...(business_type !== undefined ? { business_type } : {}),
        ...(phone !== undefined ? { phone } : {}),
        ...(website !== undefined ? { website } : {}),
        ...(address !== undefined ? { address } : {}),
        ...(annual_trade_volume !== undefined ? { annual_trade_volume } : {}),
        ...(number_of_employees !== undefined
          ? { number_of_employees: resolveEmployeeCount(number_of_employees) }
          : {}),
        ...(year_established !== undefined
          ? { year_established: resolveYearEstablished(year_established) }
          : {}),
        ...(company_description !== undefined ? { company_description } : {}),
        ...(looking_for_description !== undefined ? { looking_for_description } : {}),
        ...(profile_visibility !== undefined ? { profile_visibility: Boolean(profile_visibility) } : {}),
        ...(show_trade_volume !== undefined ? { show_trade_volume: Boolean(show_trade_volume) } : {})
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

    return res.status(200).json({
      message: "Profile updated successfully",
      profile: serializeCompanyProfile(updatedCompany)
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteMyProfile = async (req, res) => {
  try {
    const current_company_id = Number(req.company.company_id);

    await prisma.$transaction([
      prisma.notification.deleteMany({
        where: {
          OR: [
            { company_id: current_company_id },
            { related_company_id: current_company_id }
          ]
        }
      }),
      prisma.message.deleteMany({
        where: {
          OR: [
            { sender_company_id: current_company_id },
            { receiver_company_id: current_company_id }
          ]
        }
      }),
      prisma.conversation.deleteMany({
        where: {
          OR: [
            { company1_id: current_company_id },
            { company2_id: current_company_id }
          ]
        }
      }),
      prisma.companyMatches.deleteMany({
        where: {
          OR: [
            { company1_id: current_company_id },
            { company2_id: current_company_id }
          ]
        }
      }),
      prisma.companyTargets.deleteMany({
        where: {
          OR: [
            { source_company_id: current_company_id },
            { target_company_id: current_company_id }
          ]
        }
      }),
      prisma.companyProducts.deleteMany({
        where: { company_id: current_company_id }
      }),
      prisma.companyDesiredProducts.deleteMany({
        where: { company_id: current_company_id }
      }),
      prisma.companyRegions.deleteMany({
        where: { company_id: current_company_id }
      }),
      prisma.payment.deleteMany({
        where: {
          OR: [
            { payer_company_id: current_company_id },
            { recipient_company_id: current_company_id }
          ]
        }
      }),
      prisma.enquiry.deleteMany({
        where: {
          OR: [
            { sender_company_id: current_company_id },
            { recipient_company_id: current_company_id }
          ]
        }
      }),
      prisma.company.delete({
        where: { company_id: current_company_id }
      })
    ]);

    return res.status(200).json({
      message: "Company profile deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getMyProfileViewStats = async (req, res) => {
  try {
    const current_company_id = Number(req.company.company_id);
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - 7);
    const previousWeekStart = new Date(now);
    previousWeekStart.setDate(now.getDate() - 14);

    const [
      total,
      thisWeek,
      previousWeek,
      recentViews
    ] = await Promise.all([
      prisma.profileView.count({
        where: { viewed_company_id: current_company_id }
      }),
      prisma.profileView.count({
        where: {
          viewed_company_id: current_company_id,
          viewed_at: { gte: weekStart }
        }
      }),
      prisma.profileView.count({
        where: {
          viewed_company_id: current_company_id,
          viewed_at: {
            gte: previousWeekStart,
            lt: weekStart
          }
        }
      }),
      prisma.profileView.findMany({
        where: { viewed_company_id: current_company_id },
        orderBy: { viewed_at: "desc" },
        take: 10,
        include: {
          viewer_company: {
            select: {
              company_id: true,
              company_name: true,
              business_type: true
            }
          }
        }
      })
    ]);

    return res.status(200).json({
      total,
      this_week: thisWeek,
      previous_week: previousWeek,
      change_this_week: thisWeek - previousWeek,
      recent_views: recentViews.map((view) => ({
        profile_view_id: view.profile_view_id,
        viewed_at: view.viewed_at,
        viewer_company: view.viewer_company
      }))
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const completeOnboardingProfile = async (req, res) => {
  try {
    const current_company_id = Number(req.company.company_id);
    const {
      update_mode = "append",
      phone,
      website,
      address,
      annual_trade_volume,
      number_of_employees,
      year_established,
      company_description,
      looking_for_description,
      products,
      desired_products,
      regions,
      industry_name,
      country
    } = req.body;

    const normalizedUpdateMode = String(update_mode).toLowerCase() === "replace" ? "replace" : "append";

    const offeredProductNames = parseCommaSeparatedValues(products);
    const desiredProductNames = parseCommaSeparatedValues(desired_products);
    const regionNames = Array.isArray(regions)
      ? [...new Set(regions.map((value) => String(value).trim()).filter(Boolean))]
      : parseCommaSeparatedValues(regions);

    const [offeredProducts, desiredProducts, regionRecords] = await Promise.all([
      ensureProducts(offeredProductNames),
      ensureProducts(desiredProductNames),
      ensureRegions(regionNames)
    ]);

    let industry_id = null;
    if (industry_name) {
      const existingIndustry = await prisma.industry.upsert({
        where: { industry_name },
        update: {},
        create: { industry_name }
      });
      industry_id = existingIndustry.industry_id;
    }

    let location_id = null;
    if (country) {
      const existingLocation = await prisma.location.findFirst({
        where: { country }
      });

      const location = existingLocation || await prisma.location.create({
        data: { country }
      });

      location_id = location.location_id;
    }

    await prisma.company.update({
      where: { company_id: current_company_id },
      data: {
        ...(phone !== undefined ? { phone: phone || null } : {}),
        ...(website !== undefined ? { website: website || null } : {}),
        ...(address !== undefined ? { address: address || null } : {}),
        ...(annual_trade_volume !== undefined ? { annual_trade_volume: annual_trade_volume || null } : {}),
        ...(number_of_employees !== undefined ? { number_of_employees: resolveEmployeeCount(number_of_employees) } : {}),
        ...(year_established !== undefined ? { year_established: resolveYearEstablished(year_established) } : {}),
        ...(company_description !== undefined ? { company_description: company_description || null } : {}),
        ...(looking_for_description !== undefined ? { looking_for_description: looking_for_description || null } : {}),
        ...(industry_name !== undefined ? { industry_id } : {}),
        ...(country !== undefined ? { location_id } : {})
      }
    });

    if (normalizedUpdateMode === "replace") {
      const deleteOperations = [];
      if (products !== undefined) {
        deleteOperations.push(prisma.companyProducts.deleteMany({
          where: { company_id: current_company_id }
        }));
      }
      if (desired_products !== undefined) {
        deleteOperations.push(prisma.companyDesiredProducts.deleteMany({
          where: { company_id: current_company_id }
        }));
      }
      if (regions !== undefined) {
        deleteOperations.push(prisma.companyRegions.deleteMany({
          where: { company_id: current_company_id }
        }));
      }
      if (deleteOperations.length) {
        await prisma.$transaction(deleteOperations);
      }
    }

    if (offeredProducts.length) {
      await prisma.companyProducts.createMany({
        data: offeredProducts.map((product) => ({
          company_id: current_company_id,
          product_id: product.product_id
        })),
        skipDuplicates: true
      });
    }

    if (desiredProducts.length) {
      await prisma.companyDesiredProducts.createMany({
        data: desiredProducts.map((product) => ({
          company_id: current_company_id,
          product_id: product.product_id
        })),
        skipDuplicates: true
      });
    }

    if (regionRecords.length) {
      await prisma.companyRegions.createMany({
        data: regionRecords.map((region) => ({
          company_id: current_company_id,
          region_id: region.region_id
        })),
        skipDuplicates: true
      });
    }

    const updatedCompany = await prisma.company.findUnique({
      where: { company_id: current_company_id },
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

    return res.status(200).json({
      message: `Profile and onboarding details saved successfully using ${normalizedUpdateMode} mode`,
      profile: serializeCompanyProfile(updatedCompany)
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
