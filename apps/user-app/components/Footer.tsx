import Link from "next/link";
import {Paperclip } from "lucide-react";

const footerLinks = {
  Product: ["Send money", "Request money", "Transaction history", "Pricing"],
  Company: ["About us", "Careers", "Contact"],
  Learn: ["Blog", "Security", "Guides", "FAQs"],
};

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 md:px-12 pt-16 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between gap-12 mb-14">
          <div className="flex flex-col gap-3 max-w-xs">
            <span className="font-display text-xl font-bold text-foreground">
              vortex
            </span>
            <p className="font-body text-sm text-muted">
              Money moves at the speed of a thought. No waiting, no
              friction — just a clean record of every rupee.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs text-muted uppercase tracking-wide">
              Follow us on
            </span>
            <div className="flex items-center gap-3">
              <Link
                href="#"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-foreground/30 transition-colors"
              >
                <Paperclip size={15} />
              </Link>
              <Link
                href="#"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-foreground/30 transition-colors"
              >
                <Paperclip size={15} />
              </Link>
              <Link
                href="#"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-foreground/30 transition-colors"
              >
                <Paperclip size={15} />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}