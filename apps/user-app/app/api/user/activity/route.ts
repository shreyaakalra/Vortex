import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromRequest } from "../../../../lib/auth";
import { prisma } from "@vortex/db";

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatRelativeTime(date: Date) {
  const now = new Date();
  const isSameDay = date.toDateString() === now.toDateString();

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  const time = date.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).toLowerCase();

  if (isSameDay) return `today, ${time}`;
  if (isYesterday) return `yesterday, ${time}`;
  return `${DAY_LABELS[date.getDay()] ?? ""}, ${time}`;
}

export async function GET(req: NextRequest) {
  try {
    const userId = getUserIdFromRequest(req);

    if (!userId) {
      return NextResponse.json({ message: "User Not Found" }, { status: 401 });
    }

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const [balanceRow, ledgerEntries] = await Promise.all([
      prisma.balance.findUnique({
        where: { userId },
        select: { amount: true },
      }),
      prisma.ledger.findMany({
        where: {
          type: "P2P",
          status: "SUCCESS",
          createdAt: { gte: sevenDaysAgo },
          OR: [{ fromUserId: userId }, { toUserId: userId }],
        },
        orderBy: { createdAt: "asc" },
        include: {
          fromUser: { select: { name: true } },
          toUser: { select: { name: true } },
        },
      }),
    ]);

    const currentBalance = balanceRow?.amount ?? 0;

    // Each entry's effect on *this* user's balance
    const withDelta = ledgerEntries.map((entry) => ({
      ...entry,
      delta: entry.toUserId === userId ? entry.amount : -entry.amount,
    }));

    // Walk backward from the current balance to find the balance at the
    // start of the window, then walk forward to build a daily series.
    const netChangeOverWindow = withDelta.reduce((sum, e) => sum + e.delta, 0);
    let runningBalance = currentBalance - netChangeOverWindow;

    const dailyBalance = new Map<string, number>();
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      dailyBalance.set(d.toDateString(), runningBalance);
    }

    for (const entry of withDelta) {
      runningBalance += entry.delta;
      const dateKey = entry.createdAt.toDateString();
      if (dailyBalance.has(dateKey)) {
        dailyBalance.set(dateKey, runningBalance);
      }
    }

    let lastKnown = currentBalance - netChangeOverWindow;
    const history: { day: string; value: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const key = d.toDateString();
      const value = dailyBalance.get(key) ?? lastKnown;
      lastKnown = value;
      history.push({ day: DAY_LABELS[d.getDay()] ?? "", value });
    }

    const activity = withDelta
      .slice()
      .reverse()
      .slice(0, 10)
      .map((entry) => {
        const direction = entry.toUserId === userId ? "in" : "out";
        const counterpartyName =
          direction === "in" ? entry.fromUser?.name : entry.toUser?.name;

        return {
          name: counterpartyName ?? "unknown",
          time: formatRelativeTime(entry.createdAt),
          amount: `${direction === "in" ? "+" : "\u2212"}\u20b9${entry.amount.toLocaleString("en-IN")}`,
          direction,
        };
      });

    return NextResponse.json({ history, activity }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}