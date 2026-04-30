import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import { paystackWebhook } from "./controllers/paymentController.js";

dotenv.config();

const app = express();

app.use(cors());
app.post("/payments/webhook", express.raw({ type: "application/json" }), paystackWebhook);
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/messages", messageRoutes);
app.use("/payments", paymentRoutes);

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
