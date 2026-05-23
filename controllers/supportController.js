import prisma from "../prismaClient.js";

const CATEGORY_TO_ROLE = {
  technical: "admin",
  verification: "employee",
  account: "employee",
  payment: "employee",
  general: "employee"
};

const ALLOWED_CATEGORIES = new Set(Object.keys(CATEGORY_TO_ROLE));
const ALLOWED_PRIORITIES = new Set(["low", "medium", "high"]);
const ALLOWED_STATUSES = new Set(["open", "in_progress", "resolved", "closed"]);

const serializeTicketMessage = (message) => ({
  support_ticket_message_id: message.support_ticket_message_id,
  support_ticket_id: message.support_ticket_id,
  sender_type: message.sender_type,
  message: message.message,
  created_at: message.created_at,
  company: message.company
    ? {
        company_id: message.company.company_id,
        company_name: message.company.company_name,
        email: message.company.email
      }
    : null,
  admin: message.admin
    ? {
        admin_id: message.admin.admin_id,
        full_name: message.admin.full_name,
        email: message.admin.email,
        role: message.admin.role
      }
    : null
});

const serializeSupportTicket = (ticket) => ({
  support_ticket_id: ticket.support_ticket_id,
  company_id: ticket.company_id,
  assigned_admin_id: ticket.assigned_admin_id,
  title: ticket.title,
  description: ticket.description,
  category: ticket.category,
  priority: ticket.priority,
  status: ticket.status,
  assigned_role: ticket.assigned_role,
  created_at: ticket.created_at,
  updated_at: ticket.updated_at,
  resolved_at: ticket.resolved_at,
  company: ticket.company
    ? {
        company_id: ticket.company.company_id,
        company_name: ticket.company.company_name,
        email: ticket.company.email
      }
    : null,
  assigned_admin: ticket.assigned_admin
    ? {
        admin_id: ticket.assigned_admin.admin_id,
        full_name: ticket.assigned_admin.full_name,
        email: ticket.assigned_admin.email,
        role: ticket.assigned_admin.role
      }
    : null,
  latest_message: ticket.messages?.[0] ? serializeTicketMessage(ticket.messages[0]) : null,
  messages: ticket.messages ? ticket.messages.map(serializeTicketMessage) : undefined
});

const normalizeCategory = (category) => String(category || "").trim().toLowerCase();
const normalizePriority = (priority) => String(priority || "medium").trim().toLowerCase();
const normalizeStatus = (status) => String(status || "").trim().toLowerCase();

const ensureCompanyTicketOwnership = (ticket, companyId) =>
  ticket && Number(ticket.company_id) === Number(companyId);

const canStaffSeeTicket = (ticket, admin) => {
  if (admin.role === "superadmin") {
    return true;
  }

  return ticket.assigned_role === admin.role;
};

const canStaffReplyOrUpdateTicket = (ticket, admin) => {
  if (admin.role === "superadmin") {
    return true;
  }

  return (
    ticket.assigned_role === admin.role &&
    Number(ticket.assigned_admin_id) === Number(admin.admin_id)
  );
};

export const createSupportTicket = async (req, res) => {
  try {
    const company_id = Number(req.company.company_id);
    const { title, description, category, priority = "medium" } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({ error: "title, description, and category are required" });
    }

    const normalizedCategory = normalizeCategory(category);
    const normalizedPriority = normalizePriority(priority);

    if (!ALLOWED_CATEGORIES.has(normalizedCategory)) {
      return res.status(400).json({ error: "category must be technical, verification, account, payment, or general" });
    }

    if (!ALLOWED_PRIORITIES.has(normalizedPriority)) {
      return res.status(400).json({ error: "priority must be low, medium, or high" });
    }

    const assigned_role = CATEGORY_TO_ROLE[normalizedCategory];

    const createdTicket = await prisma.$transaction(async (tx) => {
      const ticket = await tx.supportTicket.create({
        data: {
          company_id,
          title: String(title).trim(),
          description: String(description).trim(),
          category: normalizedCategory,
          priority: normalizedPriority,
          assigned_role
        }
      });

      await tx.supportTicketMessage.create({
        data: {
          support_ticket_id: ticket.support_ticket_id,
          company_id,
          sender_type: "company",
          message: String(description).trim()
        }
      });

      await tx.notification.create({
        data: {
          company_id,
          type: "support_ticket_created",
          message: `Support ticket "${ticket.title}" was created and routed to the ${assigned_role} queue`
        }
      });

      return tx.supportTicket.findUnique({
        where: {
          support_ticket_id: ticket.support_ticket_id
        },
        include: {
          company: true,
          assigned_admin: true,
          messages: {
            include: {
              company: true,
              admin: true
            },
            orderBy: {
              created_at: "desc"
            },
            take: 1
          }
        }
      });
    });

    return res.status(201).json({
      message: "Support ticket created successfully",
      ticket: serializeSupportTicket(createdTicket)
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
  
};

export const getMySupportTickets = async (req, res) => {
  try {
    const company_id = Number(req.company.company_id);
    const { status, category } = req.query;

    const tickets = await prisma.supportTicket.findMany({
      where: {
        company_id,
        ...(status ? { status: normalizeStatus(status) } : {}),
        ...(category ? { category: normalizeCategory(category) } : {})
      },
      include: {
        company: true,
        assigned_admin: true,
        messages: {
          include: {
            company: true,
            admin: true
          },
          orderBy: {
            created_at: "desc"
          },
          take: 1
        }
      },
      orderBy: {
        updated_at: "desc"
      }
    });

    return res.status(200).json({
      tickets: tickets.map(serializeSupportTicket)
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getMySupportTicketById = async (req, res) => {
  try {
    const company_id = Number(req.company.company_id);
    const support_ticket_id = Number(req.params.ticketId);

    if (Number.isNaN(support_ticket_id)) {
      return res.status(400).json({ error: "ticketId must be a valid number" });
    }

    const ticket = await prisma.supportTicket.findUnique({
      where: { support_ticket_id },
      include: {
        company: true,
        assigned_admin: true,
        messages: {
          include: {
            company: true,
            admin: true
          },
          orderBy: {
            created_at: "asc"
          }
        }
      }
    });

    if (!ensureCompanyTicketOwnership(ticket, company_id)) {
      return res.status(404).json({ error: "Support ticket not found" });
    }

    return res.status(200).json({
      ticket: serializeSupportTicket(ticket)
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const replyToMySupportTicket = async (req, res) => {
  try {
    const company_id = Number(req.company.company_id);
    const support_ticket_id = Number(req.params.ticketId);
    const { message } = req.body;

    if (Number.isNaN(support_ticket_id)) {
      return res.status(400).json({ error: "ticketId must be a valid number" });
    }

    if (!message || !String(message).trim()) {
      return res.status(400).json({ error: "message is required" });
    }

    const existingTicket = await prisma.supportTicket.findUnique({
      where: { support_ticket_id },
      include: {
        assigned_admin: true
      }
    });

    if (!ensureCompanyTicketOwnership(existingTicket, company_id)) {
      return res.status(404).json({ error: "Support ticket not found" });
    }

    if (existingTicket.status === "closed") {
      return res.status(400).json({ error: "Closed tickets cannot receive new replies" });
    }

    const updatedTicket = await prisma.$transaction(async (tx) => {
      await tx.supportTicketMessage.create({
        data: {
          support_ticket_id,
          company_id,
          sender_type: "company",
          message: String(message).trim()
        }
      });

      await tx.supportTicket.update({
        where: { support_ticket_id },
        data: {
          updated_at: new Date(),
          status: existingTicket.status === "resolved" ? "in_progress" : existingTicket.status,
          resolved_at: existingTicket.status === "resolved" ? null : existingTicket.resolved_at
        }
      });

      return tx.supportTicket.findUnique({
        where: { support_ticket_id },
        include: {
          company: true,
          assigned_admin: true,
          messages: {
            include: {
              company: true,
              admin: true
            },
            orderBy: {
              created_at: "asc"
            }
          }
        }
      });
    });

    return res.status(200).json({
      message: "Support ticket reply sent successfully",
      ticket: serializeSupportTicket(updatedTicket)
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAdminSupportTickets = async (req, res) => {
  try {
    const {
      status,
      category,
      assigned_role,
      assigned_admin_id,
      company_id
    } = req.query;

    const numericAssignedAdminId = assigned_admin_id ? Number(assigned_admin_id) : undefined;
    const numericCompanyId = company_id ? Number(company_id) : undefined;

    if (assigned_admin_id && Number.isNaN(numericAssignedAdminId)) {
      return res.status(400).json({ error: "assigned_admin_id must be a valid number" });
    }

    if (company_id && Number.isNaN(numericCompanyId)) {
      return res.status(400).json({ error: "company_id must be a valid number" });
    }

    const roleScope = req.admin.role === "superadmin" ? undefined : req.admin.role;

    const tickets = await prisma.supportTicket.findMany({
      where: {
        ...(status ? { status: normalizeStatus(status) } : {}),
        ...(category ? { category: normalizeCategory(category) } : {}),
        ...(assigned_role ? { assigned_role: String(assigned_role).trim().toLowerCase() } : {}),
        ...(numericAssignedAdminId ? { assigned_admin_id: numericAssignedAdminId } : {}),
        ...(numericCompanyId ? { company_id: numericCompanyId } : {}),
        ...(roleScope ? { assigned_role: roleScope } : {})
      },
      include: {
        company: true,
        assigned_admin: true,
        messages: {
          include: {
            company: true,
            admin: true
          },
          orderBy: {
            created_at: "desc"
          },
          take: 1
        }
      },
      orderBy: {
        updated_at: "desc"
      }
    });

    return res.status(200).json({
      tickets: tickets.map(serializeSupportTicket)
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAdminSupportTicketById = async (req, res) => {
  try {
    const support_ticket_id = Number(req.params.ticketId);

    if (Number.isNaN(support_ticket_id)) {
      return res.status(400).json({ error: "ticketId must be a valid number" });
    }

    const ticket = await prisma.supportTicket.findUnique({
      where: { support_ticket_id },
      include: {
        company: true,
        assigned_admin: true,
        messages: {
          include: {
            company: true,
            admin: true
          },
          orderBy: {
            created_at: "asc"
          }
        }
      }
    });

    if (!ticket || !canStaffSeeTicket(ticket, req.admin)) {
      return res.status(404).json({ error: "Support ticket not found" });
    }

    return res.status(200).json({
      ticket: serializeSupportTicket(ticket)
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const assignSupportTicket = async (req, res) => {
  try {
    const support_ticket_id = Number(req.params.ticketId);
    const {
      assigned_admin_id,
      assigned_role
    } = req.body;

    if (Number.isNaN(support_ticket_id)) {
      return res.status(400).json({ error: "ticketId must be a valid number" });
    }

    const ticket = await prisma.supportTicket.findUnique({
      where: { support_ticket_id }
    });

    if (!ticket || !canStaffSeeTicket(ticket, req.admin)) {
      return res.status(404).json({ error: "Support ticket not found" });
    }

    const nextAssignedRole = assigned_role !== undefined
      ? String(assigned_role).trim().toLowerCase()
      : ticket.assigned_role;

    if (!["employee", "admin", "superadmin"].includes(nextAssignedRole)) {
      return res.status(400).json({ error: "assigned_role must be employee, admin, or superadmin" });
    }

    if ((req.admin.role === "employee" || req.admin.role === "admin") && !["employee", "admin"].includes(nextAssignedRole)) {
      return res.status(403).json({ error: "You can only route tickets between the employee and admin queues" });
    }

    const numericAssignedAdminId = assigned_admin_id === null || assigned_admin_id === undefined
      ? null
      : Number(assigned_admin_id);

    if (numericAssignedAdminId !== null && Number.isNaN(numericAssignedAdminId)) {
      return res.status(400).json({ error: "assigned_admin_id must be a valid number" });
    }

    if (req.admin.role !== "superadmin" && numericAssignedAdminId !== null && numericAssignedAdminId !== Number(req.admin.admin_id)) {
      return res.status(403).json({ error: "You can only assign tickets to yourself" });
    }

    let targetAdmin = null;
    if (numericAssignedAdminId !== null) {
      targetAdmin = await prisma.admin.findUnique({
        where: { admin_id: numericAssignedAdminId }
      });

      if (!targetAdmin || !targetAdmin.is_active) {
        return res.status(404).json({ error: "Assigned staff member was not found or is inactive" });
      }

      if (req.admin.role !== "superadmin" && targetAdmin.role !== nextAssignedRole) {
        return res.status(403).json({ error: "Assigned staff must belong to the selected queue" });
      }
    }

    const updatedTicket = await prisma.supportTicket.update({
      where: { support_ticket_id },
      data: {
        assigned_role: nextAssignedRole,
        assigned_admin_id: numericAssignedAdminId
      },
      include: {
        company: true,
        assigned_admin: true,
        messages: {
          include: {
            company: true,
            admin: true
          },
          orderBy: {
            created_at: "desc"
          },
          take: 1
        }
      }
    });

    await prisma.notification.create({
      data: {
        company_id: updatedTicket.company_id,
        type: "support_ticket_assigned",
        message: updatedTicket.assigned_admin
          ? `Your support ticket "${updatedTicket.title}" is now assigned to ${updatedTicket.assigned_admin.full_name}`
          : `Your support ticket "${updatedTicket.title}" was moved to the ${updatedTicket.assigned_role} queue`
      }
    });

    return res.status(200).json({
      message: "Support ticket assignment updated successfully",
      ticket: serializeSupportTicket(updatedTicket)
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateSupportTicketStatus = async (req, res) => {
  try {
    const support_ticket_id = Number(req.params.ticketId);
    const { status } = req.body;

    if (Number.isNaN(support_ticket_id)) {
      return res.status(400).json({ error: "ticketId must be a valid number" });
    }

    const normalizedStatus = normalizeStatus(status);

    if (!ALLOWED_STATUSES.has(normalizedStatus)) {
      return res.status(400).json({ error: "status must be open, in_progress, resolved, or closed" });
    }

    const ticket = await prisma.supportTicket.findUnique({
      where: { support_ticket_id },
      include: {
        company: true,
        assigned_admin: true,
        messages: {
          include: {
            company: true,
            admin: true
          },
          orderBy: {
            created_at: "desc"
          },
          take: 1
        }
      }
    });

    if (!ticket || !canStaffReplyOrUpdateTicket(ticket, req.admin)) {
      return res.status(404).json({ error: "Support ticket not found" });
    }

    const updatedTicket = await prisma.supportTicket.update({
      where: { support_ticket_id },
      data: {
        status: normalizedStatus,
        resolved_at: normalizedStatus === "resolved" || normalizedStatus === "closed" ? new Date() : null
      },
      include: {
        company: true,
        assigned_admin: true,
        messages: {
          include: {
            company: true,
            admin: true
          },
          orderBy: {
            created_at: "desc"
          },
          take: 1
        }
      }
    });

    await prisma.notification.create({
      data: {
        company_id: updatedTicket.company_id,
        type: "support_ticket_status_updated",
        message: `Your support ticket "${updatedTicket.title}" status changed to ${normalizedStatus}`
      }
    });

    return res.status(200).json({
      message: "Support ticket status updated successfully",
      ticket: serializeSupportTicket(updatedTicket)
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const replyToSupportTicketAsStaff = async (req, res) => {
  try {
    const support_ticket_id = Number(req.params.ticketId);
    const { message } = req.body;

    if (Number.isNaN(support_ticket_id)) {
      return res.status(400).json({ error: "ticketId must be a valid number" });
    }

    if (!message || !String(message).trim()) {
      return res.status(400).json({ error: "message is required" });
    }

    const ticket = await prisma.supportTicket.findUnique({
      where: { support_ticket_id },
      include: {
        company: true,
        assigned_admin: true,
        messages: {
          include: {
            company: true,
            admin: true
          },
          orderBy: {
            created_at: "asc"
          }
        }
      }
    });

    if (!ticket || !canStaffReplyOrUpdateTicket(ticket, req.admin)) {
      return res.status(404).json({ error: "Support ticket not found" });
    }

    if (ticket.status === "closed") {
      return res.status(400).json({ error: "Closed tickets cannot receive new replies" });
    }

    const updatedTicket = await prisma.$transaction(async (tx) => {
      await tx.supportTicketMessage.create({
        data: {
          support_ticket_id,
          admin_id: Number(req.admin.admin_id),
          sender_type: req.admin.role,
          message: String(message).trim()
        }
      });

      await tx.supportTicket.update({
        where: { support_ticket_id },
        data: {
          status: ticket.status === "open" ? "in_progress" : ticket.status,
          updated_at: new Date()
        }
      });

      await tx.notification.create({
        data: {
          company_id: ticket.company_id,
          type: "support_ticket_replied",
          message: `${req.admin.full_name} replied to your support ticket "${ticket.title}"`
        }
      });

      return tx.supportTicket.findUnique({
        where: { support_ticket_id },
        include: {
          company: true,
          assigned_admin: true,
          messages: {
            include: {
              company: true,
              admin: true
            },
            orderBy: {
              created_at: "asc"
            }
          }
        }
      });
    });

    return res.status(200).json({
      message: "Support ticket reply sent successfully",
      ticket: serializeSupportTicket(updatedTicket)
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
