"use client"

import { useState } from "react";
import AuthShell from "../../components/AuthShell";
import { useRouter } from "next/navigation";

export default function SignIn() {

  const[form, setForm] = useState({
    email: "",
    password: ""
  });

  const[error, setError] = useState("");
  const[submitted, setSubmitted] = useState(false);

  const router = useRouter();

  async function handleSubmit(){
    if(submitted) return;
    setSubmitted(true);

    try{

      const response = await fetch("/api/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

     if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError( data.message || "Wrong credentials. Try again.");
        return;
      }

      router.push("/dashboard");

    } catch (e) {
      console.log(e);
      setError("Network error. Please try again.");
    }
    finally{
      setSubmitted(false);
    }
  }



  return (
    <AuthShell
      title="Welcome back"
      subtitle="sign in"
      footerText="New to Vortex?"
      footerLinkText="Create an account"
      footerLinkHref="/sign-up"
    >

      {error && <div className="text-red-500 text-xs font-bold -mb-2">{error}</div>}

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
          onChange={(e)=>{
            setForm(prev => ({...prev, email:e.target.value}))
            if(error) setError("")
          }}
          placeholder="abc@gmail.com"
          className="bg-surface border border-border rounded-lg h-11 px-4 font-body text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:border-signal transition-colors"
        />
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
            setForm({...form, password: e.target.value})
            if(error) setError("")
          }}
          placeholder="••••••••"
          className="bg-surface border border-border rounded-lg h-11 px-4 font-body text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:border-signal transition-colors"
        />
      </div>

      <button 
        className="mt-2 font-mono text-sm bg-signal text-background font-medium h-11 rounded-lg hover:bg-signal/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-signal" 
        onClick={handleSubmit}
        disabled={submitted}
      >
        {submitted ? "Logging you in..." : "Log In"}
      </button>
    </AuthShell>
  );
}