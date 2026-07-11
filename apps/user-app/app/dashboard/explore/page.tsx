"use client";

import { motion } from "framer-motion";

const contacts = [
  { name: "Vivek", number: "97174 22883", lastSent: "3 days ago" },
  { name: "Kavita", number: "96565 61568", lastSent: "1 week ago" },
  { name: "Shaurya", number: "99999 99999", lastSent: "2 weeks ago" },
  { name: "Priya", number: "98989 89898", lastSent: "1 month ago" },
];

const nearbyMerchants = [
  { name: "The Chai Stall", category: "Food & beverage", distance: "0.2 km" },
  { name: "Corner Book Store", category: "Retail", distance: "0.6 km" },
  { name: "Metro Pharmacy", category: "Health", distance: "0.9 km" },
];

export default function Explore() {
  return (
    <div className="px-10 py-8">
      <div className="mb-7">
        <span className="font-mono text-xs text-signal tracking-widest uppercase">
          find people & places
        </span>
        <h1 className="font-display text-2xl font-bold text-foreground mt-1.5">
          Explore
        </h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative mb-8 max-w-md"
      >
        <i
          className="ti ti-search absolute left-4 top-1/2 -translate-y-1/2 text-muted text-base"
          aria-hidden="true"
        />
        <input
          type="text"
          placeholder="Search by name or phone number"
          className="bg-surface border border-border rounded-lg h-11 pl-11 pr-4 w-full font-body text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:border-signal transition-colors"
        />
      </motion.div>

      <div className="mb-8">
        <span className="font-mono text-xs text-muted tracking-wide uppercase mb-3 block">
          recent contacts
        </span>
        <div className="grid grid-cols-4 gap-3">
          {contacts.map((contact, i) => (
            <motion.div
              key={contact.number}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.05 }}
              whileHover={{ y: -3 }}
              className="bg-surface border border-border rounded-xl p-5 flex flex-col items-center gap-2 text-center cursor-pointer"
            >
              <div className="w-11 h-11 rounded-full bg-signal/10 flex items-center justify-center font-mono text-sm text-signal">
                {contact.name[0]}
              </div>
              <div className="font-body text-sm text-foreground">{contact.name}</div>
              <div className="font-mono text-[10px] text-muted">{contact.number}</div>
              <div className="font-mono text-[9.5px] text-muted/60 mt-0.5">
                sent {contact.lastSent}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <span className="font-mono text-xs text-muted tracking-wide uppercase mb-3 block">
          merchants near you
        </span>
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          {nearbyMerchants.map((merchant, i) => (
            <motion.div
              key={merchant.name}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: i * 0.05 }}
              className={`flex items-center justify-between px-5 py-4 ${
                i !== nearbyMerchants.length - 1 ? "border-b border-border/50" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-foreground/5 flex items-center justify-center">
                  <i className="ti ti-building-store text-sm text-muted" aria-hidden="true" />
                </div>
                <div>
                  <div className="font-body text-sm text-foreground">{merchant.name}</div>
                  <div className="font-mono text-[10.5px] text-muted">
                    {merchant.category}
                  </div>
                </div>
              </div>
              <span className="font-mono text-xs text-muted">{merchant.distance}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}