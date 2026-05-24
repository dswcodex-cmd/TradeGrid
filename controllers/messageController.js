import prisma from "../prismaClient.js";

const normalizeConversationPair = (companyA, companyB) => ({
  company1_id: Math.min(companyA, companyB),
  company2_id: Math.max(companyA, companyB)
});

const ensureConversationParticipant = (conversation, companyId) => {
  return conversation.company1_id === companyId || conversation.company2_id === companyId;
};

export const createOrGetConversation = async (req, res) => {
  try {
    const current_company_id = Number(req.company.company_id);
    const { other_company_id } = req.body;
    const numericOtherCompanyId = Number(other_company_id);

    if (!other_company_id || Number.isNaN(numericOtherCompanyId)) {
      return res.status(400).json({ error: "other_company_id must be a valid number" });
    }

    if (current_company_id === numericOtherCompanyId) {
      return res.status(400).json({ error: "You cannot start a conversation with your own company" });
    }

    const otherCompany = await prisma.company.findUnique({
      where: { company_id: numericOtherCompanyId },
      select: {
        company_id: true,
        company_name: true,
        email: true
      }
    });

    if (!otherCompany) {
      return res.status(404).json({ error: "Other company not found" });
    }

    const pair = normalizeConversationPair(current_company_id, numericOtherCompanyId);
    const acceptedMatch = await prisma.companyMatches.findUnique({
      where: {
        company1_id_company2_id: pair
      }
    });

    if (!acceptedMatch) {
      return res.status(403).json({
        error: "You can only message companies after the match request has been accepted"
      });
    }

    let conversation = await prisma.conversation.findUnique({
      where: {
        company1_id_company2_id: pair
      },
      include: {
        company1: {
          select: {
            company_id: true,
            company_name: true
          }
        },
        company2: {
          select: {
            company_id: true,
            company_name: true
          }
        }
      }
    });

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: pair,
        include: {
          company1: {
            select: {
              company_id: true,
              company_name: true
            }
          },
          company2: {
            select: {
              company_id: true,
              company_name: true
            }
          }
        }
      });
    }

    return res.status(201).json({
      message: "Conversation ready",
      conversation
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getMyConversations = async (req, res) => {
  try {
    const current_company_id = Number(req.company.company_id);

    const conversations = await prisma.conversation.findMany({
      where: {
        OR: [
          { company1_id: current_company_id },
          { company2_id: current_company_id }
        ]
      },
      include: {
        company1: {
          select: {
            company_id: true,
            company_name: true
          }
        },
        company2: {
          select: {
            company_id: true,
            company_name: true
          }
        },
        messages: {
          orderBy: {
            created_at: "desc"
          },
          take: 1,
          select: {
            message_id: true,
            content: true,
            created_at: true,
            sender_company_id: true,
            receiver_company_id: true,
            is_read: true
          }
        }
      },
      orderBy: [
        { last_message_at: "desc" },
        { updated_at: "desc" }
      ]
    });

    const conversationsWithUnreadCounts = await Promise.all(
      conversations.map(async (conversation) => {
        const unread_count = await prisma.message.count({
          where: {
            conversation_id: conversation.conversation_id,
            receiver_company_id: current_company_id,
            is_read: false
          }
        });

        return {
          ...conversation,
          unread_count
        };
      })
    );

    return res.status(200).json({ conversations: conversationsWithUnreadCounts });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getConversationMessages = async (req, res) => {
  try {
    const current_company_id = Number(req.company.company_id);
    const conversation_id = Number(req.params.conversationId);

    if (Number.isNaN(conversation_id)) {
      return res.status(400).json({ error: "conversationId must be a valid number" });
    }

    const conversation = await prisma.conversation.findUnique({
      where: { conversation_id },
      include: {
        company1: {
          select: {
            company_id: true,
            company_name: true
          }
        },
        company2: {
          select: {
            company_id: true,
            company_name: true
          }
        },
        messages: {
          orderBy: {
            created_at: "asc"
          }
        }
      }
    });

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    if (!ensureConversationParticipant(conversation, current_company_id)) {
      return res.status(403).json({ error: "You do not have access to this conversation" });
    }

    return res.status(200).json({ conversation });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const current_company_id = Number(req.company.company_id);
    const conversation_id = Number(req.params.conversationId);
    const { content } = req.body;

    if (Number.isNaN(conversation_id)) {
      return res.status(400).json({ error: "conversationId must be a valid number" });
    }

    if (!content || !content.trim()) {
      return res.status(400).json({ error: "content is required" });
    }

    const conversation = await prisma.conversation.findUnique({
      where: { conversation_id }
    });

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    if (!ensureConversationParticipant(conversation, current_company_id)) {
      return res.status(403).json({ error: "You do not have access to this conversation" });
    }

    const receiver_company_id =
      conversation.company1_id === current_company_id
        ? conversation.company2_id
        : conversation.company1_id;

    const senderCompany = await prisma.company.findUnique({
      where: { company_id: current_company_id },
      select: {
        company_id: true,
        company_name: true
      }
    });

    const [updatedConversation, message] = await prisma.$transaction([
      prisma.conversation.update({
        where: { conversation_id },
        data: {
          last_message_at: new Date()
        }
      }),
      prisma.message.create({
        data: {
          conversation_id,
          sender_company_id: current_company_id,
          receiver_company_id,
          content: content.trim()
        }
      })
    ]);

    await prisma.notification.create({
      data: {
        company_id: receiver_company_id,
        type: "new_message",
        message: `${senderCompany?.company_name || "A company"} sent you a message`,
        related_company_id: current_company_id
      }
    });

    return res.status(201).json({
      message: "Message sent successfully",
      conversation: updatedConversation,
      data: message
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const markConversationAsRead = async (req, res) => {
  try {
    const current_company_id = Number(req.company.company_id);
    const conversation_id = Number(req.params.conversationId);

    if (Number.isNaN(conversation_id)) {
      return res.status(400).json({ error: "conversationId must be a valid number" });
    }

    const conversation = await prisma.conversation.findUnique({
      where: { conversation_id }
    });

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    if (!ensureConversationParticipant(conversation, current_company_id)) {
      return res.status(403).json({ error: "You do not have access to this conversation" });
    }

    const result = await prisma.message.updateMany({
      where: {
        conversation_id,
        receiver_company_id: current_company_id,
        is_read: false
      },
      data: {
        is_read: true
      }
    });

    return res.status(200).json({
      message: "Conversation marked as read",
      updated_count: result.count
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
