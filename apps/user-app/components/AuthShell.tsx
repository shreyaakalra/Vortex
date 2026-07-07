import Link from "next/link";
import Logo from "./Logo";

export default function AuthShell({
  title,
  subtitle,
  footerText,
  footerLinkText,
  footerLinkHref,
  children,
}: {
  title: string;
  subtitle: string;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="flex items-center px-6 md:px-12 h-20 border-b border-border">
        <Link href="/">
          <Logo />
        </Link>
      </nav>

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs text-signal tracking-widest uppercase">
              {subtitle}
            </span>
            <h1 className="font-display text-3xl font-bold tracking-tight">
              {title}
            </h1>
          </div>

          <div className="flex flex-col gap-4">{children}</div>

          <p className="font-mono text-xs text-muted text-center">
            {footerText}{" "}
            <Link
              href={footerLinkHref}
              className="text-signal hover:underline"
            >
              {footerLinkText}
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}