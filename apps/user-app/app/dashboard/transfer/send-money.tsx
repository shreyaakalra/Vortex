"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Check, AlertCircle } from "lucide-react";

const recentRecipients = [
  { name: "Vivek", number: "9717422883" },
  { name: "Kavita", number: "9656561568" },
  { name: "Rohan", number: "9812345678" },
  { name: "Priya", number: "9898989898" },
];

useEffect(() => {
  async function()
})

export default function SendMoney() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function sendMoney() {
    setError("");
    setSuccess(false);

    // Validate before hitting the network
    const trimmedNumber = number.trim();
    if (!/^\d{10}$/.test(trimmedNumber)) {
      setError("Enter a valid 10-digit phone number");
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Enter a valid amount");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number: trimmedNumber, amount: parsedAmount }),
      });

      // Guard against non-JSON responses (e.g. a 500 HTML error page)
      let data;
      try {
        data = await response.json();
      } catch {
        throw new Error("Unexpected response from server");
      }

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Transfer failed");
      }

      setSuccess(true);
    } catch (e: any) {
      setError(e.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setNumber("");
    setAmount("");
    setNote("");
    setError("");
    setSuccess(false);
  }

  const canSubmit = number.trim().length > 0 && amount.trim().length > 0 && !submitting;

  return (
    <div className="px-10 py-8 max-w-2xl">
      <div className="mb-7">
        <span className="font-mono text-xs text-signal tracking-widest uppercase">
          send money
        </span>
        <h1 className="font-display text-2xl font-bold text-foreground mt-1.5">
          Transfer
        </h1>
      </div>

      <AnimatePresence mode="wait">

        {success ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="bg-surface border border-border rounded-2xl p-10 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-signal/10 flex items-center justify-center mb-5">
              <Check className="text-signal" size={28} />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              Payment Successful
            </h2>
            <p className="font-mono text-sm text-muted mb-1">
              Sent ₹{amount} to {number}
            </p>
            {note && (
              <p className="font-body text-xs text-muted/60 mb-8">
                Note: {note}
              </p>
            )}

            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={reset}
              className="font-mono text-sm bg-signal text-background font-medium px-6 py-2.5 rounded-full hover:bg-signal/90 transition-colors"
            >
              Send another payment
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="bg-surface border border-border rounded-2xl p-7"
          >
            <span className="font-mono text-xs text-muted tracking-wide uppercase mb-4 block">
              quick send
            </span>

            <div className="flex gap-3 mb-7">
              {recentRecipients.map((r) => (
                <motion.button
                  key={r.number}
                  type="button"
                  onClick={() => setNumber(r.number)}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex flex-col items-center gap-2 bg-transparent border-none p-0 cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-signal/10 flex items-center justify-center font-mono text-sm text-signal">
                    {r.name[0]}
                  </div>
                  <span className="font-mono text-[10.5px] text-muted">
                    {r.name}
                  </span>
                </motion.button>
              ))}
            </div>

            <div className="border-t border-border pt-6 flex flex-col gap-5">

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 flex items-start gap-3 overflow-hidden"
                  >
                    <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={14} />
                    <div className="flex flex-col">
                      <span className="font-mono text-xs text-red-400 font-medium">
                        Transaction failed
                      </span>
                      <span className="font-mono text-[10.5px] text-red-400/70 mt-0.5">
                        {error}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-col gap-2">
                <label className="font-mono text-xs text-muted tracking-wide uppercase">
                  Recipient&apos;s phone number
                </label>
                <input
                  type="text"
                  value={number}
                  onChange={(e) => setNumber(e.target.value.replace(/[^\d]/g, "").slice(0, 10))}
                  placeholder="10-digit number"
                  inputMode="numeric"
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
                    value={amount}
                    onChange={(e) => {
                      const v = e.target.value;
                      if (/^\d*\.?\d{0,2}$/.test(v)) setAmount(v);
                    }}
                    placeholder="0.00"
                    inputMode="decimal"
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
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="What's this for?"
                  className="bg-background border border-border rounded-lg h-11 px-4 font-body text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:border-signal transition-colors"
                />
              </div>

              <motion.button
                type="button"
                onClick={sendMoney}
                disabled={!canSubmit}
                whileTap={{ scale: 0.98 }}
                className="mt-2 font-mono text-sm bg-signal text-background font-medium h-11 rounded-lg hover:bg-signal/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Sending..." : "Send money"}
              </motion.button>

            </div>
            
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}