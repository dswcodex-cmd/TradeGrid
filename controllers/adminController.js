import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js";

const ADMIN_ROLES = new Set(["superadmin", "admin", "employee"]);

const serializeAdminAccount = (admin) => ({
  admin_id: admin.admin_id,
  full_name: admin.full_name,
  email: admin.email,
  role: admin.role,
  is_active: admin.is_active,
  created_at: admin.created_at,
  updated_at: admin.updated_at,
  last_login_at: admin.last_login_at
});

const serializeCompanySummary = (company) => ({
  company_id: company.company_id,
  company_name: company.company_name,
  registration_number: company.registration_number,
  email: company.email,
  account_status: company.account_status,
  suspension_reason: company.suspension_reason,
  admin_notes: company.admin_notes,
  is_email_verified: company.is_email_verified,
  business_type: company.business_type,
  phone: company.phone,
  website: company.website,
  profile_visibility: company.profile_visibility,
  created_at: company.created_at,
  industry: company.industry,
  location: company.location,
  verification_documents_count: company._count?.verification_documents ?? 0
});

const serializeVerificationDocument = (document) => ({
  verification_document_id: document.verification_document_id,
  company_id: document.company_id,
  reviewed_by_admin_id: document.reviewed_by_admin_id,
  document_type: document.document_type,
  file_name: document.file_name,
  file_url: document.file_url,
  notes: document.notes,
  status: document.status,
  review_notes: document.review_notes,
  submitted_at: document.submitted_at,
  reviewed_at: document.reviewed_at,
  created_at: document.created_at,
  updated_at: document.updated_at,
  company: document.company
    ? {
        company_id: document.company.company_id,
        company_name: document.company.company_name,
        email: document.company.email,
        registration_number: document.company.registration_number
      }
    : null,
  reviewed_by_admin: document.reviewed_by_admin
    ? {
        admin_id: document.reviewed_by_admin.admin_id,
        full_name: document.reviewed_by_admin.full_name,
        email: document.reviewed_by_admin.email,
        role: document.reviewed_by_admin.role
      }
    : null
});

const parseBooleanFilter = (value) => {
  if (value === undefined) {
    return undefined;
  }

  if (typeof value === "boolean") {
    return value;
  }

  const normalized = String(value).trim().toLowerCase();
  if (normalized === "true") {
    return true;
  }

  if (normalized === "false") {
    return false;
  }

  return undefined;
};

const issueAdminToken = (admin) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.sign(
    {
      admin_id: admin.admin_id,
      email: admin.email,
      role: admin.role
    },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );
};

const validateAdminRole = (value) => {
  const normalizedRole = String(value || "").trim().toLowerCase();
  return ADMIN_ROLES.has(normalizedRole) ? normalizedRole : null;
};

export const bootstrapAdmin = async (req, res) => {
  try {
    const bootstrapKey = req.headers["x-admin-key"];

    if (!process.env.ADMIN_API_KEY) {
      return res.status(500).json({ error: "ADMIN_API_KEY is not configured" });
    }

    if (!bootstrapKey || bootstrapKey !== process.env.ADMIN_API_KEY) {
      return res.status(403).json({ error: "Valid x-admin-key is required for bootstrap" });
    }

    const existingAdminCount = await prisma.admin.count();
    if (existingAdminCount > 0) {
      return res.status(409).json({ error: "Bootstrap is no longer available because staff accounts already exist" });
    }

    const { full_name, email, password } = req.body;

    if (!full_name || !email || !password) {
      return res.status(400).json({ error: "full_name, email, and password are required" });
    }
 
    const password_hash = await bcrypt.hash(password, 10);

    const admin = await prisma.admin.create({
      data: {
        full_name,
        email,
        password_hash,
        role: "superadmin"
      }
    });

    return res.status(201).json({
      message: "Superadmin bootstrap completed successfully",
      admin: serializeAdminAccount(admin)
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "email and password are required" });
    }

    const admin = await prisma.admin.findUnique({
      where: { email }
    });

    if (!admin) {
      return res.status(401).json({ error: "Invalid admin credentials" });
    }

    if (!admin.is_active) {
      return res.status(403).json({ error: "Admin account is inactive" });
    }

    const isMatch = await bcrypt.compare(password, admin.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid admin credentials" });
    }

    await prisma.admin.update({
      where: { admin_id: admin.admin_id },
      data: {
        last_login_at: new Date()
      }
    });

    const token = issueAdminToken(admin);

    return res.status(200).json({
      message: "Admin login successful",
      token,
      admin: serializeAdminAccount(admin)
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getMyAdminProfile = async (req, res) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: {
        admin_id: Number(req.admin.admin_id)
      }
    });

    if (!admin) {
      return res.status(404).json({ error: "Admin account not found" });
    }

    return res.status(200).json({
      admin: serializeAdminAccount(admin)
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAdminStaff = async (req, res) => {
  try {
    const { search, role, is_active } = req.query;
    const activeFilter = parseBooleanFilter(is_active);

    const staff = await prisma.admin.findMany({
      where: {
        ...(search
          ? {
              OR: [
                { full_name: { contains: String(search), mode: "insensitive" } },
                { email: { contains: String(search), mode: "insensitive" } }
              ]
            }
          : {}),
        ...(role ? { role: String(role).trim().toLowerCase() } : {}),
        ...(activeFilter !== undefined ? { is_active: activeFilter } : {})
      },
      orderBy: {
        created_at: "desc"
      }
    });

    return res.status(200).json({
      staff: staff.map(serializeAdminAccount)
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const createAdminStaff = async (req, res) => {
  try {
    const { full_name, email, password, role = "employee" } = req.body;
    const normalizedRole = validateAdminRole(role);

    if (!full_name || !email || !password) {
      return res.status(400).json({ error: "full_name, email, password, and role are required" });
    }

    if (!normalizedRole) {
      return res.status(400).json({ error: "role must be superadmin, admin, or employee" });
    }

    const existingAdmin = await prisma.admin.findUnique({
      where: { email }
    });

    if (existingAdmin) {
      return res.status(400).json({ error: "A staff account with that email already exists" });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const admin = await prisma.admin.create({
      data: {
        full_name,
        email,
        password_hash,
        role: normalizedRole
      }
    });

    return res.status(201).json({
      message: "Staff account created successfully",
      admin: serializeAdminAccount(admin)
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateAdminStaff = async (req, res) => {
  try {
    const admin_id = Number(req.params.adminId);
    const {
      full_name,
      role,
      is_active,
      password
    } = req.body;

    if (Number.isNaN(admin_id)) {
      return res.status(400).json({ error: "adminId must be a valid number" });
    }

    const existingAdmin = await prisma.admin.findUnique({
      where: { admin_id }
    });

    if (!existingAdmin) {
      return res.status(404).json({ error: "Staff account not found" });
    }

    if (existingAdmin.admin_id === req.admin.admin_id && is_active === false) {
      return res.status(400).json({ error: "You cannot deactivate your own account" });
    }

    const normalizedRole = role !== undefined ? validateAdminRole(role) : undefined;
    if (role !== undefined && !normalizedRole) {
      return res.status(400).json({ error: "role must be superadmin, admin, or employee" });
    }

    const updatedAdmin = await prisma.admin.update({
      where: { admin_id },
      data: {
        ...(full_name !== undefined ? { full_name } : {}),
        ...(normalizedRole ? { role: normalizedRole } : {}),
        ...(is_active !== undefined ? { is_active: Boolean(is_active) } : {}),
        ...(password ? { password_hash: await bcrypt.hash(password, 10) } : {})
      }
    });

    return res.status(200).json({
      message: "Staff account updated successfully",
      admin: serializeAdminAccount(updatedAdmin)
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAdminCompanies = async (req, res) => {
  try {
    const {
      search,
      account_status,
      is_email_verified,
      business_type
    } = req.query;

    const verifiedFilter = parseBooleanFilter(is_email_verified);

    const companies = await prisma.company.findMany({
      where: {
        ...(search
          ? {
              OR: [
                { company_name: { contains: search, mode: "insensitive" } },
                { email: { contains: search, mode: "insensitive" } },
                { registration_number: { contains: search, mode: "insensitive" } }
              ]
            }
          : {}),
        ...(account_status ? { account_status } : {}),
        ...(business_type ? { business_type } : {}),
        ...(verifiedFilter !== undefined ? { is_email_verified: verifiedFilter } : {})
      },
      include: {
        industry: true,
        location: true,
        _count: {
          select: {
            verification_documents: true
          }
        }
      },
      orderBy: {
        created_at: "desc"
      }
    });

    return res.status(200).json({
      companies: companies.map(serializeCompanySummary)
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAdminCompanyById = async (req, res) => {
  try {
    const company_id = Number(req.params.companyId);

    if (Number.isNaN(company_id)) {
      return res.status(400).json({ error: "companyId must be a valid number" });
    }

    const company = await prisma.company.findUnique({
      where: { company_id },
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
        },
        verification_documents: {
          include: {
            reviewed_by_admin: true
          },
          orderBy: {
            submitted_at: "desc"
          }
        },
        _count: {
          select: {
            notifications: true,
            payments_sent: true,
            payments_received: true,
            messages_sent: true,
            messages_received: true
          }
        }
      }
    });

    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    return res.status(200).json({
      company: {
        ...serializeCompanySummary(company),
        address: company.address,
        annual_trade_volume: company.annual_trade_volume,
        looking_for_description: company.looking_for_description,
        show_trade_volume: company.show_trade_volume,
        number_of_employees: company.number_of_employees,
        year_established: company.year_established,
        company_description: company.company_description,
        supplied_products: company.products.map((item) => item.product.product_name),
        desired_products: company.desired_products.map((item) => item.product.product_name),
        target_regions: company.regions.map((item) => item.region.region_name),
        verification_documents: company.verification_documents.map(serializeVerificationDocument),
        counts: company._count
      }
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateAdminCompany = async (req, res) => {
  try {
    const company_id = Number(req.params.companyId);
    const {
      account_status,
      suspension_reason,
      admin_notes,
      profile_visibility
    } = req.body;

    if (Number.isNaN(company_id)) {
      return res.status(400).json({ error: "companyId must be a valid number" });
    }

    const existingCompany = await prisma.company.findUnique({
      where: { company_id }
    });

    if (!existingCompany) {
      return res.status(404).json({ error: "Company not found" });
    }

    const statusAliases = {
      active: "active",
      pending: "pending",
      suspend: "suspended",
      suspended: "suspended",
      underreview: "under_review",
      under_review: "under_review"
    };
    const requestedStatus = account_status !== undefined
      ? String(account_status).trim().toLowerCase()
      : undefined;
    const normalizedStatus = requestedStatus
      ? statusAliases[requestedStatus] || requestedStatus
      : undefined;
    const allowedStatuses = new Set(["active", "pending", "suspended", "under_review"]);

    if (normalizedStatus && !allowedStatuses.has(normalizedStatus)) {
      return res.status(400).json({ error: "account_status must be active, pending, suspended, or under_review" });
    }

    const updatedCompany = await prisma.company.update({
      where: { company_id },
      data: {
        ...(normalizedStatus ? { account_status: normalizedStatus } : {}),
        ...(profile_visibility !== undefined ? { profile_visibility: Boolean(profile_visibility) } : {}),
        ...(admin_notes !== undefined ? { admin_notes: admin_notes || null } : {}),
        ...(normalizedStatus === "suspended"
          ? {
              suspended_at: new Date(),
              suspension_reason: suspension_reason || existingCompany.suspension_reason || "Suspended by admin"
            }
          : normalizedStatus && normalizedStatus !== "suspended"
            ? {
                suspended_at: null,
                suspension_reason: suspension_reason !== undefined ? (suspension_reason || null) : null
              }
            : suspension_reason !== undefined
              ? { suspension_reason: suspension_reason || null }
              : {})
      },
      include: {
        industry: true,
        location: true,
        _count: {
          select: {
            verification_documents: true
          }
        }
      }
    });

    if (normalizedStatus === "suspended") {
      await prisma.notification.create({
        data: {
          company_id,
          type: "account_suspended",
          message: `Your account was suspended${updatedCompany.suspension_reason ? `: ${updatedCompany.suspension_reason}` : ""}`
        }
      });
    }

    if (normalizedStatus === "active" && existingCompany.account_status !== "active") {
      await prisma.notification.create({
        data: {
          company_id,
          type: existingCompany.account_status === "suspended" ? "account_reinstated" : "account_activated",
          message: existingCompany.account_status === "suspended"
            ? "Your account has been reinstated by an admin"
            : "Your account has been activated. You can now sign in."
        }
      });
    }

    return res.status(200).json({
      message: "Company updated successfully",
      company: serializeCompanySummary(updatedCompany)
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteAdminCompany = async (req, res) => {
  try {
    const company_id = Number(req.params.companyId);

    if (Number.isNaN(company_id)) {
      return res.status(400).json({ error: "companyId must be a valid number" });
    }

    const existingCompany = await prisma.company.findUnique({
      where: { company_id }
    });

    if (!existingCompany) {
      return res.status(404).json({ error: "Company not found" });
    }

    const scheduledMatches = await prisma.scheduledMatch.findMany({
      where: {
        OR: [
          { company_a_id: company_id },
          { company_b_id: company_id }
        ]
      },
      select: { id: true }
    });
    const scheduledMatchIds = scheduledMatches.map((match) => match.id);

    const supportTickets = await prisma.supportTicket.findMany({
      where: { company_id },
      select: { support_ticket_id: true }
    });
    const supportTicketIds = supportTickets.map((ticket) => ticket.support_ticket_id);

    await prisma.$transaction([
      prisma.notification.deleteMany({
        where: {
          OR: [
            { company_id },
            { related_company_id: company_id }
          ]
        }
      }),
      prisma.supportTicketMessage.deleteMany({
        where: {
          OR: [
            { company_id },
            ...(supportTicketIds.length
              ? [{ support_ticket_id: { in: supportTicketIds } }]
              : [])
          ]
        }
      }),
      prisma.supportTicket.deleteMany({
        where: { company_id }
      }),
      prisma.matchOutcome.deleteMany({
        where: {
          OR: [
            { company_id },
            ...(scheduledMatchIds.length
              ? [{ match_id: { in: scheduledMatchIds } }]
              : [])
          ]
        }
      }),
      prisma.scheduledMatch.deleteMany({
        where: {
          OR: [
            { company_a_id: company_id },
            { company_b_id: company_id }
          ]
        }
      }),
      prisma.registration.deleteMany({
        where: { company_id }
      }),
      prisma.lobbyMessage.deleteMany({
        where: { company_id }
      }),
      prisma.profileView.deleteMany({
        where: {
          OR: [
            { viewed_company_id: company_id },
            { viewer_company_id: company_id }
          ]
        }
      }),
      prisma.message.deleteMany({
        where: {
          OR: [
            { sender_company_id: company_id },
            { receiver_company_id: company_id }
          ]
        }
      }),
      prisma.conversation.deleteMany({
        where: {
          OR: [
            { company1_id: company_id },
            { company2_id: company_id }
          ]
        }
      }),
      prisma.companyMatches.deleteMany({
        where: {
          OR: [
            { company1_id: company_id },
            { company2_id: company_id }
          ]
        }
      }),
      prisma.companyTargets.deleteMany({
        where: {
          OR: [
            { source_company_id: company_id },
            { target_company_id: company_id }
          ]
        }
      }),
      prisma.companyProducts.deleteMany({
        where: { company_id }
      }),
      prisma.companyDesiredProducts.deleteMany({
        where: { company_id }
      }),
      prisma.companyRegions.deleteMany({
        where: { company_id }
      }),
      prisma.companyWatchlist.deleteMany({
        where: { company_id }
      }),
      prisma.verificationDocument.deleteMany({
        where: { company_id }
      }),
      prisma.payment.deleteMany({
        where: {
          OR: [
            { payer_company_id: company_id },
            { recipient_company_id: company_id }
          ]
        }
      }),
      prisma.enquiry.deleteMany({
        where: {
          OR: [
            { sender_company_id: company_id },
            { recipient_company_id: company_id }
          ]
        }
      }),
      prisma.company.delete({
        where: { company_id }
      })
    ]);

    return res.status(200).json({
      message: "Company deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAdminVerificationDocuments = async (req, res) => {
  try {
    const {
      status,
      company_id
    } = req.query;

    const numericCompanyId = company_id ? Number(company_id) : undefined;

    if (company_id && Number.isNaN(numericCompanyId)) {
      return res.status(400).json({ error: "company_id must be a valid number" });
    }

    const documents = await prisma.verificationDocument.findMany({
      where: {
        ...(status ? { status } : {}),
        ...(numericCompanyId ? { company_id: numericCompanyId } : {})
      },
      include: {
        company: true,
        reviewed_by_admin: true
      },
      orderBy: {
        submitted_at: "desc"
      }
    });

    return res.status(200).json({
      documents: documents.map(serializeVerificationDocument)
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const reviewVerificationDocument = async (req, res) => {
  try {
    const verification_document_id = Number(req.params.documentId);
    const { status, review_notes } = req.body;

    if (Number.isNaN(verification_document_id)) {
      return res.status(400).json({ error: "documentId must be a valid number" });
    }

    const normalizedStatus = String(status || "").trim().toLowerCase();
    const allowedStatuses = new Set(["approved", "rejected", "pending"]);

    if (!allowedStatuses.has(normalizedStatus)) {
      return res.status(400).json({ error: "status must be approved, rejected, or pending" });
    }

    const existingDocument = await prisma.verificationDocument.findUnique({
      where: { verification_document_id },
      include: {
        company: true,
        reviewed_by_admin: true
      }
    });

    if (!existingDocument) {
      return res.status(404).json({ error: "Verification document not found" });
    }

    const updatedDocument = await prisma.verificationDocument.update({
      where: { verification_document_id },
      data: {
        status: normalizedStatus,
        review_notes: review_notes || null,
        reviewed_by_admin_id: req.admin.admin_id,
        reviewed_at: normalizedStatus === "pending" ? null : new Date()
      },
      include: {
        company: true,
        reviewed_by_admin: true
      }
    });

    if (existingDocument.company?.notify_verification) {
      const verificationMessageByStatus = {
        approved: `${existingDocument.document_type} was approved`,
        rejected: `${existingDocument.document_type} was rejected`,
        pending: `${existingDocument.document_type} was moved back to pending review`
      };

      await prisma.notification.create({
        data: {
          company_id: existingDocument.company_id,
          type: "verification_reviewed",
          message: verificationMessageByStatus[normalizedStatus]
        }
      });
    }

    return res.status(200).json({
      message: "Verification document reviewed successfully",
      document: serializeVerificationDocument(updatedDocument)
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAdminCompanyMatches = async (req, res) => {
  try {
    const { status, company_id } = req.query;

    const numericCompanyId = company_id ? Number(company_id) : undefined;

    if (company_id && Number.isNaN(numericCompanyId)) {
      return res.status(400).json({ error: "company_id must be a valid number" });
    }

    const matches = await prisma.companyMatches.findMany({
      where: {
        ...(status ? { status } : {}),
        ...(numericCompanyId
          ? {
              OR: [
                { company1_id: numericCompanyId },
                { company2_id: numericCompanyId }
              ]
            }
          : {})
      },
      include: {
        company1: {
          include: {
            industry: true,
            location: true
          }
        },
        company2: {
          include: {
            industry: true,
            location: true
          }
        }
      },
      orderBy: {
        matched_at: "desc"
      }
    });

    return res.status(200).json({
      matches
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
