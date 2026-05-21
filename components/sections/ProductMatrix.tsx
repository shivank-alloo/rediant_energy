"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CATEGORIES = [
  {
    slug: "earthing",
    icon: "⚡",
    label: "Earthing & Grounding",
    desc: "Chemical electrodes, pit chambers, GI strips & copper bonded rods for industrial safety.",
    tags: ["IS 3043", "Maintenance-Free", "20+ Year Life"],
    href: "/products?cat=earthing",
  },
  {
    slug: "cable-tray",
    icon: "📐",
    label: "Cable Trays & Ladders",
    desc: "GI, aluminium & stainless steel perforated trays and ladder trays for structured cabling.",
    tags: ["BS EN 61537", "Up to 200 kg/m", "Hot-Dip GI"],
    href: "/products?cat=cable-tray",
  },
  {
    slug: "solar",
    icon: "☀️",
    label: "Solar Energy Systems",
    desc: "Mono PERC panels, on-grid inverters & galvanized mounting structures for commercial use.",
    tags: ["IEC 61215", "Up to 21.5% Eff.", "25 Yr Warranty"],
    href: "/products?cat=solar",
  },
  {
    slug: "led",
    icon: "💡",
    label: "Industrial LED Lighting",
    desc: "Street lights, high-bay fittings, panel lights & floodlights with IP66 ratings.",
    tags: ["IP66 Rated", "50,000 Hours", "Energy Efficient"],
    href: "/products?cat=led",
  },
  {
    slug: "cables",
    icon: "🔌",
    label: "Wires & Armoured Cables",
    desc: "FR PVC copper wires, XLPE armoured SWA cables & flexible multi-core industrial cables.",
    tags: ["IS 694 / IS 7098", "1.1kV – 11kV", "ISO Certified"],
    href: "/products?cat=cables",
  },
  {
    slug: "cable-gland",
    icon: "🔩",
    label: "Cable Glands & Boxes",
    desc: "Brass A1/A2, nylon PG glands, Braco glands & heavy-duty metal junction boxes.",
    tags: ["BS 6121", "IP68 Rated", "Nickel Plated"],
    href: "/products?cat=cable-gland",
  },
];

export default function ProductMatrix() {
  return (
    <section id="products" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19] via-[#0F1420] to-[#0B0F19] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="badge-accent mb-4 inline-block">Product Catalog</span>
          <h2 className="font-display font-bold text-[clamp(1.8rem,4vw,3rem)] text-white mb-4">
            Our Product{" "}
            <span className="neon-text">Solutions</span>
          </h2>
          <p className="text-[#64748B] max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
            Comprehensive range of high-quality energy and cable management products for industrial and commercial applications.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.slug}
              href={cat.href}
              className="group glass-card p-6 flex flex-col gap-4 cursor-pointer no-underline"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-[rgba(0,242,254,0.08)] border border-[rgba(0,242,254,0.12)] flex items-center justify-center text-2xl group-hover:bg-[rgba(0,242,254,0.14)] transition-all duration-300">
                {cat.icon}
              </div>

              {/* Label & Desc */}
              <div className="flex-1">
                <h3 className="text-white font-semibold text-base mb-2 group-hover:text-[#00F2FE] transition-colors duration-300">
                  {cat.label}
                </h3>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  {cat.desc}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {cat.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-medium text-[#475569] bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Arrow */}
              <div className="flex items-center gap-1 text-[#00F2FE] text-sm font-medium group-hover:gap-2 transition-all duration-200">
                Explore Products
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href="/products" className="btn-outline-accent px-8 py-3 text-sm inline-flex items-center gap-2">
            View Full Catalog
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
