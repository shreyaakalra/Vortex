import "dotenv/config";
import { prisma } from "./index.js";
import onRampTransfer from "./onramp.js";

const TEST_TOKEN = `test-token-${Date.now()}`;
const AMOUNT = 500;

async function main() {
  const user = await prisma.user.findUnique({ where: { number: "8700777249" } }); 

  if (!user) {
    throw new Error("Seeded user not found — check the number matches your seed script");
  }

  const balanceBefore = await prisma.balance.findUnique({ where: { userId: user.id } });
  console.log("--- BEFORE ---");
  console.log(`${user.name}'s balance:`, balanceBefore?.amount);

  
  await prisma.onRampTransaction.create({
    data: {
      token: TEST_TOKEN,
      provider: "TEST_BANK",
      amount: AMOUNT,
      status: "Pending",
      userId: user.id,
    },
  });

  console.log(`\nCreated OnRampTransaction with token: ${TEST_TOKEN}`);

  
  console.log("\n--- FIRST WEBHOOK CALL ---");
  const firstResult = await onRampTransfer(TEST_TOKEN, AMOUNT, "Success");
  console.log(firstResult);

  const balanceAfterFirst = await prisma.balance.findUnique({ where: { userId: user.id } });
  console.log(`${user.name}'s balance after first call:`, balanceAfterFirst?.amount);


  console.log("\n--- DUPLICATE WEBHOOK CALL (same token) ---");
  const secondResult = await onRampTransfer(TEST_TOKEN, AMOUNT, "Success");
  console.log(secondResult);

  const balanceAfterSecond = await prisma.balance.findUnique({ where: { userId: user.id } });
  console.log(`${user.name}'s balance after duplicate call:`, balanceAfterSecond?.amount);

  console.log("\n--- VERIFICATION ---");
  const expectedBalance = (balanceBefore?.amount ?? 0) + AMOUNT;
  const actualBalance = balanceAfterSecond?.amount ?? 0;

  console.log(`Expected final balance: ${expectedBalance}`);
  console.log(`Actual final balance: ${actualBalance}`);

  const firstCallCredited = balanceAfterFirst?.amount === expectedBalance;
  const secondCallDidNotDoubleCreit = balanceAfterSecond?.amount === expectedBalance;
  const secondCallReportedAlreadyProcessed = secondResult.success === true && "message" in secondResult;

  if (firstCallCredited && secondCallDidNotDoubleCreit && secondCallReportedAlreadyProcessed) {
    console.log("\n PASS — first call credited once, duplicate call did not double-credit.");
  } else {
    console.log("\n FAIL — idempotency check did not work as expected.");
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });