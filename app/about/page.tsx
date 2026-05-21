import { Shield, Target, Lightbulb, Users, Rocket, Heart } from "lucide-react";
import type { Metadata } from "next";
import CTAStrip from "@/components/sections/CTAStrip";

export const metadata: Metadata = {
  title: "About Us — Rediant Energy",
  description:
    "ISO-Certified manufacturer of industrial energy systems based in Mumbai, India. 20+ years manufacturing earthing, cable trays, LED lighting, and solar systems.",
};

const VALUES = [
  { icon: Shield,    title: "Certified Quality",    desc: "ISO 9001:2015 processes with full traceability from raw material to dispatch." },
  { icon: Target,    title: "Technical Precision",  desc: "Every product dimensionally verified against applicable IS, BS, and IEC standards." },
  { icon: Rocket,    title: "R&D Innovation",        desc: "Continuous development of maintenance-free, energy-efficient industrial systems." },
  { icon: Users,     title: "Client Partnership",   desc: "Long-term technical partnerships with 500+ corporate clients across India." },
  { icon: Heart,     title: "Social Responsibility", desc: "Committed to sustainable manufacturing and community development in M.P. and Maharashtra." },
  { icon: Lightbulb, title: "Energy Efficiency",    desc: "Driving industrial energy savings through advanced LED and solar solutions." },
];

const TIMELINE = [
  { year: "2005", event: "Founded in Mumbai with earthing system manufacturing" },
  { year: "2010", event: "Expanded to cable trays, glands, and junction boxes" },
  { year: "2015", event: "Launched LED lighting and solar energy divisions" },
  { year: "2018", event: "Achieved ISO 9001:2015 certification" },
  { year: "2020", event: "Established manufacturing unit in Sidhi, Madhya Pradesh" },
  { year: "2022", event: "Crossed 500+ corporate client milestone" },
  { year: "2025", entry: true, event: "Launched next-gen chemical earthing electrode range" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: "#F8FAFC" }}>
      {/* Hero */}
      <section className="section-white border-b border-slate-200/60 py-16 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-amber-50 to-transparent pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="type-label mb-3">Established 2005</p>
          <h1 className="type-h1 mb-5 max-w-2xl">
            Our Legacy of Industrial{" "}
            <span className="relative inline-block">
              Excellence
              <span className="absolute left-0 w-full h-[3px] bg-amber-400" style={{ bottom: "-3px" }} />
            </span>
          </h1>
          <p className="text-slate-500 text-lg max-w-xl leading-relaxed">
            Rediant Energy is a Mumbai-based ISO-Certified manufacturer and supplier of advanced industrial energy systems — serving power, telecom, construction, and infrastructure sectors since 2005.
          </p>
        </div>
      </section>

      {/* Company Profile */}
      <section className="section-canvas py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="type-label mb-3">Company Overview</p>
              <h2 className="type-h2 mb-5">Mumbai&apos;s Trusted<br />Industrial Energy Partner</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Rediant Energy produces industrial components with the highest output and unmatched reliability. Our commitment is embedded in every step — from design engineering and raw material procurement to precision manufacturing, quality testing, and post-sale technical support.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We serve commercial building operators, industrial procurement officers, power distribution companies, EPC contractors, and government infrastructure departments across India.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="card-surface p-6">
              <p className="type-label mb-5">Core Statistics</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { val: "20+", label: "Years Experience" },
                  { val: "500+", label: "Corporate Clients" },
                  { val: "150+", label: "Product SKUs" },
                  { val: "3", label: "Office Locations" },
                  { val: "ISO", label: "9001:2015 Cert." },
                  { val: "24hr", label: "Quote Turnaround" },
                ].map((s) => (
                  <div key={s.label} className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                    <div className="text-[#0F172A] font-display font-black text-2xl">{s.val}</div>
                    <div className="type-label mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Mission & Vision */}
      <section className="section-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="type-h2">Mission & Vision</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="card-surface p-8 border-t-4 border-amber-400">
              <Target size={24} className="text-amber-500 mb-4" />
              <h3 className="type-h3 mb-3">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed">
                To be the leading manufacturer of maintenance-free, certified industrial energy systems under the Rediant Energy brand — while maintaining profitability, social responsibility, and technical excellence.
              </p>
            </div>
            <div className="card-surface p-8 border-t-4 border-slate-300">
              <Lightbulb size={24} className="text-slate-500 mb-4" />
              <h3 className="type-h3 mb-3">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed">
                To become the largest manufacturer of user-friendly, advanced energy systems in India — empowering industries, buildings, and infrastructure with sustainable, reliable power solutions built to international standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Core Values */}
      <section className="section-canvas py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="type-label mb-2">Our DNA</p>
            <h2 className="type-h2">Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="card-surface p-6 flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-amber-600" />
                  </div>
                  <div>
                    <h3 className="type-h3 text-sm mb-1.5">{v.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Timeline */}
      <section className="section-white py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="type-label mb-2">Our Journey</p>
            <h2 className="type-h2">Company Timeline</h2>
          </div>
          <div className="relative">
            <div className="absolute left-[72px] top-0 bottom-0 w-px bg-slate-200" />
            <div className="space-y-6">
              {TIMELINE.map((item) => (
                <div key={item.year} className="flex gap-6 items-start">
                  <div className="w-[72px] text-right shrink-0 pt-1">
                    <span className="text-sm font-black text-[#0F172A] font-display">{item.year}</span>
                  </div>
                  <div className="flex items-start gap-4 relative">
                    <div className={`absolute -left-[25px] top-1.5 w-3 h-3 rounded-full border-2 border-white z-10 ${
                      item.entry ? "bg-amber-400 border-amber-200 w-4 h-4 -left-[26px]" : "bg-slate-300"
                    }`} />
                    <div className="card-surface px-4 py-3 ml-4">
                      <p className="text-slate-700 text-sm leading-relaxed">{item.event}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTAStrip />
    </div>
  );
}
