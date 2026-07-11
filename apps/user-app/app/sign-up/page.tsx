"use client";

import { useState } from "react";
import AuthShell from "../../components/AuthShell";
import { userSchema } from "../api/schema";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    number: "",
  });
  const [error, setError] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  function handleChange(field: keyof typeof form, value: string) {
    setForm({ ...form, [field]: value });

    setError((prev) => {
      if (!prev[field] && !prev.form) return prev;
      const next = { ...prev };
      delete next[field];
      delete next.form;
      return next;
    });
  }

  async function handleSubmit() {
    if (submitting === true) return;

    const result = userSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      const flattened = result.error.flatten().fieldErrors;

      for (const key in flattened) {
        const messages = flattened[key as keyof typeof flattened];
        const firstMessage = messages?.[0];
        if (firstMessage) {
          fieldErrors[key] = firstMessage;
        }
      }

      setError(fieldErrors);
      return;
    }

    setError({});
    setSubmitting(true);

    try {
      const response = await fetch("/api/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError({ form: data.message ?? "Something went wrong!" });
        return;
      }

      router.push("/dashboard/home");
    } catch (e) {
      console.log(e);
      setError({ form: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthShell
      title="Open your account"
      subtitle="join vortex"
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerLinkHref="/sign-in"
    >
      {error.form && (
        <p className="text-red-500 text-xs font-bold -mb-2">{error.form}</p>
      )}

      <div className="flex flex-col gap-2">
        <label
          htmlFor="name"
          className="font-mono text-xs text-muted tracking-wide uppercase"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          value={form.name}
          onChange={(e) => {
            handleChange("name", e.target.value);
          }}
          placeholder="Full name"
          className="bg-surface border border-border rounded-lg h-11 px-4 font-body text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:border-signal transition-colors"
        />
        {error.name && (
          <p className="text-red-500 text-xs font-bold -mb-2">{error.name}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="phone-number"
          className="font-mono text-xs text-muted tracking-wide uppercase"
        >
          Phone Number
        </label>
        <input
          id="phone-number"
          type="text"
          value={form.number}
          onChange={(e) => {
            handleChange("number", e.target.value);
          }}
          placeholder="10-digit number"
          className="bg-surface border border-border rounded-lg h-11 px-4 font-body text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:border-signal transition-colors"
        />
        {error.number && (
          <p className="text-red-500 text-xs font-bold -mb-2">{error.number}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="font-mono text-xs text-muted tracking-wide uppercase"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={(e) => {
            handleChange("email", e.target.value);
          }}
          placeholder="you@example.com"
          className="bg-surface border border-border rounded-lg h-11 px-4 font-body text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:border-signal transition-colors"
        />
        {error.email && (
          <p className="text-red-500 text-xs font-bold -mb-2">{error.email}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="password"
          className="font-mono text-xs text-muted tracking-wide uppercase"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          value={form.password}
          onChange={(e) => {
            handleChange("password", e.target.value);
          }}
          placeholder="••••••••"
          className="bg-surface border border-border rounded-lg h-11 px-4 font-body text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:border-signal transition-colors"
        />
        {error.password && (
          <p className="text-red-500 text-xs font-bold -mb-2">
            {error.password}
          </p>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="mt-2 font-mono text-sm bg-signal text-background font-medium h-11 rounded-lg hover:bg-signal/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-signal"
      >
        {submitting ? "Creating Account..." : "Create Account"}
      </button>
    </AuthShell>
  );
}
