import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { X402Client } from "@coinbase/x402";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// -------------------------
// x402 setup
// -------------------------
const facilitatorUrl =
  process.env.FACILITATOR_URL || "https://x402.org/facilitator";

const receiverAddress = process.env.RECEIVER_ADDRESS;
const network = process.env.NETWORK || "eip155:84532"; // Base Sepolia
const priceUsd = process.env.PRICE_USD || "0.01";

if (!receiverAddress) {
  console.error("❌ RECEIVER_ADDRESS missing in .env");
  process.exit(1);
}

const x402 = new X402Client({
  facilitatorUrl,
});

// -------------------------
// Claim endpoint (manual x402)
// -------------------------
app.post("/api/claim", async (req, res) => {
  try {
    const paymentHeader = req.headers["x-402-payment"];

    // 1️⃣ No payment → ask for payment
    if (!paymentHeader) {
      return res.status(402).json({
        error: "payment required",
        price: priceUsd,
        currency: "USD",
        payTo: receiverAddress,
        network,
      });
    }

    // 2️⃣ Verify payment with facilitator
    const verification = await x402.verifyPayment({
      paymentHeader,
      price: priceUsd,
      currency: "USD",
      payTo: receiverAddress,
      network,
    });

    if (!verification.valid) {
      return res.status(402).json({ error: "invalid payment" });
    }

    // 3️⃣ Success
    console.log("✅ Smile reward claimed by:", verification.from);

    return res.json({
      success: true,
      message: "Smile reward sent successfully",
      reward: "0.01 USDC",
      payer: verification.from,
      txHash: verification.txHash,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("x402 error:", err);
    return res.status(500).json({ error: "x402 verification failed" });
  }
});

// -------------------------
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
  console.log(`🔐 POST /api/claim (x402 protected)`);
});
