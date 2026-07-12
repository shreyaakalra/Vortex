import { RefreshCcw, Landmark, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: RefreshCcw,
    title: "Zero-fee transfers",
    description:
      "Send by number, name, or QR without paying a cut. Schedule recurring payments and let them run themselves.",
  },
  {
    icon: Landmark,
    title: "Every account, one place",
    description:
      "Link multiple accounts and move between them freely. Your balance is always one screen away.",
  },
  {
    icon: ShieldCheck,
    title: "Bank-grade security",
    description:
      "Card-locking, device-level MFA, and a full audit trail on every rupee that moves through your account.",
  },
];

export default function Features() {
  return (
    <section className="px-6 md:px-12 py-20 md:py-28">
      <div className="max-w-6xl mx-auto bg-surface border border-border rounded-3xl p-8 md:p-14">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-16">
          <div className="flex flex-col gap-3 max-w-lg">
            <span className="font-mono text-xs text-signal tracking-widest uppercase">
              future payment
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight text-foreground">
              Built to move
              <br />
              at your scale.
            </h2>
          </div>
          <p className="font-body text-muted text-base max-w-sm md:pt-8">
            A financial layer that works whether you&apos;re splitting a
            dinner bill or paying a whole team, with a clean record of
            every transfer along the way.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-12">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex flex-col gap-4">
              <div className="w-11 h-11 rounded-lg bg-signal/10 flex items-center justify-center">
                <Icon className="text-signal" size={20} />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">
                {title}
              </h3>
              <p className="font-body text-sm text-muted leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}