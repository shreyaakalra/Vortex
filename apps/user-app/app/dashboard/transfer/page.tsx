"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AddMoney from "./add-money";
import SendMoney from "./send-money";
import WithdrawMoney from "./withdraw-money";

const tabs = ["Send", "Add money", "Withdraw"] as const;
type Tab = string;



export default function Transfer() {
  const [activeTab, setActiveTab] = useState<Tab>("Send");

  return (
    <div className="px-10 py-8">

      <div className="mb-7">
        <span className="font-mono text-xs text-signal tracking-widest uppercase">
          move money
        </span>
        <h1 className="font-display text-2xl font-bold text-foreground mt-1.5">
          Transfer
        </h1>
      </div>

      <div className="flex gap-1 mb-6 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative font-mono text-xs px-4 py-3 transition-colors ${
              activeTab === tab
                ? "text-signal"
                : "text-muted hover:text-foreground"
            }`}
          >
            {tab.toLowerCase()}
            {activeTab === tab && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-signal"
              />
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[1fr_360px] gap-6 items-start">

        <AnimatePresence mode="wait">
          {activeTab === "Send" && (
            <SendMoney />
          )}

          {activeTab === "Add money" && (
            <AddMoney />
          )}

          {activeTab === "Withdraw" && (
            <WithdrawMoney />
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.08 }}
          className="flex flex-col gap-4"
        >
          <div className="bg-surface border border-border rounded-2xl p-6">
            <span className="font-mono text-xs text-muted tracking-wide uppercase">
              available balance
            </span>
            <div className="font-display font-bold text-2xl text-foreground mt-2">
              ₹2,450.00
            </div>
          </div>

          <div className="bg-surface border border-border rounded-2xl p-6">
            <span className="font-mono text-xs text-muted tracking-wide uppercase">
              daily transfer limit
            </span>
            <div className="font-display font-bold text-2xl text-foreground mt-2">
              ₹50,000
            </div>
            <div className="w-full h-1.5 bg-border rounded-full mt-4 overflow-hidden">
              <div className="h-full bg-signal rounded-full" style={{ width: "18%" }} />
            </div>
            <div className="font-mono text-[10.5px] text-muted mt-2">
              ₹9,200 used today
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}