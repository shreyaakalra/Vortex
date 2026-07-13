const steps = [
  {
    number: "01",
    title: "Scan or search",
    description: "Find a person or merchant by QR, number, or name.",
  },
  {
    number: "02",
    title: "Confirm amount",
    description: "Review and confirm — no hidden fees, ever.",
  },
  {
    number: "03",
    title: "Settled instantly",
    description: "Logged to the ledger, visible to both parties immediately.",
  },
];

export default function HowItWorks() {
  return (
    <section className="px-6 md:px-12 pb-16">
      <div className="text-center mb-10">
        <span className="font-mono text-xs text-signal tracking-widest uppercase">
          the flow
        </span>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-3">
          Three steps, under a second
        </h2>
      </div>

      <div className="flex flex-col md:flex-row items-start justify-center gap-6 md:gap-0">
        {steps.map((step, i) => (
          <div key={step.number} className="flex items-center md:items-start w-full md:w-auto">
            <div className="flex-1 md:max-w-[180px] text-left md:text-center">
              <div className="font-mono text-xs text-signal">{step.number}</div>
              <div className="font-display font-bold text-sm text-foreground mt-2">
                {step.title}
              </div>
              <p className="font-body text-[11.5px] text-muted mt-1.5 leading-relaxed">
                {step.description}
              </p>
            </div>
            {i !== steps.length - 1 && (
              <div className="hidden md:block w-[60px] h-px bg-border mt-1.5 mx-2" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}