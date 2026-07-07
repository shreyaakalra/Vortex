import Link from "next/link";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 md:px-12 h-20 border-b border-border">
      <Link href="/">
        <Logo />
      </Link>
      <div className="flex items-center gap-3">
        <Link
          href="/sign-in"
          className="font-mono text-sm text-muted hover:text-foreground transition-colors px-4 py-2"
        >
          Sign in
        </Link>
        <Link
          href="/sign-up"
          className="font-mono text-sm bg-signal text-background font-medium px-5 py-2 rounded-full hover:bg-signal/90 transition-colors"
        >
          Get started
        </Link>
      </div>
    </nav>
  );
}