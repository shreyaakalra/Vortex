import AuthShell from "../../components/AuthShell";
import AuthField from "../../components/AuthField";

export default function SignUp() {
  return (
    <AuthShell
      title="Open your account"
      subtitle="join vortex"
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerLinkHref="/sign-in"
    >
      <AuthField id="name" label="Name" placeholder="Full name" />
      <AuthField id="number" label="Phone number" placeholder="10-digit number" />
      <AuthField id="email" label="Email" type="email" placeholder="you@example.com" />
      <AuthField id="password" label="Password" type="password" placeholder="••••••••" />

      <button className="mt-2 font-mono text-sm bg-signal text-background font-medium h-11 rounded-lg hover:bg-signal/90 transition-colors">
        Create account
      </button>
    </AuthShell>
  );
}