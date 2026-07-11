"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, ResponsiveContainer, Tooltip } from "recharts";

const balanceHistory = [
  { day: "Mon", value: 1800 },
  { day: "Tue", value: 2100 },
  { day: "Wed", value: 1950 },
  { day: "Thu", value: 3200 },
  { day: "Fri", value: 2900 },
  { day: "Sat", value: 2600 },
  { day: "Sun", value: 2450 },
];

const recentActivity = [
  {
    name: "arjun.k",
    time: "today, 2:14 pm",
    amount: "+₹1,200.00",
    direction: "in",
  },
  {
    name: "the chai stall",
    time: "today, 9:02 am",
    amount: "−₹40.00",
    direction: "out",
  },
  {
    name: "rohan.v",
    time: "yesterday, 6:40 pm",
    amount: "−₹850.00",
    direction: "out",
  },
];

const quickActions = [
  { label: "send", icon: "ti-arrow-up-right", primary: true },
  { label: "add money", icon: "ti-download", primary: false },
  { label: "withdraw", icon: "ti-upload", primary: false },
];

interface userType {
  id?: number;
  name?: string;
  email?: string;
  number?: string;
  balance?: {
    id?: number;
    amount?: number;
  };
}

export default function DashboardHome() {
  const [user, setUser] = useState<userType>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const response = await fetch("/api/user/info");

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const data = await response.json();
        setUser(data.user);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div className="px-10 py-8">
      {loading ? (
        <div className="flex flex-col items-center justify-center gap-3 h-[70vh]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 rounded-full border-2 border-border border-t-signal"
          />
          <span className="font-mono text-xs text-muted tracking-wide">
            loading your account
          </span>
        </div>
      ) : (
        <div>
          <div className="mb-7">
            <span className="font-mono text-xs text-signal tracking-widest uppercase">
              good afternoon
            </span>
            <h1 className="font-display text-2xl font-bold text-foreground mt-1.5">
              Welcome back {user.name}
            </h1>
          </div>

          <div className="grid grid-cols-[1fr_320px] gap-5 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="bg-surface border border-border rounded-2xl p-7"
            >
              <span className="font-mono text-xs text-muted tracking-wide">
                available balance
              </span>
              <div className="font-display font-bold text-4xl text-foreground mt-2">
                ₹{(user.balance?.amount ?? 0).toLocaleString('en-IN')}
              </div>
              <div className="flex gap-3 mt-5 mb-2">
                {quickActions.map((action) => (
                  <motion.button
                    key={action.label}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className={`font-mono text-xs px-5 py-2.5 rounded-full flex items-center gap-1.5 ${
                      action.primary
                        ? "bg-signal text-background font-medium"
                        : "text-foreground border border-border"
                    }`}
                  >
                    <i
                      className={`ti ${action.icon} text-sm`}
                      aria-hidden="true"
                    />
                    {action.label}
                  </motion.button>
                ))}
              </div>

              <div className="mt-4 -mx-2">
                <ResponsiveContainer width="100%" height={100}>
                  <AreaChart data={balanceHistory}>
                    <defs>
                      <linearGradient
                        id="balanceFill"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#3ECF6C"
                          stopOpacity={0.25}
                        />
                        <stop
                          offset="100%"
                          stopColor="#3ECF6C"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: "#8A8D91",
                        fontSize: 10,
                        fontFamily: "JetBrains Mono",
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "#0B0D0F",
                        border: "1px solid rgba(237,234,227,0.12)",
                        borderRadius: 8,
                        fontSize: 11,
                        fontFamily: "JetBrains Mono",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#3ECF6C"
                      strokeWidth={2}
                      fill="url(#balanceFill)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.08 }}
              className="flex flex-col gap-4"
            >
              <div className="bg-surface border border-border rounded-2xl p-6">
                <span className="font-mono text-[11px] text-muted tracking-wide uppercase">
                  this month
                </span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="font-display font-bold text-xl text-signal">
                    +₹6,500
                  </span>
                  <span className="font-mono text-[10.5px] text-muted">
                    received
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-display font-bold text-xl text-foreground">
                    −₹15,890
                  </span>
                  <span className="font-mono text-[10.5px] text-muted">
                    sent
                  </span>
                </div>
              </div>

              <div className="bg-surface border border-border rounded-2xl p-6">
                <span className="font-mono text-[11px] text-muted tracking-wide uppercase">
                  quick scan
                </span>
                <div className="flex items-center justify-center py-4">
                  <div className="w-20 h-20 rounded-lg border border-border flex items-center justify-center">
                    <i
                      className="ti ti-qrcode text-3xl text-muted"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <p className="font-body text-xs text-muted text-center leading-relaxed">
                  Scan a QR to pay a merchant instantly.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="flex items-center justify-between mb-3.5">
            <span className="font-mono text-xs text-muted tracking-wide uppercase">
              recent activity
            </span>
            <span className="font-mono text-xs text-signal cursor-pointer">
              view all
            </span>
          </div>

          <div className="bg-surface border border-border rounded-xl overflow-hidden">
            {recentActivity.map((tx, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: i * 0.05 }}
                className={`flex items-center justify-between px-4.5 py-3.5 ${
                  i !== recentActivity.length - 1
                    ? "border-b border-border/50"
                    : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      tx.direction === "in" ? "bg-signal/10" : "bg-foreground/5"
                    }`}
                  >
                    <i
                      className={`ti ${
                        tx.direction === "in"
                          ? "ti-arrow-down-left"
                          : "ti-arrow-up-right"
                      } text-sm ${tx.direction === "in" ? "text-signal" : "text-muted"}`}
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <div className="font-body text-sm text-foreground">
                      {tx.name}
                    </div>
                    <div className="font-mono text-[10.5px] text-muted">
                      {tx.time}
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
      )}
    </div>
  );
}
