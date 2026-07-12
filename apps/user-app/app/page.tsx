import Navbar from "../components/Navbar";
import LedgerTicker from "../components/LedgerTicker";
import Features from "../components/Features";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 flex flex-col justify-center px-6 md:px-12 py-16 md:py-0">
        <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-16 items-center pt-20">

          {/* Left: copy + capture */}
          <div className="flex flex-col gap-6">

            <h1 className="font-display text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight text-foreground">
              Money moves
              <br />
              at the speed of
              <br />
              <span className="text-signal">a thought.</span>
            </h1>

            <p className="font-body text-muted text-lg max-w-md">
              Send to anyone by number, name, or QR. No waiting, no
              friction — just a clean record of every rupee, every time.
            </p>

            <div className="flex items-center gap-2 bg-surface border border-border rounded-full p-1.5 max-w-md mt-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-transparent px-4 py-2 font-body text-sm text-foreground placeholder:text-muted/60 focus:outline-none min-w-0"
              />
              <Link
                href="/sign-up"
                className="shrink-0 flex items-center gap-1.5 font-mono text-sm bg-signal text-background font-medium px-5 py-2.5 rounded-full hover:bg-signal/90 transition-colors"
              >
                Get started
                <ArrowRight size={14} />
              </Link>
            </div>

            <Link
              href="/sign-in"
              className="font-mono text-xs text-muted hover:text-foreground transition-colors w-fit"
            >
              Already have an account? Sign in →
            </Link>

            <div className="flex items-center gap-6 mt-8 pt-6 border-t border-border">
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold text-foreground">₹2.4Cr+</span>
                <span className="font-mono text-[10.5px] text-muted uppercase tracking-wide">moved monthly</span>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold text-foreground">50k+</span>
                <span className="font-mono text-[10.5px] text-muted uppercase tracking-wide">active users</span>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold text-foreground">&lt;1s</span>
                <span className="font-mono text-[10.5px] text-muted uppercase tracking-wide">avg. transfer</span>
              </div>
            </div>
          </div>

          {/* Right: visual anchor */}
          <div className="relative flex justify-center md:justify-end">
            <div className="absolute -inset-6 bg-signal/5 rounded-[2.5rem] -z-10 hidden md:block" />

            <div className="relative bg-surface border border-border rounded-2xl p-6 w-full max-w-sm shadow-2xl shadow-black/40">
              <LedgerTicker />
            </div>

            <div className="hidden md:flex absolute -top-8 -right-6 w-44 flex-col gap-3 bg-signal text-background rounded-2xl p-4 rotate-[6deg] shadow-xl shadow-signal/20">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-widest uppercase opacity-70">balance</span>
                <Zap size={14} />
              </div>
              <span className="font-display text-xl font-bold">₹12,480</span>
              <span className="font-mono text-[10px] opacity-70">•••• 4823</span>
            </div>
          </div>

        </div>
      </main>

      <Features />
      <Footer />
    </div>
  );
}