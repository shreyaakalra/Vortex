"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from "recharts";

type LedgerType = "ONRAMP" | "P2P" | "OFFRAMP";

interface LedgerEntry {
  id: number;
  type: LedgerType;
  amount: number;
  status: string;
  fromUserId: number | null;
  toUserId: number | null;
  createdAt: string;
  fromUser: { name: string } | null;
  toUser: { name: string } | null;
}

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const filters = ["All", "Sent", "Received", "On-ramp"] as const;
type Filter = (typeof filters)[number];

function formatRelativeTime(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const isSameDay = date.toDateString() === now.toDateString();

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  const time = date
    .toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true })
    .toLowerCase();

  if (isSameDay) return `today, ${time}`;
  if (isYesterday) return `yesterday, ${time}`;

  const daysAgo = Math.round((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (daysAgo <= 6) return `${daysAgo} days ago`;

  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

export default function Transactions() {
  const [userId, setUserId] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<LedgerEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");

        const [userRes, txRes] = await Promise.all([
          fetch("/api/user/info"),
          fetch("/api/user/transactions"),
        ]);

        if (!userRes.ok) {
          console.error("user/info failed:", userRes.status, await userRes.text());
          throw new Error(`Couldn't load your account (${userRes.status})`);
        }

        if (!txRes.ok) {
          console.error("transactions failed:", txRes.status, await txRes.text());
          throw new Error(`Couldn't load your transactions (${txRes.status})`);
        }

        const userData = await userRes.json();
        const txData = await txRes.json();

        setUserId(userData?.user?.id ?? null);
        setTransactions(txData.transactions ?? []);
      } catch (e: any) {
        console.error(e);
        setError(e.message || "Couldn't load your transactions");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Derive a display-friendly shape once we know which side of each
  // transaction the current user is on.
  const enriched = useMemo(() => {
    if (userId === null) return [];

    return transactions.map((tx) => {
      const direction: "in" | "out" = tx.toUserId === userId ? "in" : "out";

      let name: string;
      let typeLabel: string;

      if (tx.type === "ONRAMP") {
        name = "bank transfer";
        typeLabel = "on-ramp";
      } else if (tx.type === "OFFRAMP") {
        name = "bank withdrawal";
        typeLabel = "off-ramp";
      } else {
        name = direction === "in" ? tx.fromUser?.name ?? "unknown" : tx.toUser?.name ?? "unknown";
        typeLabel = direction === "in" ? "P2P received" : "P2P sent";
      }

      return {
        id: tx.id,
        name,
        typeLabel,
        direction,
        amount: tx.amount,
        createdAt: tx.createdAt,
        time: formatRelativeTime(tx.createdAt),
        formattedAmount: `${direction === "in" ? "+" : "\u2212"}\u20b9${tx.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
      };
    });
  }, [transactions, userId]);

  const filtered = useMemo(() => {
    switch (activeFilter) {
      case "Sent":
        return enriched.filter((tx) => tx.direction === "out");
      case "Received":
        return enriched.filter((tx) => tx.direction === "in");
      case "On-ramp":
        return enriched.filter((tx) => tx.typeLabel === "on-ramp");
      default:
        return enriched;
    }
  }, [enriched, activeFilter]);

  const stats = useMemo(() => {
    const now = new Date();
    const totalReceived = enriched
      .filter((tx) => tx.direction === "in")
      .reduce((sum, tx) => sum + tx.amount, 0);
    const totalSent = enriched
      .filter((tx) => tx.direction === "out")
      .reduce((sum, tx) => sum + tx.amount, 0);
    const thisMonthCount = enriched.filter((tx) => {
      const d = new Date(tx.createdAt);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;

    return { totalReceived, totalSent, thisMonthCount };
  }, [enriched]);

  const weeklyData = useMemo(() => {
    const today = new Date();
    const totals = new Map<string, number>();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      totals.set(d.toDateString(), 0);
    }

    for (const tx of enriched) {
      const key = new Date(tx.createdAt).toDateString();
      if (totals.has(key)) {
        totals.set(key, (totals.get(key) ?? 0) + tx.amount);
      }
    }

    return Array.from(totals.entries()).map(([dateStr, amount]) => ({
      day: DAY_LABELS[new Date(dateStr).getDay()] ?? "",
      amount,
    }));
  }, [enriched]);

  return (
    <div className="px-5 sm:px-8 lg:px-10 py-6 lg:py-8">
      <div className="mb-7">
        <span className="font-mono text-xs text-signal tracking-widest uppercase">
          full history
        </span>
        <h1 className="font-display text-2xl font-bold text-foreground mt-1.5">
          Transactions
        </h1>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center gap-3 h-[50vh]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 rounded-full border-2 border-border border-t-signal"
          />
          <span className="font-mono text-xs text-muted tracking-wide">
            loading your transactions
          </span>
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-5 py-4">
          <span className="font-mono text-sm text-red-400">{error}</span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-surface border border-border rounded-xl p-5"
            >
              <span className="font-mono text-[11px] text-muted tracking-wide uppercase">
                total received
              </span>
              <div className="font-display font-bold text-xl text-signal mt-1.5">
                ₹{stats.totalReceived.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="bg-surface border border-border rounded-xl p-5"
            >
              <span className="font-mono text-[11px] text-muted tracking-wide uppercase">
                total sent
              </span>
              <div className="font-display font-bold text-xl text-foreground mt-1.5">
                ₹{stats.totalSent.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-surface border border-border rounded-xl p-5"
            >
              <span className="font-mono text-[11px] text-muted tracking-wide uppercase">
                transactions this month
              </span>
              <div className="font-display font-bold text-xl text-foreground mt-1.5">
                {stats.thisMonthCount}
              </div>
            </motion.div>
          </div>


          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.12 }}
            className="bg-surface border border-border rounded-2xl p-6 mb-6"
          >
            <span className="font-mono text-xs text-muted tracking-wide uppercase mb-4 block">
              this week&apos;s activity
            </span>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={weeklyData}>
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#8A8D91", fontSize: 11, fontFamily: "JetBrains Mono" }}
                />
                <Tooltip
                  cursor={{ fill: "rgba(237,234,227,0.04)" }}
                  contentStyle={{
                    background: "#0B0D0F",
                    border: "1px solid rgba(237,234,227,0.12)",
                    borderRadius: 8,
                    fontSize: 12,
                    fontFamily: "JetBrains Mono",
                  }}
                  formatter={(value) => [`₹${Number(value ?? 0).toLocaleString("en-IN")}`, "volume"]}
                />
                <Bar dataKey="amount" fill="#3ECF6C" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <div className="flex gap-2 mb-4">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`font-mono text-xs px-3.5 py-1.5 rounded-full cursor-pointer transition-colors ${
                  activeFilter === filter
                    ? "bg-signal text-background"
                    : "border border-border text-muted hover:text-foreground hover:border-foreground/30"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="bg-surface border border-border rounded-xl overflow-hidden">
            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <div className="px-5 py-8 text-center">
                  <span className="font-body text-sm text-muted">
                    No transactions match this filter.
                  </span>
                </div>
              ) : (
                filtered.map((tx, i) => (
                  <motion.div
                    key={tx.id}
                    layout
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.03 }}
                    className={`flex items-center justify-between gap-3 px-4 sm:px-5 py-4 ${
                      i !== filtered.length - 1 ? "border-b border-border/50" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center font-mono text-xs ${
                          tx.direction === "in"
                            ? "bg-signal/10 text-signal"
                            : "bg-foreground/5 text-muted"
                        }`}
                      >
                        {tx.name ? tx.name[0]?.toUpperCase() : ""}
                      </div>
                      <div className="min-w-0">
                        <div className="font-body text-sm text-foreground truncate">{tx.name}</div>
                        <div className="font-mono text-[10.5px] text-muted truncate">
                          {tx.typeLabel} · {tx.time}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`font-mono text-sm shrink-0 ${
                        tx.direction === "in" ? "text-signal" : "text-foreground"
                      }`}
                    >
                      {tx.formattedAmount}
                    </span>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  );
}