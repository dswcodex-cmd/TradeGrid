import prisma from "../prismaClient.js";

const serializeVerificationDocument = (document) => ({
  verification_document_id: document.verification_document_id,
  company_id: document.company_id,
  document_type: document.document_type,
  file_name: document.file_name,
  file_url: document.file_url,
  notes: document.notes,
  status: document.status,
  submitted_at: document.submitted_at,
  reviewed_at: document.reviewed_at,
  created_at: document.created_at,
  updated_at: document.updated_at
});

export const getMyVerificationDocuments = async (req, res) => {
  try {
    const current_company_id = Number(req.company.company_id);

    const documents = await prisma.verificationDocument.findMany({
      where: {
        company_id: current_company_id
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

export const getMyVerificationDocumentById = async (req, res) => {
  try {
    const current_company_id = Number(req.company.company_id);
    const verification_document_id = Number(req.params.documentId);

    if (Number.isNaN(verification_document_id)) {
      return res.status(400).json({ error: "documentId must be a valid number" });
    }

    const document = await prisma.verificationDocument.findFirst({
      where: {
        verification_document_id,
        company_id: current_company_id
      }
    });

    if (!document) {
      return res.status(404).json({ error: "Verification document not found" });
    }

    return res.status(200).json({
      document: serializeVerificationDocument(document)
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const uploadVerificationDocument = async (req, res) => {
  try {
    const current_company_id = Number(req.company.company_id);
    const {
      document_type,
      file_name,
      file_url,
      notes
    } = req.body;

    if (!document_type) {
      return res.status(400).json({ error: "document_type is required" });
    }

    const document = await prisma.verificationDocument.create({
      data: {
        company_id: current_company_id,
        document_type,
        file_name: file_name || null,
        file_url: file_url || null,
        notes: notes || null,
        status: "pending",
        submitted_at: new Date()
      }
    });

    await prisma.notification.create({
      data: {
        company_id: current_company_id,
        type: "verification_submitted",
        message: `${document_type} was submitted for verification`
      }
    });

    return res.status(201).json({
      message: "Verification document submitted successfully",
      document: serializeVerificationDocument(document)
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const replaceVerificationDocument = async (req, res) => {
  try {
    const current_company_id = Number(req.company.company_id);
    const verification_document_id = Number(req.params.documentId);
    const {
      file_name,
      file_url,
      notes
    } = req.body;

    if (Number.isNaN(verification_document_id)) {
      return res.status(400).json({ error: "documentId must be a valid number" });
    }

    const existingDocument = await prisma.verificationDocument.findFirst({
      where: {
        verification_document_id,
        company_id: current_company_id
      }
    });

    if (!existingDocument) {
      return res.status(404).json({ error: "Verification document not found" });
    }

    const updatedDocument = await prisma.verificationDocument.update({
      where: { verification_document_id },
      data: {
        file_name: file_name || existingDocument.file_name,
        file_url: file_url || existingDocument.file_url,
        notes: notes || existingDocument.notes,
        status: "pending",
        review_notes: null,
        reviewed_by_admin_id: null,
        submitted_at: new Date(),
        reviewed_at: null
      }
    });

    await prisma.notification.create({
      data: {
        company_id: current_company_id,
        type: "verification_replaced",
        message: `${existingDocument.document_type} was replaced and resubmitted`
      }
    });

    return res.status(200).json({
      message: "Verification document replaced successfully",
      document: serializeVerificationDocument(updatedDocument)
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
