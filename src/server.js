/**
 * server.js
 * Entry point — Express app with security middleware and rate limiting.
 */

import express       from "express";
import cors          from "cors";
import helmet        from "helmet";
import rateLimit     from "express-rate-limit";
import router        from "./routes.js";

const app  = express();
const PORT = process.env.PORT ?? 3000;

// ── Security headers ───────────────────────────────────────────────────────────
app.use(helmet());

// ── CORS — allow all origins by default, restrict via env ─────────────────────
app.use(cors({
  origin:  process.env.CORS_ORIGIN ?? "*",
  methods: ["GET", "POST"],
}));

// ── Body parsing ───────────────────────────────────────────────────────────────
app.use(express.json({ limit: "64kb" }));

// ── Rate limiting ──────────────────────────────────────────────────────────────
const limiter = rateLimit({
  windowMs:         15 * 60 * 1000,  // 15 minutes
  max:              200,              // requests per window
  standardHeaders:  true,
  legacyHeaders:    false,
  message: {
    success: false,
    error:   "Too many requests. Please wait 15 minutes before trying again.",
  },
});

app.use(limiter);

// ── Global request logger ─────────────────────────────────────────────────────
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}]  ${req.method.padEnd(6)} ${req.url}`);
  next();
});

// ── Mount routes ───────────────────────────────────────────────────────────────
app.use("/", router);

// ── Global error handler ───────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error("[ERROR]", err.message);
  res.status(500).json({
    success: false,
    error:   "Internal server error.",
  });
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`
  ╔══════════════════════════════════════════════════════╗
  ║   Company Registration Validator API                 ║
  ║   Running on http://localhost:${PORT}                   ║
  ╠══════════════════════════════════════════════════════╣
  ║  GET    /health                                      ║
  ║  GET    /countries                                   ║
  ║  GET    /countries?region=Africa                     ║
  ║  GET    /countries/:code                             ║
  ║  GET    /validate/:country/:regNumber                ║
  ║  POST   /validate                                    ║
  ║  POST   /validate/batch                              ║
  ╚══════════════════════════════════════════════════════╝
  `);
});

export default app;
