// 1. get the secret
// 2. get the signature from headers
// 3. get rawBody
// 4. verify the signature
// 5. get token amount and status
// 6. do an on ramp transfer
// 7. return the result

import express from "express";
import "dotenv/config";
import { onRampTransfer } from "@vortex/db";
import { verifySignature } from "./verifySignature.js";

const app = express();
const PORT = process.env.PORT || 5002;

app.use(express.json({
  verify: (req: any, res, buf) => {
    req.rawBody = buf.toString();
  }
}));

app.post("/webhook/onramp", async (req, res) => {
  try {
    const secret = process.env.BANK_WEBHOOK_SECRET;
    if (!secret) {
      console.error("BANK_WEBHOOK_SECRET not set");
      return res.status(500).json({ message: "Server misconfigured" });
    }

    const signature = req.headers["x-bank-signature"] as string;
    if (!signature) {
      return res.status(401).json({ message: "Missing signature" });
    }

    const rawBody = (req as any).rawBody;
    const isValid = verifySignature(rawBody, signature, secret);

    if (!isValid) {
      return res.status(401).json({ message: "Invalid signature" });
    }

    const { token, amount, status } = req.body;

    if (!token || amount === undefined || !status) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await onRampTransfer(token, amount, status);

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Webhook service running on port ${PORT}`);
});