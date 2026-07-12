"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AddMoney from "./add-money";
import SendMoney from "./send-money";
import WithdrawMoney from "./withdraw-money";

const tabs = ["Send", "Add money"] as const;
type Tab = (typeof tabs)[number];

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

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "Send" && <SendMoney />}
          {activeTab === "Add money" && <AddMoney />}
          {/*
          {activeTab === "Withdraw" && <WithdrawMoney />}
          */}
        </motion.div>
      </AnimatePresence>

    </div>
  );
}