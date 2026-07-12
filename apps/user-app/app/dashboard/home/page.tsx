"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, ResponsiveContainer, Tooltip } from "recharts";

interface UserType {
  id?: number;
  name?: string;
  email?: string;
  number?: string;
  balance?: {
    id?: number;
    amount?: number;
  };
}

interface HistoryPoint {
  day: string;
  value: number;
}

interface ActivityItem {
  name: string;
  time: string;
  amount: string;
  direction: "in" | "out";
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "good morning";
  if (hour < 17) return "good afternoon";
  return "good evening";
}

export default function DashboardHome() {
  const [user, setUser] = useState<UserType>({});
  const [history, setHistory] = useState<HistoryPoint[]>([]);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        setLoading(true);

        const [userRes, activityRes] = await Promise.all([
          fetch("/api/user/info"),
          fetch("/api/user/activity"),
        ]);

        if (!userRes.ok) {
          throw new Error("Something went wrong!");
        }

        const userData = await userRes.json();
        setUser(userData.user ?? {});

        if (activityRes.ok) {
          const activityData = await activityRes.json();
          setHistory(activityData.history ?? []);
          setActivity(activityData.activity ?? []);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  return (
    <div className="px-5 sm:px-8 lg:px-10 py-6 lg:py-8">
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
          <div className="mb-6 lg:mb-7">
            <span className="font-mono text-xs text-signal tracking-widest uppercase">
              {getGreeting()}
            </span>
            <h1 className="font-display text-xl sm:text-2xl font-bold text-foreground mt-1.5">
              Welcome back{user.name ? `, ${user.name}` : ""}
            </h1>
          </div>

          <div className="mb-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="bg-surface border border-border rounded-2xl p-5 sm:p-7"
            >
              <span className="font-mono text-xs text-muted tracking-wide">
                available balance
              </span>
              <div className="font-display font-bold text-3xl sm:text-4xl text-foreground mt-2">
                ₹{(user.balance?.amount ?? 0).toLocaleString("en-IN")}
              </div>
              
              <div className="mt-4 -mx-2">
                <ResponsiveContainer width="100%" height={100}>
                  <AreaChart data={history}>
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
                      formatter={(value) => [`₹${Number(value ?? 0).toLocaleString("en-IN")}`, "balance"]}
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
          </div>

          <div className="flex items-center justify-between mb-3.5">
            <span className="font-mono text-xs text-muted tracking-wide uppercase">
              recent activity
            </span>
          </div>

          <div className="bg-surface border border-border rounded-xl overflow-hidden">
            {activity.length === 0 ? (
              <div className="px-4.5 py-6 text-center">
                <span className="font-body text-sm text-muted">
                  No transactions yet this week.
                </span>
              </div>
            ) : (
              activity.map((tx, i) => (
                <motion.div
                  key={`${tx.name}-${tx.time}-${i}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.05 }}
                  className={`flex items-center justify-between gap-3 px-3.5 sm:px-4.5 py-3.5 ${
                    i !== activity.length - 1
                      ? "border-b border-border/50"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center ${
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
                    <div className="min-w-0">
                      <div className="font-body text-sm text-foreground truncate">
                        {tx.name}
                      </div>
                      <div className="font-mono text-[10.5px] text-muted">
                        {tx.time}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`font-mono text-sm shrink-0 ${
                      tx.direction === "in" ? "text-signal" : "text-foreground"
                    }`}
                  >
                    {tx.amount}
                  </span>
                </motion.div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}