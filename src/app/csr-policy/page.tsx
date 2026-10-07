import type { Metadata } from "next";
import { PolicyPage } from "@/components/policy/PolicyPage";

const description = "Our Corporate Social Responsibility commitments as an Indian K-12 educational publisher.";

export const metadata: Metadata = {
  title: "Corporate Social Responsibility Policy",
  description,
};

export default function CsrPolicyPage() {
  return (
    <PolicyPage title="Corporate Social Responsibility Policy" type="csr-policy" description={description} />
  );
}
