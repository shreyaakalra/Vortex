"use client";

import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from "recharts";

const weeklyData = [
  { day: "Mon", amount: 320 },
  { day: "Tue", amount: 850 },
  { day: "Wed", amount: 120 },
  { day: "Thu", amount: 1200 },
  { day: "Fri", amount: 640 },
  { day: "Sat", amount: 1800 },
  { day: "Sun", amount: 400 },
];

const transactions = [
  { name: "arjun.k", type: "P2P received", time: "today, 2:14 pm", amount: "+₹1,200.00", direction: "in" },
  { name: "the chai stall", type: "P2P sent", time: "today, 9:02 am", amount: "−₹40.00", direction: "out" },
  { name: "rohan.v", type: "P2P sent", time: "yesterday, 6:40 pm", amount: "−₹850.00", direction: "out" },
  { name: "bank transfer", type: "on-ramp", time: "2 days ago", amount: "+₹5,000.00", direction: "in" },
  { name: "kavita", type: "P2P received", time: "3 days ago", amount: "+₹300.00", direction: "in" },
  { name: "landlord", type: "P2P sent", time: "5 days ago", amount: "−₹15,000.00", direction: "out" },
];

const filters = ["All", "Sent", "Received", "On-ramp"];

export default function Transactions() {
  return (
    <div className="px-10 py-8">
      <div className="mb-7">
        <span className="font-mono text-xs text-signal tracking-widest uppercase">
          full history
        </span>
        <h1 className="font-display text-2xl font-bold text-foreground mt-1.5">
          Transactions
        </h1>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
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
            ₹6,500.00
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
            ₹15,890.00
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
            24
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
          this week's activity
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
            />
            <Bar dataKey="amount" fill="#3ECF6C" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="flex gap-2 mb-4">
        {filters.map((filter, i) => (
          <span
            key={filter}
            className={`font-mono text-xs px-3.5 py-1.5 rounded-full cursor-pointer ${
              i === 0
                ? "bg-signal text-background"
                : "border border-border text-muted"
            }`}
          >
            {filter}
          </span>
        ))}
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        {transactions.map((tx, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: i * 0.04 }}
            className={`flex items-center justify-between px-5 py-4 ${
              i !== transactions.length - 1 ? "border-b border-border/50" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs ${
                  tx.direction === "in"
                    ? "bg-signal/10 text-signal"
                    : "bg-foreground/5 text-muted"
                }`}
              >
                {tx.name[0].toUpperCase()}
              </div>
              <div>
                <div className="font-body text-sm text-foreground">{tx.name}</div>
                <div className="font-mono text-[10.5px] text-muted">
                  {tx.type} · {tx.time}
                </div>
              </div>
            </div>
            <span
              className={`font-mono text-sm ${
                tx.direction === "in" ? "text-signal" : "text-foreground"
              }`}
            >
              {tx.amount}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}