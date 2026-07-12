"use client"

import { motion } from "framer-motion";
import { useState } from "react";

export default function AddMoney(){
  const[amount, setAmount] = useState("");
    return(
        <motion.div
              key="addmoney"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="bg-surface border border-border rounded-2xl p-7"
            >
              <span className="font-mono text-xs text-muted tracking-wide uppercase mb-4 block">
                from your bank
              </span>

              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-xs text-muted tracking-wide uppercase">
                    Amount to add
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-sm text-muted">
                      ₹
                    </span>
                    <input
                      type="text"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="bg-background border border-border rounded-lg h-11 pl-8 pr-4 w-full font-body text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:border-signal transition-colors"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  {["500", "1000", "2000", "5000"].map((amt) => (
                    <button
                      key={amt}
                      className="font-mono text-xs border border-border text-muted px-3.5 py-2 rounded-full cursor-pointer hover:border-signal hover:text-signal transition-colors"
                      onClick={() => setAmount(amt)}
                    >
                      ₹{amt}
                    </button>
                  ))}
                </div>

                <div className="border-t border-border pt-5">
                  <span className="font-mono text-xs text-muted tracking-wide uppercase mb-3 block">
                    linked bank
                  </span>
                  <div className="flex items-center justify-between bg-background border border-border rounded-lg px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center font-mono text-[10px] text-muted">
                        HDFC
                      </div>
                      <span className="font-mono text-xs text-foreground">
                        •••• 4821
                      </span>
                    </div>
                    <span className="font-mono text-[10.5px] text-signal">
                      default
                    </span>
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="mt-2 font-mono text-sm bg-signal text-background font-medium h-11 rounded-lg hover:bg-signal/90 transition-colors"
                >
                  Add money
                </motion.button>
              </div>
            </motion.div>
    )
}