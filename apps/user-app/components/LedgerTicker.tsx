"use client";

import { motion } from "framer-motion";

const entries = [
  { from: "arjun", to: "meera", amount: "₹1,200.00", time: "14:02:18" },
  { from: "the chai stall", to: "you", amount: "₹40.00", time: "14:02:41" },
  { from: "you", to: "rohan", amount: "₹850.00", time: "14:03:05" },
  { from: "priya", to: "you", amount: "₹3,000.00", time: "14:03:22" },
  { from: "you", to: "landlord", amount: "₹15,000.00", time: "14:03:59" },
];

export default function LedgerTicker() {
  return (
    <div className="relative w-full max-w-md h-80 overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <span className="font-mono text-xs text-muted tracking-wider">
          LIVE LEDGER
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
          <span className="font-mono text-xs text-signal">streaming</span>
        </span>
      </div>

      <motion.div
        className="flex flex-col"
        animate={{ y: ["0%", "-50%"] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...entries, ...entries].map((entry, i) => (
          <div
            key={i}
            className="flex items-center justify-between px-4 py-3 border-b border-border/50"
          >
            <div className="flex flex-col">
              <span className="font-mono text-xs text-muted">
                {entry.from} → {entry.to}
              </span>
              <span className="font-mono text-[10px] text-muted/60">
                {entry.time}
              </span>
            </div>
            <span className="font-mono text-sm text-signal font-medium">
              {entry.amount}
            </span>
          </div>
        ))}
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-surface to-transparent pointer-events-none" />
    </div>
  );
}