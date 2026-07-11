import { motion } from "framer-motion";

export default function WithdrawMoney(){
    return(
        <motion.div
              key="withdraw"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="bg-surface border border-border rounded-2xl p-7"
            >
              <span className="font-mono text-xs text-muted tracking-wide uppercase mb-4 block">
                to your bank
              </span>

              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-xs text-muted tracking-wide uppercase">
                    Amount to withdraw
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

                <div className="border-t border-border pt-5">
                  <span className="font-mono text-xs text-muted tracking-wide uppercase mb-3 block">
                    withdraw to
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

                <div className="flex items-start gap-2 bg-amber/10 rounded-lg px-3.5 py-3">
                  <span className="font-mono text-[10.5px] text-amber leading-relaxed">
                    Withdrawals are processed in batches and may take up to 2 business days to reflect in your bank account.
                  </span>
                </div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="mt-2 font-mono text-sm bg-signal text-background font-medium h-11 rounded-lg hover:bg-signal/90 transition-colors"
                >
                  Withdraw
                </motion.button>
              </div>
            </motion.div>
    )
}