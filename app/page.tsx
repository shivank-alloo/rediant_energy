import Hero from "@/components/sections/Hero";
import CatalogSection from "@/components/sections/CatalogSection";
import WhyRediant from "@/components/sections/WhyRediant";
import CTAStrip from "@/components/sections/CTAStrip";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rediant Energy — Certified Industrial Energy Infrastructure",
  description:
    "ISO-Certified manufacturer of earthing systems, cable glands, cable trays, LED lighting, armoured cables, and solar systems in Mumbai, India.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="divider" />
      <CatalogSection />
      <div className="divider" />
      <WhyRediant />
      <CTAStrip />
    </>
  );
}
