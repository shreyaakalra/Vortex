export default function AuthField({
  label,
  type = "text",
  placeholder,
  id,
}: {
  label: string;
  type?: string;
  placeholder: string;
  id: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-mono text-xs text-muted tracking-wide uppercase"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="bg-surface border border-border rounded-lg h-11 px-4 font-body text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:border-signal transition-colors"
      />
    </div>
  );
}