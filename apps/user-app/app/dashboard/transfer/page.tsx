"use client";

import { motion } from "framer-motion";

const recentRecipients = [
  { name: "Vivek", number: "9717422883" },
  { name: "Kavita", number: "9656561568" },
  { name: "Rohan", number: "9812345678" },
  { name: "Priya", number: "9898989898" },
];

export default function Transfer() {
  return (
    <div className="px-10 py-8">
      <div className="mb-7">
        <span className="font-mono text-xs text-signal tracking-widest uppercase">
          send money
        </span>
        <h1 className="font-display text-2xl font-bold text-foreground mt-1.5">
          Transfer
        </h1>
      </div>

      <div className="grid grid-cols-[1fr_360px] gap-6 items-start">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="bg-surface border border-border rounded-2xl p-7"
        >
          <span className="font-mono text-xs text-muted tracking-wide uppercase mb-4 block">
            quick send
          </span>
          <div className="flex gap-3 mb-7">
            {recentRecipients.map((r) => (
              <motion.div
                key={r.number}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.96 }}
                className="flex flex-col items-center gap-2 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-signal/10 flex items-center justify-center font-mono text-sm text-signal">
                  {r.name[0]}
                </div>
                <span className="font-mono text-[10.5px] text-muted">{r.name}</span>
              </motion.div>
            ))}
          </div>

          <div className="border-t border-border pt-6 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs text-muted tracking-wide uppercase">
                Recipient's phone number
              </label>
              <input
                type="text"
                placeholder="10-digit number"
                className="bg-background border border-border rounded-lg h-11 px-4 font-body text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:border-signal transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs text-muted tracking-wide uppercase">
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-sm text-muted">
                  ₹
                </span>
                <input
                  type="text"
                  placeholder="0.00"
                  className="bg-background border border-border rounded-lg h-11 pl-8 pr-4 w-full font-body text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:border-signal transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs text-muted tracking-wide uppercase">
                Note <span className="text-muted/50 normal-case">(optional)</span>
              </label>
              <input
                type="text"
                placeholder="What's this for?"
                className="bg-background border border-border rounded-lg h-11 px-4 font-body text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:border-signal transition-colors"
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              className="mt-2 font-mono text-sm bg-signal text-background font-medium h-11 rounded-lg hover:bg-signal/90 transition-colors"
            >
              Send money
            </motion.button>
          </div>
        </motion.div>

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

          <div className="bg-surface border border-border rounded-2xl p-6">
            <span className="font-mono text-xs text-muted tracking-wide uppercase flex items-center gap-1.5">
              settlement time
            </span>
            <div className="font-display font-bold text-2xl text-signal mt-2">
              &lt;1s
            </div>
            <p className="font-body text-xs text-muted mt-2 leading-relaxed">
              Transfers to other Vortex accounts settle instantly, day or night.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}