"use client";

import { CheckCircle2, ChevronDown, Loader2, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const roles = ["A Student", "A Teacher", "A Parent", "School Administrator", "Other"];

const states = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const inputCls =
  "h-12 w-full rounded-xl border border-line bg-white px-4 text-[15px] text-ink outline-none transition placeholder:text-muted-light/70 focus:border-theme focus:ring-4 focus:ring-theme/10";
const labelCls = "mb-2 block text-[12px] font-bold tracking-[0.12em] text-muted uppercase";

export function ContactForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: fd.get("name"),
      fullName: fd.get("name"),
      email: fd.get("email"),
      organization: fd.get("organization"),
      phone: fd.get("phone"),
      role: fd.get("role"),
      state: fd.get("state"),
      message: fd.get("message"),
    };
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/v1/contact-us/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json?.success === false) throw new Error(json?.message || "Could not send your message.");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Could not send your message.");
    }
  }

  if (status === "success") {
    return (
      <div className={cn("rounded-3xl border border-theme/20 bg-mint p-10 text-center", className)} role="status">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-theme text-white shadow-brand">
          <CheckCircle2 className="size-8" />
        </div>
        <h3 className="mt-6 text-2xl font-bold">Message sent!</h3>
        <p className="mt-2 text-muted-light">
          Thank you for reaching out. Our regional lead will contact you within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-[14px] font-semibold text-theme underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn("grid gap-5 sm:grid-cols-2", className)}>
      <div>
        <label htmlFor="cf-name" className={labelCls}>
          Full name
        </label>
        <input id="cf-name" name="name" required placeholder="Enter your name" className={inputCls} />
      </div>
      <div>
        <label htmlFor="cf-email" className={labelCls}>
          Email address
        </label>
        <input id="cf-email" name="email" type="email" required placeholder="email@institution.com" className={inputCls} />
      </div>
      <div>
        <label htmlFor="cf-org" className={labelCls}>
          Organization
        </label>
        <input id="cf-org" name="organization" placeholder="Company or School name" className={inputCls} />
      </div>
      <div>
        <label htmlFor="cf-phone" className={labelCls}>
          Phone number
        </label>
        <input id="cf-phone" name="phone" type="tel" placeholder="+91 98765 43210" className={inputCls} />
      </div>
      <div>
        <label htmlFor="cf-role" className={labelCls}>
          You are
        </label>
        <div className="relative">
          <select id="cf-role" name="role" defaultValue="" required className={cn(inputCls, "appearance-none pr-10")}>
            <option value="" disabled>
              Select your role
            </option>
            {roles.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted-light" />
        </div>
      </div>
      <div>
        <label htmlFor="cf-state" className={labelCls}>
          State
        </label>
        <div className="relative">
          <select id="cf-state" name="state" defaultValue="" className={cn(inputCls, "appearance-none pr-10")}>
            <option value="" disabled>
              Select your state
            </option>
            {states.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted-light" />
        </div>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="cf-message" className={labelCls}>
          How can we help?
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={5}
          placeholder="Describe your inquiry..."
          className={cn(inputCls, "h-auto resize-y py-3")}
        />
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "loading"}
          className="shimmer-btn inline-flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-theme px-6 text-[15px] font-semibold text-white shadow-brand transition hover:bg-theme-dark disabled:opacity-60 sm:w-auto sm:min-w-56"
        >
          <span className="relative z-10 inline-flex items-center gap-2">
            {status === "loading" ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
            Send Message
          </span>
        </button>
        {status === "error" && (
          <p className="mt-3 text-[14px] text-red-600" role="alert">
            {error} You can also email us at{" "}
            <a className="font-semibold underline" href={`mailto:${site.contact.inquiriesEmail}`}>
              {site.contact.inquiriesEmail}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
