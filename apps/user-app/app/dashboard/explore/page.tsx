"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { UserPlus, Link2, Check, MessageSquare } from "lucide-react";

type Recipient = { name: string; number: string };

const SIGNUP_LINK = "https://vortex-user-app-gamma.vercel.app/sign-up";

function buildInviteMessage(senderName?: string) {
  const intro = senderName
    ? `Hey! It's ${senderName}.`
    : "Hey!";
  return `${intro} I've been using Vortex to send and receive money instantly — thought you'd want in. Join here: ${SIGNUP_LINK}`;
}

function buildSmsLink(number: string, message: string) {
  const isIOS = typeof navigator !== "undefined" && /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const separator = isIOS ? "&" : "?";
  return `sms:${number}${separator}body=${encodeURIComponent(message)}`;
}

export default function Explore() {
  const [contacts, setContacts] = useState<Recipient[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(true);

  const [senderName, setSenderName] = useState<string | undefined>(undefined);
  const [inviteNumber, setInviteNumber] = useState("");
  const [inviteError, setInviteError] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);
  const [messageCopied, setMessageCopied] = useState(false);

  useEffect(() => {
    async function getContacts() {
      try {
        const result = await fetch("/api/user/recipients");

        if (!result.ok) {
          throw new Error("Something went wrong!");
        }

        const data = await result.json();
        setContacts(data.recipients);
      } catch (e) {
        console.log(e);
        setContacts([]);
      } finally {
        setLoadingContacts(false);
      }
    }
    getContacts();
  }, []);

  useEffect(() => {
    async function getSender() {
      try {
        const res = await fetch("/api/user/info");
        if (!res.ok) return;
        const data = await res.json();
        setSenderName(data?.user?.name);
      } catch (e) {
        console.log(e);
      }
    }
    getSender();
  }, []);

  function openInviteMessage() {
    const trimmed = inviteNumber.trim();
    if (!/^\d{10}$/.test(trimmed)) {
      setInviteError("Enter a valid 10-digit phone number");
      return;
    }
    setInviteError("");

    const message = buildInviteMessage(senderName);
    const smsLink = buildSmsLink(trimmed, message);

    // Opens the device's own messaging app with the number and text prefilled.
    // The user still has to hit send themselves — nothing is sent on our end.
    window.location.href = smsLink;
  }

  async function copyReferralLink() {
    try {
      await navigator.clipboard.writeText(SIGNUP_LINK);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (e) {
      console.log(e);
    }
  }

  async function copyInviteMessage() {
    try {
      await navigator.clipboard.writeText(buildInviteMessage(senderName));
      setMessageCopied(true);
      setTimeout(() => setMessageCopied(false), 2000);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="px-10 py-8">
      <div className="mb-7">
        <span className="font-mono text-xs text-signal tracking-widest uppercase">
          find people & places
        </span>
        <h1 className="font-display text-2xl font-bold text-foreground mt-1.5">
          Explore
        </h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative mb-8 max-w-md"
      >
        <i
          className="ti ti-search absolute left-4 top-1/2 -translate-y-1/2 text-muted text-base"
          aria-hidden="true"
        />
        <input
          type="text"
          placeholder="Search by name or phone number"
          className="bg-surface border border-border rounded-lg h-11 pl-11 pr-4 w-full font-body text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:border-signal transition-colors"
        />
      </motion.div>

      <div className="mb-8">
        <span className="font-mono text-xs text-muted tracking-wide uppercase mb-3 block">
          recent contacts
        </span>

        {loadingContacts ? (
          <div className="flex gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-11 h-11 rounded-full bg-border animate-pulse" />
                <div className="w-10 h-2.5 rounded bg-border animate-pulse" />
              </div>
            ))}
          </div>
        ) : contacts.length === 0 ? (
          <div className="flex items-center gap-3 bg-background border border-border rounded-xl px-4 py-3.5 max-w-md">
            <div className="flex flex-col">
              <span className="font-mono text-xs text-foreground">
                No recent contacts yet
              </span>
              <span className="font-body text-[11px] text-muted">
                People you send money to will show up here.
              </span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-3">
            {contacts.map((contact, i) => (
              <motion.div
                key={contact.number}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: i * 0.05 }}
                whileHover={{ y: -3 }}
                className="bg-surface border border-border rounded-xl p-5 flex flex-col items-center gap-2 text-center cursor-pointer"
              >
                <div className="w-11 h-11 rounded-full bg-signal/10 flex items-center justify-center font-mono text-sm text-signal">
                  {contact.name[0]}
                </div>
                <div className="font-body text-sm text-foreground">{contact.name}</div>
                <div className="font-mono text-[10px] text-muted">{contact.number}</div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div>
        <span className="font-mono text-xs text-muted tracking-wide uppercase mb-3 block">
          bring your people
        </span>

        <div className="bg-surface border border-border rounded-2xl p-6 max-w-2xl">
          <div className="flex items-start gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-signal/10 flex items-center justify-center shrink-0">
              <UserPlus className="text-signal" size={18} />
            </div>
            <div>
              <div className="font-display text-base font-bold text-foreground">
                Invite a friend
              </div>
              <div className="font-body text-sm text-muted mt-0.5">
                Drop in their number and we&apos;ll pull up a text message,
                ready to send from your own phone.
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inviteNumber}
                onChange={(e) => {
                  setInviteNumber(e.target.value.replace(/[^\d]/g, "").slice(0, 10));
                  if (inviteError) setInviteError("");
                }}
                placeholder="Their 10-digit number"
                inputMode="numeric"
                className="flex-1 bg-background border border-border rounded-lg h-11 px-4 font-body text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:border-signal transition-colors"
              />
              <motion.button
                type="button"
                onClick={openInviteMessage}
                disabled={inviteNumber.trim().length === 0}
                whileTap={{ scale: 0.98 }}
                className="shrink-0 flex items-center gap-1.5 font-mono text-sm bg-signal text-background font-medium px-5 h-11 rounded-lg hover:bg-signal/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <MessageSquare size={14} /> Invite
              </motion.button>
            </div>

            <AnimatePresence>
              {inviteError && (
                <motion.span
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="font-mono text-[10.5px] text-red-400/80 overflow-hidden"
                >
                  {inviteError}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Preview of the message that'll open, plus a manual copy fallback for desktop */}
          <div className="bg-background border border-border rounded-lg px-4 py-3 mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-[10px] text-muted uppercase tracking-wide">
                message preview
              </span>
              <button
                type="button"
                onClick={copyInviteMessage}
                className="font-mono text-[10.5px] text-muted hover:text-foreground transition-colors flex items-center gap-1"
              >
                {messageCopied ? (
                  <>
                    <Check size={11} className="text-signal" /> copied
                  </>
                ) : (
                  "copy text"
                )}
              </button>
            </div>
            <p className="font-body text-xs text-foreground/80 leading-relaxed">
              {buildInviteMessage(senderName)}
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-border pt-4">
            <div className="flex flex-col min-w-0">
              <span className="font-mono text-[10.5px] text-muted uppercase tracking-wide">
                or share your link
              </span>
              <span className="font-mono text-xs text-foreground mt-0.5 truncate">
                {SIGNUP_LINK}
              </span>
            </div>
            <motion.button
              type="button"
              onClick={copyReferralLink}
              whileTap={{ scale: 0.96 }}
              className="shrink-0 flex items-center gap-1.5 font-mono text-xs text-muted border border-border rounded-full px-4 py-2 hover:text-foreground hover:border-foreground/30 transition-colors"
            >
              {linkCopied ? (
                <>
                  <Check size={13} className="text-signal" /> Copied
                </>
              ) : (
                <>
                  <Link2 size={13} /> Copy link
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}