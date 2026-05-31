import prisma from "../prismaClient.js";

const serializeCompanyForMatch = (company) => ({
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

const toLowerSet = (values) => new Set(values.map((value) => value.toLowerCase()));

const getOverlap = (leftSet, rightSet) => {
  const overlap = [];

  for (const item of leftSet) {
    if (rightSet.has(item)) {
      overlap.push(item);
    }
  }

  return overlap;
};

const clampPercent = (value) => Math.max(0, Math.min(100, Math.round(value)));

const deterministicRandomPercent = (leftId, rightId) => {
  const seed = `${Math.min(leftId, rightId)}:${Math.max(leftId, rightId)}`;
  let hash = 0;

  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) % 101;
  }

  return hash;
};

const normalizeVolume = (value) => String(value || "").trim().toLowerCase();

const calculateVolumeCompatibility = (leftVolume, rightVolume) => {
  const left = normalizeVolume(leftVolume);
  const right = normalizeVolume(rightVolume);

  if (!left || !right) return 0;
  if (left === right) return 100;

  return 50;
};

export const getMatches = async (req, res) => {
  try {
    const current_company_id = Number(req.company.company_id);

    const currentCompany = await prisma.company.findUnique({
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

    if (!currentCompany) {
      return res.status(404).json({ error: "Current company not found" });
    }

    const candidateCompanies = await prisma.company.findMany({
      where: {
        company_id: {
          not: current_company_id
        },
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

    const mySuppliedProducts = currentCompany.products.map((item) => item.product.product_name);
    const myDesiredProducts = currentCompany.desired_products.map((item) => item.product.product_name);
    const myRegions = currentCompany.regions.map((item) => item.region.region_name);

    const mySuppliedSet = toLowerSet(mySuppliedProducts);
    const myDesiredSet = toLowerSet(myDesiredProducts);
    const myRegionSet = toLowerSet(myRegions);

    const matches = candidateCompanies
      .map((candidate) => {
        const candidateSuppliedProducts = candidate.products.map((item) => item.product.product_name);
        const candidateDesiredProducts = candidate.desired_products.map((item) => item.product.product_name);
        const candidateRegions = candidate.regions.map((item) => item.region.region_name);

        const candidateSuppliedSet = toLowerSet(candidateSuppliedProducts);
        const candidateDesiredSet = toLowerSet(candidateDesiredProducts);
        const candidateRegionSet = toLowerSet(candidateRegions);

        const offeredToWantedOverlap = getOverlap(candidateSuppliedSet, myDesiredSet);
        const wantedFromOfferedOverlap = getOverlap(candidateDesiredSet, mySuppliedSet);
        const sharedRegions = getOverlap(candidateRegionSet, myRegionSet);
        const sameIndustry = Boolean(
          currentCompany.industry?.industry_name &&
          candidate.industry?.industry_name &&
          currentCompany.industry.industry_name.toLowerCase() === candidate.industry.industry_name.toLowerCase()
        );

        const productSignals = offeredToWantedOverlap.length + wantedFromOfferedOverlap.length;
        const productPossible = Math.max(myDesiredProducts.length + mySuppliedProducts.length, 1);
        const productCompatibility = clampPercent((productSignals / productPossible) * 100);
        const regionCompatibility = myRegions.length
          ? clampPercent((sharedRegions.length / myRegions.length) * 100)
          : 0;
        const volumeCompatibility = calculateVolumeCompatibility(
          currentCompany.annual_trade_volume,
          candidate.annual_trade_volume
        );
        const randomCompatibility = deterministicRandomPercent(current_company_id, candidate.company_id);
        const hasCompatibilitySignal = productSignals > 0 || sharedRegions.length > 0 || volumeCompatibility > 0 || sameIndustry;

        const score = clampPercent(
          (productCompatibility * 0.5) +
          (regionCompatibility * 0.25) +
          (volumeCompatibility * 0.1) +
          (randomCompatibility * 0.15)
        );

        return {
          company: serializeCompanyForMatch(candidate),
          match_score: score,
          match_reasons: {
            offered_to_wanted_overlap: offeredToWantedOverlap,
            wanted_from_offered_overlap: wantedFromOfferedOverlap,
            shared_regions: sharedRegions,
            same_industry: sameIndustry,
            has_compatibility_signal: hasCompatibilitySignal,
            compatibility_breakdown: {
              product_compatibility: productCompatibility,
              trade_region_compatibility: regionCompatibility,
              volume_range_compatibility: volumeCompatibility,
              random_compatibility: randomCompatibility,
              weights: {
                product_compatibility: 50,
                trade_region_compatibility: 25,
                volume_range_compatibility: 10,
                random_compatibility: 15
              }
            }
          }
        };
      })
      .filter((match) => match.match_reasons.has_compatibility_signal)
      .sort((left, right) => right.match_score - left.match_score);

    return res.status(200).json({
      company_id: current_company_id,
      matches
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
