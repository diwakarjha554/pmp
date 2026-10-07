"use client";

import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";

type Props = {
  variant?: "light" | "dark" | "card";
  buttonLabel?: string;
  className?: string;
  placeholder?: string;
};

export function NewsletterForm({
  variant = "light",
  buttonLabel = "Subscribe",
  className,
  placeholder = "Enter your email",
}: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/v1/subscriber/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json?.success === false) {
        throw new Error(json?.message || "Subscription failed");
      }
      setStatus("success");
      setMessage(json?.message || "Thank you for subscribing!");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  const dark = variant === "dark";
  const card = variant === "card";

  if (status === "success") {
    return (
      <div
        className={cn(
          "flex items-center gap-3 rounded-2xl px-4 py-3 text-[14px] font-medium",
          dark ? "bg-white/10 text-white" : "bg-theme/10 text-theme-deep",
          className,
        )}
        role="status"
      >
        <CheckCircle2 className="size-5 shrink-0 text-theme-light" />
        {message}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn("w-full", className)} noValidate>
      <div className={cn(card ? "space-y-3" : "flex gap-2", dark && "flex-col gap-3 sm:flex-row")}>
        <label className="sr-only" htmlFor={`newsletter-${variant}`}>
          Email address
        </label>
        <input
          id={`newsletter-${variant}`}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "h-12 w-full min-w-0 flex-1 rounded-xl border px-4 text-[15px] outline-none transition",
            dark
              ? "border-white/10 bg-white/5 text-white placeholder:text-white/40 focus:border-theme-light focus:bg-white/10"
              : "border-line bg-white text-ink placeholder:text-muted-light/70 focus:border-theme focus:ring-4 focus:ring-theme/10",
            card && "h-13",
          )}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={cn(
            "shimmer-btn inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-theme px-5 text-[15px] font-semibold text-white transition hover:bg-theme-dark disabled:opacity-60",
            card && "h-13 w-full",
          )}
        >
          <span className="relative z-10 inline-flex items-center gap-2">
            {status === "loading" ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
            {buttonLabel}
          </span>
        </button>
      </div>
      {status === "error" && (
        <p className={cn("mt-2 text-[13px]", dark ? "text-red-300" : "text-red-600")} role="alert">
          {message}
        </p>
      )}
    </form>
  );
}
