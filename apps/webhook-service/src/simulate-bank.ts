import "dotenv/config";
import crypto from "crypto";

const SECRET = process.env.BANK_WEBHOOK_SECRET!;
const URL = "http://localhost:5002/webhook/onramp";

function computeSignature(payload: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

async function sendWebhook(payload: object, useCorrectSignature: boolean) {
  const body = JSON.stringify(payload);
  const signature = useCorrectSignature
    ? computeSignature(body, SECRET)
    : "0000000000000000000000000000000000000000000000000000000000000000";

  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-bank-signature": signature,
    },
    body,
  });

  console.log(`Status: ${response.status}`);
  console.log(await response.json());
}

async function main() {
  console.log("--- Sending with WRONG signature (should be rejected) ---");
  await sendWebhook({ token: "some-token", amount: 500, status: "Success" }, false);

  console.log("\n--- Sending with CORRECT signature (should succeed, if token exists) ---");
  await sendWebhook({ token: "some-token", amount: 500, status: "Success" }, true);
}

main();