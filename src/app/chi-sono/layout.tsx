import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chi Sono | Dott. Federico Benni - Fisioterapista Bologna",
  description:
    "Federico Benni, Fisioterapista a Bologna. Master in Osteopatia, specializzato in ortopedia, riabilitazione e neuroscienze del dolore.",
};

export default function ChiSonoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
