import AuthShell from "../../components/AuthShell";
import AuthField from "../../components/AuthField";

export default function SignIn() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="sign in"
      footerText="New to Vortex?"
      footerLinkText="Create an account"
      footerLinkHref="/sign-up"
    >
      <AuthField id="email" label="Email" type="email" placeholder="you@example.com" />
      <AuthField id="password" label="Password" type="password" placeholder="••••••••" />

      <button className="mt-2 font-mono text-sm bg-signal text-background font-medium h-11 rounded-lg hover:bg-signal/90 transition-colors">
        Sign in
      </button>
    </AuthShell>
  );
}