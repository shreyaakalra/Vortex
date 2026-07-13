const features = [
  {
    icon: "→",
    title: "Send in one tap",
    description:
      "Phone number, name, or QR — find anyone on the network instantly.",
  },
  {
    icon: "≡",
    title: "Immutable ledger",
    description:
      "Every transaction recorded permanently. Nothing is ever silently overwritten.",
  },
  {
    icon: "🔒",
    title: "Bank-linked, secure",
    description:
      "On-ramp and off-ramp directly with HDFC, SBI, and Axis Bank.",
  },
];

export default function FeatureGrid() {
  return (
    <section className="px-6 md:px-12 py-16">
      <div className="text-center mb-10">
        <span className="font-mono text-xs text-signal tracking-widest uppercase">
          what you get
        </span>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-3">
          Built like a bank, feels like a message
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-px bg-border border border-border">
        {features.map((feature) => (
          <div key={feature.title} className="bg-background p-6">
            <div className="w-8 h-8 rounded-lg bg-signal/10 flex items-center justify-center font-mono text-signal text-sm">
              {feature.icon}
            </div>
            <div className="font-display font-bold text-[15px] text-foreground mt-4">
              {feature.title}
            </div>
            <p className="font-body text-[12.5px] text-muted mt-1.5 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}