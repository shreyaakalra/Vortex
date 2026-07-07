import Navbar from "../components/Navbar";
import LedgerTicker from "../components/LedgerTicker";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-6 md:px-12 py-20 md:py-0">
        <div className="grid md:grid-cols-2 gap-16 max-w-6xl w-full items-center">
          <div className="flex flex-col gap-6">
            <span className="font-mono text-xs text-signal tracking-widest uppercase">
              instant · irreversible · yours
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight">
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
            <div className="flex items-center gap-4 mt-2">
              <Link
                href="/sign-up"
                className="font-mono text-sm bg-signal text-background font-medium px-6 py-3 rounded-full hover:bg-signal/90 transition-colors"
              >
                Open an account
              </Link>
              <Link
                href="/sign-in"
                className="font-mono text-sm text-foreground border border-border px-6 py-3 rounded-full hover:border-foreground/30 transition-colors"
              >
                Sign in
              </Link>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <LedgerTicker />
          </div>
        </div>
      </main>
      

      <footer className="border-t border-border px-6 md:px-12 py-6 flex items-center justify-between">
        <span className="font-mono text-xs text-muted">
          vortex © 2026
        </span>
        <span className="font-mono text-xs text-muted">
          built for people, not banks
        </span>
      </footer>
    </div>
  );
}