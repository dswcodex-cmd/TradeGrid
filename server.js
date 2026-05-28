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

app.use(helmet());
app.use(cors());
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method.padEnd(6)} ${req.url}`);
  next();
});
app.use(limiter);
app.post("/payments/webhook", express.raw({ type: "application/json" }), paystackWebhook);
app.use(express.json({ limit: "12mb" }));
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
  const paymentReference = reference || trxref || "";

  return res.status(200).send(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Trade Grid Payment</title>
  <style>
    body { font-family: Inter, Arial, sans-serif; background: #f5fbfc; color: #0d3b3b; display: grid; min-height: 100vh; place-items: center; margin: 0; }
    main { width: min(480px, calc(100% - 32px)); background: #fff; border: 1px solid #dceff2; border-radius: 14px; box-shadow: 0 20px 60px rgba(13,59,59,.12); padding: 28px; }
    h1 { font-size: 22px; margin: 0 0 10px; }
    p { color: #547070; line-height: 1.55; margin: 0 0 18px; }
    a { color: #0d3b3b; font-weight: 700; text-decoration: none; }
  </style>
</head>
<body>
  <main>
    <h1 id="title">Verifying payment...</h1>
    <p id="message">Please wait while Trade Grid confirms your Paystack transaction.</p>
    <a href="/User%20Dashboard%20-%20Page/user-dashboard.html">Return to dashboard</a>
  </main>
  <script>
    const reference = ${JSON.stringify(paymentReference)};
    const token = localStorage.getItem('token') || localStorage.getItem('companyToken') || localStorage.getItem('userToken');
    const title = document.getElementById('title');
    const message = document.getElementById('message');

    async function verifyPayment() {
      if (!reference) {
        title.textContent = 'Payment reference missing';
        message.textContent = 'Paystack did not return a transaction reference. Check your dashboard notifications for the latest status.';
        return;
      }

      if (!token) {
        title.textContent = 'Sign in required';
        message.textContent = 'The payment returned successfully, but you need to sign in again before Trade Grid can verify it in this browser.';
        return;
      }

      try {
        const response = await fetch('/payments/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          },
          body: JSON.stringify({ reference })
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.error || data.message || 'Could not verify payment');
        title.textContent = data.paystack_status === 'success' ? 'Payment confirmed' : 'Payment checked';
        message.textContent = data.message || 'Trade Grid has updated the payment status.';
      } catch (error) {
        title.textContent = 'Verification failed';
        message.textContent = error.message || 'Trade Grid could not verify this payment right now.';
      }
    }

    verifyPayment();
  </script>
</body>
</html>`);
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

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
