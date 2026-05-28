import prisma from "../prismaClient.js";
import dotenv from "dotenv"

export const sendConnectionRequest = async (req, res) => {
  try {
    const source_company_id = Number(req.company.company_id);
    const { target_company_id, notes } = req.body;
    const numericTargetCompanyId = Number(target_company_id); 

    if (!target_company_id) {
      return res.status(400).json({ error: "target_company_id is required" });
    }

    if (source_company_id === Number(target_company_id)) {
      return res.status(400).json({ error: "You cannot connect to your own company" });
    }

    const targetCompany = await prisma.company.findUnique({
      where: { company_id: Number(target_company_id) }
    });

    if (!targetCompany) {
      return res.status(404).json({ error: "Target company not found" });
    }

    const existingRequest = await prisma.companyTargets.findUnique({
      where: {
        source_company_id_target_company_id: {
          source_company_id,
          target_company_id: Number(target_company_id)
        }
      }
    });

    if (existingRequest) {
      return res.status(400).json({ error: "Connection request already exists" });
    }

    const reverseRequest = await prisma.companyTargets.findUnique({
      where: {
        source_company_id_target_company_id: {
          source_company_id: Number(target_company_id),
          target_company_id: source_company_id
        }
      }
    });

    if (reverseRequest && reverseRequest.status === "pending") {
      return res.status(400).json({
        error: "This company has already sent you a pending request"
      });
    }

    const existingMatch = await prisma.companyMatches.findFirst({
      where: {
        OR: [
          { company1_id: source_company_id, company2_id: Number(target_company_id) },
          { company1_id: Number(target_company_id), company2_id: source_company_id }
        ]
      }
    });

    if (existingMatch) {
      return res.status(400).json({ error: "You are already connected" });
    }

    const request = await prisma.companyTargets.create({
      data: {
        source_company_id,
        target_company_id: Number(target_company_id),
        status: "pending",
        notes
      }
    });

    await prisma.notification.create({
      data: {
        company_id: Number(target_company_id),
        type: "connection_request",
        message: "You have received a new connection request",
        related_company_id: source_company_id
      }
    });

    await prisma.notification.create({
      data: {
        company_id: source_company_id,
        type: "connection_request_sent",
        message: `Connection request sent to ${targetCompany.company_name}`,
        related_company_id: Number(target_company_id)
      }
    });

    return res.status(201).json({
      message: "Connection request sent successfully",
      request
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const acceptConnectionRequest = async (req, res) => {
  try {
    const current_company_id = Number(req.company.company_id);
    const { source_company_id } = req.body;
    const numericSourceCompanyId = Number(source_company_id);

    if (!source_company_id) {
      return res.status(400).json({ error: "source_company_id is required" });
    }

    const request = await prisma.companyTargets.findUnique({
      where: {
        source_company_id_target_company_id: {
          source_company_id: Number(source_company_id),
          target_company_id: current_company_id
        }
      }
    });

    if (!request) {
      return res.status(404).json({ error: "Connection request not found" });
    }

    if (request.status !== "pending") {
      return res.status(400).json({ error: "This request is no longer pending" });
    }

    await prisma.companyTargets.update({
      where: {
        source_company_id_target_company_id: {
          source_company_id: Number(source_company_id),
          target_company_id: current_company_id
        }
      },
      data: {
        status: "accepted"
      }
    });

    const company1_id = Math.min(Number(source_company_id), current_company_id);
    const company2_id = Math.max(Number(source_company_id), current_company_id);

    await prisma.companyMatches.upsert({
      where: {
        company1_id_company2_id: {
          company1_id,
          company2_id
        }
      },
      update: {
        match_type: "connection"
      },
      create: {
        company1_id,
        company2_id,
        match_type: "connection"
      }
    });

    await prisma.notification.create({
      data: {
        company_id: Number(source_company_id),
        type: "connection_accepted",
        message: "Your connection request was accepted",
        related_company_id: current_company_id
      }
    });

    return res.status(200).json({
      message: "Connection request accepted"
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const rejectConnectionRequest = async (req, res) => {
  try {
    const current_company_id = Number(req.company.company_id);
    const { source_company_id } = req.body;
    const numericSourceCompanyId = Number(source_company_id);


    if (!source_company_id) {
      return res.status(400).json({ error: "source_company_id is required" });
    }

    const request = await prisma.companyTargets.findUnique({
      where: {
        source_company_id_target_company_id: {
          source_company_id: Number(source_company_id),
          target_company_id: current_company_id
        }
      }
    });

    if (!request) {
      return res.status(404).json({ error: "Connection request not found" });
    }

    if (request.status !== "pending") {
      return res.status(400).json({ error: "This request is no longer pending" });
    }

    await prisma.companyTargets.update({
      where: {
        source_company_id_target_company_id: {
          source_company_id: Number(source_company_id),
          target_company_id: current_company_id
        }
      },
      data: {
        status: "rejected"
      }
    });

    await prisma.notification.create({
      data: {
        company_id: Number(source_company_id),
        type: "connection_rejected",
        message: "Your connection request was declined",
        related_company_id: current_company_id
      }
    });

    return res.status(200).json({
      message: "Connection request rejected"
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getPendingRequests = async (req, res) => {
  try {
    const current_company_id = Number(req.company.company_id);

    const requests = await prisma.companyTargets.findMany({
      where: {
        target_company_id: current_company_id,
        status: "pending"
      },
      include: {
        source: true
      }
    });

    return res.status(200).json({ requests });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getSentPendingRequests = async (req, res) => {
  try {
    const current_company_id = Number(req.company.company_id);

    const requests = await prisma.companyTargets.findMany({
      where: {
        source_company_id: current_company_id,
        status: "pending"
      },
      include: {
        target: true
      }
    });

    return res.status(200).json({ requests });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getMyConnections = async (req, res) => {
  try {
    const current_company_id = Number(req.company.company_id);

    const matches = await prisma.companyMatches.findMany({
      where: {
        OR: [
          { company1_id: current_company_id },
          { company2_id: current_company_id }
        ]
      },
      include: {
        company1: true,
        company2: true
      }
    });

    return res.status(200).json({ matches });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getMyNotifications = async (req, res) => {
  try {
    const current_company_id = Number(req.company.company_id);

    const notifications = await prisma.notification.findMany({
      where: {
        company_id: current_company_id
      },
      orderBy: {
        created_at: "desc"
      }
    });

    return res.status(200).json({ notifications });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getUnreadNotificationCount = async (req, res) => {
  try {
    const current_company_id = Number(req.company.company_id);

    const unread_count = await prisma.notification.count({
      where: {
        company_id: current_company_id,
        is_read: false
      }
    });

    return res.status(200).json({ unread_count });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const markNotificationAsRead = async (req, res) => {
  try {
    const current_company_id = Number(req.company.company_id);
    const notification_id = Number(req.params.notificationId);

    if (Number.isNaN(notification_id)) {
      return res.status(400).json({ error: "notificationId must be a valid number" });
    }

    const notification = await prisma.notification.findFirst({
      where: {
        notification_id,
        company_id: current_company_id
      }
    });

    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    const updatedNotification = await prisma.notification.update({
      where: { notification_id },
      data: {
        is_read: true
      }
    });

    return res.status(200).json({
      message: "Notification marked as read",
      notification: updatedNotification
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const markAllNotificationsAsRead = async (req, res) => {
  try {
    const current_company_id = Number(req.company.company_id);

    const result = await prisma.notification.updateMany({
      where: {
        company_id: current_company_id,
        is_read: false
      },
      data: {
        is_read: true
      }
    });

    return res.status(200).json({
      message: "All notifications marked as read",
      updated_count: result.count
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
