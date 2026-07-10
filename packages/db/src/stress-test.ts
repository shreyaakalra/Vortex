import { prisma } from "./index";
import transferMoney from "./transfers";

const NUM_TRANSFERS = 20;
const AMOUNT_PER_TRANSFER = 100;

async function main() {
  // Adjust these to match your actual seeded user IDs/numbers
  const sender = await prisma.user.findUnique({ where: { number: "9717422883" } }); // Vivek
  const receiver = await prisma.user.findUnique({ where: { number: "9656561568" } }); // Kavita

  if (!sender || !receiver) {
    throw new Error("Seeded users not found — check numbers match your seed script");
  }

  const senderBalanceBefore = await prisma.balance.findUnique({
    where: { userId: sender.id },
  });
  const receiverBalanceBefore = await prisma.balance.findUnique({
    where: { userId: receiver.id },
  });

  console.log("--- BEFORE ---");
  console.log(`Sender (${sender.name}):`, senderBalanceBefore?.amount);
  console.log(`Receiver (${receiver.name}):`, receiverBalanceBefore?.amount);

  // Fire all transfers at once — genuinely concurrent, not sequential
  const promises = Array.from({ length: NUM_TRANSFERS }, () =>
    transferMoney(sender.id, receiver.id, AMOUNT_PER_TRANSFER)
  );

  const results = await Promise.all(promises);

  const succeeded = results.filter((r) => r.success).length;
  const failed = results.filter((r) => !r.success);

  console.log(`\n--- RESULTS ---`);
  console.log(`Succeeded: ${succeeded} / ${NUM_TRANSFERS}`);
  if (failed.length > 0) {
    console.log("Failures:", failed.map((f) => f.message));
  }

  const senderBalanceAfter = await prisma.balance.findUnique({
    where: { userId: sender.id },
  });
  const receiverBalanceAfter = await prisma.balance.findUnique({
    where: { userId: receiver.id },
  });

  console.log("\n--- AFTER ---");
  console.log(`Sender (${sender.name}):`, senderBalanceAfter?.amount);
  console.log(`Receiver (${receiver.name}):`, receiverBalanceAfter?.amount);

  const expectedMoved = succeeded * AMOUNT_PER_TRANSFER;
  const actualSenderChange = (senderBalanceBefore?.amount ?? 0) - (senderBalanceAfter?.amount ?? 0);
  const actualReceiverChange = (receiverBalanceAfter?.amount ?? 0) - (receiverBalanceBefore?.amount ?? 0);

  console.log(`\n--- VERIFICATION ---`);
  console.log(`Expected amount moved: ${expectedMoved}`);
  console.log(`Actual sender decrease: ${actualSenderChange}`);
  console.log(`Actual receiver increase: ${actualReceiverChange}`);

  if (actualSenderChange === expectedMoved && actualReceiverChange === expectedMoved) {
    console.log("\n✅ PASS — no lost updates, balances are consistent.");
  } else {
    console.log("\n❌ FAIL — balances don't match expected values. Race condition likely.");
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