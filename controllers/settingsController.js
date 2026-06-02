import prisma from "../prismaClient.js";

const serializeSettings = (company) => ({
  notify_new_matches: company.notify_new_matches,
  notify_new_messages: company.notify_new_messages,
  notify_verification: company.notify_verification,
  notify_weekly_digest: company.notify_weekly_digest,
  profile_visibility: company.profile_visibility,
  show_trade_volume: company.show_trade_volume
});

export const getMySettings = async (req, res) => {
  try {
    const current_company_id = Number(req.company.company_id);

    const company = await prisma.company.findUnique({
      where: { company_id: current_company_id },
      select: {
        notify_new_matches: true,
        notify_new_messages: true,
        notify_verification: true,
        notify_weekly_digest: true,
        profile_visibility: true,
        show_trade_volume: true
      }
    });

    if (!company) {
      return res.status(404).json({ error: "Company settings not found" });
    }

    return res.status(200).json({
      settings: serializeSettings(company)
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateMySettings = async (req, res) => {
  try {
    const current_company_id = Number(req.company.company_id);
    const {
      notify_new_matches,
      notify_new_messages,
      notify_verification,
      notify_weekly_digest,
      profile_visibility,
      show_trade_volume
    } = req.body;

    const updatedCompany = await prisma.company.update({
      where: { company_id: current_company_id },
      data: {
        ...(notify_new_matches !== undefined ? { notify_new_matches: Boolean(notify_new_matches) } : {}),
        ...(notify_new_messages !== undefined ? { notify_new_messages: Boolean(notify_new_messages) } : {}),
        ...(notify_verification !== undefined ? { notify_verification: Boolean(notify_verification) } : {}),
        ...(notify_weekly_digest !== undefined ? { notify_weekly_digest: Boolean(notify_weekly_digest) } : {}),
        ...(profile_visibility !== undefined ? { profile_visibility: Boolean(profile_visibility) } : {}),
        ...(show_trade_volume !== undefined ? { show_trade_volume: Boolean(show_trade_volume) } : {})
      },
      select: {
        notify_new_matches: true,
        notify_new_messages: true,
        notify_verification: true,
        notify_weekly_digest: true,
        profile_visibility: true,
        show_trade_volume: true
      }
    });

    return res.status(200).json({
      message: "Settings updated successfully",
      settings: serializeSettings(updatedCompany)
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
