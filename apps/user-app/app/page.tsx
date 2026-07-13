"use client"

import Navbar from "../components/Navbar";
import Image from "next/image";
import Features from "../components/Features";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import Footer from "../components/Footer";
import FeatureGrid from "../components/FeatureGrid";
import HowItWorks from "../components/HowItWorks";
import { motion, type Variants } from "framer-motion";

const heroContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, delay: 0.3 + i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function Home() {
  return (
    <div className="flex flex-col bg-background bg-[radial-gradient(#ffffff11_1px,transparent_1px)] [background-size:16px_16px] relative overflow-hidden">
      <Navbar />

      <main className="min-h-[calc(100vh-88px)] flex flex-col justify-center px-8 md:px-16 xl:px-24 relative z-10">
        
        {/* Ambient Background Glow: Positioned behind the text */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-signal/20 rounded-full blur-[128px] -z-10 pointer-events-none" />

        <div className="max-w-[1500px] w-full mx-auto lg:grid lg:grid-cols-2 gap-16 items-center">

          {/*Left side*/}
          <div className="flex flex-col gap-6">
            <h1 className="font-display text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight text-foreground">
              Money moves
              <br />
              at the speed of
              <br />
              {/* Applied gradient text to the highlight string */}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-signal to-emerald-500">
                a thought.
              </span>
            </h1>

            <p className="font-body text-muted text-lg max-w-md">
              Send to anyone by number, name, or QR. No waiting, no friction
              just a clean record of every rupee, every time.
            </p>

            <div className="flex items-center gap-2 bg-surface border border-border rounded-full p-1.5 max-w-md mt-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-transparent px-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted/60 focus:outline-none min-w-0"
              />
              <Link
                href="/sign-up"
                className="shrink-0 flex items-center gap-1.5 font-mono text-sm bg-signal text-background font-medium px-5 py-2.5 rounded-full transition-all duration-300 hover:bg-signal/90 hover:shadow-lg hover:shadow-signal/25"
              >
                Get started
                <ArrowRight size={14} />
              </Link>
            </div>

            <Link
              href="/sign-in"
              className="font-mono text-xs text-muted hover:text-foreground transition-colors w-fit"
            >
              Already have an account? Sign in →
            </Link>
          </div>

          <div className="hidden lg:flex flex-row gap-5 shrink-0">
            <div className="flex flex-col gap-5 w-72 shrink-0">
              <Image
                src="/card-balance.png"
                alt="Available balance"
                width={300}
                height={230}
                className="w-72 h-auto rounded-2xl shrink-0 shadow-xl shadow-black/50 border border-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-signal/20 hover:border-white/20"
              />
              <Image
                src="/card-activity.png"
                alt="This week's activity"
                width={270}
                height={230}
                className="w-72 h-auto rounded-2xl shrink-0 shadow-xl shadow-black/50 border border-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-signal/20 hover:border-white/20"
              />
            </div>
            <Image
              src="/card-add-money.png"
              alt="Add money"
              width={210}
              height={280}
              className="w-72 h-90 rounded-2xl self-start shrink-0 shadow-xl shadow-black/50 border border-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-signal/20 hover:border-white/20"
            />
          </div>

        </div>
        
      </main>

      <Footer />
    </div>
  );
}