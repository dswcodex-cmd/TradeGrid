import express from "express";
import { validateCompanyReg, batchValidate, getCountries, getCountryInfo } from "../controllers/validationService.js";

const router = express.Router();

// ── GET /health ────────────────────────────────────────────────────────────────
router.get("/health", (_req, res) => {
  res.json({
    status:    "ok",
    timestamp: new Date().toISOString(),
    version:   "1.0.0",
  });
});

// ── GET /countries ─────────────────────────────────────────────────────────────
router.get("/countries", (req, res) => {
  const { region } = req.query;
  const list = getCountries(region);

  if (region && list.length === 0) {
    return res.status(404).json({
      success: false,
      error:   `No countries found for region "${region}". Valid regions: Africa, Europe, Americas, Asia-Pacific, Middle East`,
    });
  }

  res.json({
    success: true,
    count:   list.length,
    data:    list,
  });
});

// ── GET /countries/:code ───────────────────────────────────────────────────────
router.get("/countries/:code", (req, res) => {
  const info = getCountryInfo(req.params.code);
  if (!info) {
    return res.status(404).json({
      success: false,
      error:   `Country code "${req.params.code.toUpperCase()}" is not supported.`,
    });
  }
  res.json({ success: true, data: info });
});

// ── GET /validate/:country/:regNumber ─────────────────────────────────────────

// Compatibility endpoint for clients that validate with query parameters.
router.get("/validate", (req, res) => {
  const countryCode = req.query.countryCode || req.query.country || req.query.code;
  const regNumber = req.query.regNumber || req.query.registrationNumber || req.query.registration_number;

  if (!countryCode || !regNumber) {
    return res.status(400).json({
      success: false,
      error:   "Query must include both 'countryCode' and 'regNumber'.",
      example: "/validate?countryCode=ZA&regNumber=2015%2F123456%2F07",
    });
  }

  const result = validateCompanyReg(String(countryCode), String(regNumber));
  res.json({ success: result.valid, data: result });
});
router.get("/validate/:country/:regNumber", (req, res) => {
  const { country, regNumber } = req.params;
  const result = validateCompanyReg(country, decodeURIComponent(regNumber));
  const status = result.valid ? 200 : 422;
  res.status(status).json({ success: result.valid, data: result });
});

// ── POST /validate ─────────────────────────────────────────────────────────────
router.post("/validate", (req, res) => {
  const { countryCode, regNumber } = req.body ?? {};

  if (!countryCode || !regNumber) {
    return res.status(400).json({
      success: false,
      error:   "Request body must include both 'countryCode' and 'regNumber'.",
      example: { countryCode: "ZA", regNumber: "2015/123456/07" },
    });
  }

  const result = validateCompanyReg(countryCode, regNumber);
  res.json({ success: result.valid, data: result });
});

// ── POST /validate/batch ───────────────────────────────────────────────────────
router.post("/validate/batch", (req, res) => {
  const items = req.body;

  if (!Array.isArray(items)) {
    return res.status(400).json({
      success: false,
      error:   "Request body must be a JSON array of { countryCode, regNumber } objects.",
      example: [
        { countryCode: "ZA", regNumber: "2015/123456/07" },
        { countryCode: "GB", regNumber: "SC123456" },
      ],
    });
  }

  if (items.length === 0) {
    return res.status(400).json({ success: false, error: "Array must not be empty." });
  }

  if (items.length > 100) {
    return res.status(400).json({ success: false, error: "Batch limit is 100 items per request." });
  }

  const results = batchValidate(items);
  const validCount   = results.filter(r => r.valid).length;
  const invalidCount = results.length - validCount;

  res.json({
    success: true,
    summary: { total: results.length, valid: validCount, invalid: invalidCount },
    data:    results,
  });
});

// ── 404 fallback ───────────────────────────────────────────────────────────────
router.use((req, res) => {
  res.status(404).json({
    success: false,
    error:   `Route ${req.method} ${req.originalUrl} not found.`,
    docs:    "GET /health  |  GET /countries  |  GET /countries/:code  |  GET /validate  |  POST /validate  |  POST /validate/batch  |  GET /validate/:country/:regNumber",
  });
});

export default router;