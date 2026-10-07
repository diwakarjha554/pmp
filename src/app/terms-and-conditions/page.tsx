import type { Metadata } from "next";
import { PolicyPage } from "@/components/policy/PolicyPage";

const description = "The terms that govern your use of the PMP Planet Multimedia Publishers website and services.";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description,
};

export default function TermsAndConditionsPage() {
  return <PolicyPage title="Terms & Conditions" type="terms-and-conditions" description={description} />;
}
