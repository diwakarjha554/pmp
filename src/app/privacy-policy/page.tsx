import type { Metadata } from "next";
import { PolicyPage } from "@/components/policy/PolicyPage";

const description = "How PMP Planet Multimedia Publishers collects, uses and protects the information you share with us.";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description,
};

export default function PrivacyPolicyPage() {
  return <PolicyPage title="Privacy Policy" type="privacy-policy" description={description} />;
}
