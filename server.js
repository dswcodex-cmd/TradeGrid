import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import helmet from "helmet";
import path from "path";
import rateLimit from "express-rate-limit";
import { fileURLToPath } from "url";
import { Server } from "socket.io";
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import discoverRoutes from "./routes/discoverRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import mashaAI from "./routes/mashaAI.js";
import messageRoutes from "./routes/messageRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import supportRoutes from "./routes/supportRoutes.js";
import ValidationServiceRoute from "./routes/ValidationServiceRoute.js"
import verificationRoutes from "./routes/verificationRoutes.js";
import watchlistRoutes from "./routes/watchlistRoutes.js";
import { paystackWebhook } from "./controllers/paymentController.js";
import registerEventSocket from "./sockets/eventSocket.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.static(path.join(__dirname, "Front-end")));
app.use(express.static(path.join(__dirname, "Front-end", "Login - Page")));

app.get("/", (req, res)=>{
  res.sendFile(path.join(__dirname, "Front-end", "Login - Page", "login.html"))
})

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"]
  }
});

const limiter = rateLimit({
  windowMs:         15 * 60 * 1000,  // 15 minutes
  max:              2000,             // dashboard pages make many authenticated API calls
  standardHeaders:  true,
  legacyHeaders:    false,
  message: {
    success: false,
    error:   "Too many requests. Please wait 15 minutes before trying again.",
  },
});

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "https://sdk.twilio.com",
        "https://cdn.jsdelivr.net",
        "https://unpkg.com"
      ],
      scriptSrcElem: [
        "'self'",
        "https://sdk.twilio.com",
        "https://cdn.jsdelivr.net",
        "https://unpkg.com"
      ],
      connectSrc: [
        "'self'",
        "wss://*.twilio.com",
        "https://*.twilio.com"
      ],
      imgSrc: [
        "'self'",
        "data:",
        "blob:",
        "https://images.unsplash.com"
      ],
      mediaSrc: [
        "'self'",
        "blob:",
        "mediastream:"
      ],
      styleSrc: [
        "'self'",
        "'unsafe-inline'",
        "https://fonts.googleapis.com",
        "https://cdnjs.cloudflare.com"
      ],
      fontSrc: [
        "'self'",
        "https://fonts.gstatic.com",
        "https://cdnjs.cloudflare.com",
        "data:"
      ],
      workerSrc: [
        "'self'",
        "blob:"
      ]
    }
  }
}));
app.use(cors());
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method.padEnd(6)} ${req.url}`);
  next();
});
app.use(limiter);
app.post("/payments/webhook", express.raw({ type: "application/json" }), paystackWebhook);
app.use(express.json({ limit: "100mb" }));
app.use("/speed-dating", express.static(path.join(__dirname, "Front-end", "Speed-dating-page")));

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/discover", discoverRoutes);
app.use("/events", eventRoutes);
app.use("/matches", matchRoutes);
app.use("/profile", profileRoutes);
app.use("/settings", settingsRoutes);
app.use("/support", supportRoutes);
app.use("/verification", verificationRoutes);
app.use("/watchlist", watchlistRoutes);
app.use("/chat", mashaAI);
app.use("/messages", messageRoutes);
app.use("/payments", paymentRoutes);
app.use("/registration-validation", ValidationServiceRoute);
app.use("/validateRegNUm", ValidationServiceRoute);

app.get("/payment-return", (req, res) => {
  const { reference, trxref } = req.query;

  return res.status(200).json({
    message: "Paystack redirected back successfully",
    reference: reference || trxref || null,
    note: "Payment status is finalized by webhook or verification, not by this redirect alone."
  });
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      error: "Invalid JSON body",
      message: "Send a valid JSON request body with double-quoted property names and string values."
    });
  }

  return next(err);
});



app.use((err, _req, res, _next) => {
  console.error("[ERROR]", err.message);
  res.status(500).json({
    success: false,
    error: "Internal server error."
  });
});

const PORT = process.env.PORT || 5000;
registerEventSocket(io);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
