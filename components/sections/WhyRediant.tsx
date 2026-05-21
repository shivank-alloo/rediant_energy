"use client";

import { useEffect, useRef, useState } from "react";
import { Shield, Wrench, Clock, Users } from "lucide-react";

const STATS = [
  { value: 500, suffix: "+", label: "Corporate Clients", icon: Users },
  { value: 20, suffix: "+", label: "Years Operating", icon: Clock },
  { value: 150, suffix: "+", label: "Product SKUs", icon: Shield },
  { value: 24, suffix: "hr", label: "Quote Turnaround", icon: Wrench },
];

const WHY_POINTS = [
  {
    title: "Vertically Integrated Manufacturing",
    desc: "End-to-end manufacturing from raw materials to finished components under one roof. Full traceability on every batch.",
  },
  {
    title: "Third-Party Tested & Certified",
    desc: "CPRI, BIS, and ISO 9001:2015 certified. Every product arrives with a Certificate of Conformance (COC).",
  },
  {
    title: "Technical Support Team",
    desc: "Dedicated pre-sales engineers for product selection, standard compliance guidance, and site-specific customization.",
  },
  {
    title: "Pan-India Logistics Network",
    desc: "Stocked warehouses in Mumbai, Sidhi (MP), and Rewa — same-week dispatch for standard catalog items.",
  },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const steps = 50;
          const step = target / steps;
          let cur = 0;
          const t = setInterval(() => {
            cur += step;
            if (cur >= target) { setVal(target); clearInterval(t); }
            else setVal(Math.floor(cur));
          }, 1600 / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-[#0F172A] font-display font-black text-[2.5rem] leading-none tabular-nums">
      {val}{suffix}
    </div>
  );
}

export default function WhyRediant() {
  return (
    <section className="section-white" style={{ padding: "7rem 0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>

        {/* Stats Bar */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          border: "1px solid rgba(148,163,184,0.22)", borderRadius: "20px",
          overflow: "hidden", marginBottom: "5rem",
        }}>
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} style={{
                padding: "2.5rem 2rem",
                borderRight: i < 3 ? "1px solid rgba(148,163,184,0.18)" : "none",
                display: "flex", flexDirection: "column", gap: "1rem", background: "#fff",
              }}>
                <div style={{
                  width: "44px", height: "44px", borderRadius: "12px",
                  background: "#FFFBEB", border: "1px solid #FDE68A",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon size={19} style={{ color: "#D97706" }} />
                </div>
                <Counter target={stat.value} suffix={stat.suffix} />
                <p className="type-label">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Content Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
          {/* Left */}
          <div>
            <p className="type-label" style={{ marginBottom: "1rem" }}>Why Rediant Energy</p>
            <h2 className="type-h2" style={{ marginBottom: "1.5rem" }}>
              Built-in Quality.{" "}
              <span style={{ position: "relative", display: "inline-block" }}>
                Not Bolted On.
                <span style={{ position: "absolute", left: 0, right: 0, bottom: "-3px", height: "2px", background: "#F59E0B" }} />
              </span>
            </h2>
            <p style={{ color: "#475569", lineHeight: 1.8, marginBottom: "2.5rem", fontSize: "1rem" }}>
              Rediant Energy supplies industrial procurement committees with components
              that pass site inspection the first time. Our manufacturing processes are
              structured around rigorous quality gates — from incoming material inspection
              to final dimensional verification and packing.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {WHY_POINTS.map((pt, i) => (
                <div key={pt.title} style={{ display: "flex", gap: "1.25rem" }}>
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "50%",
                    background: "#F59E0B", color: "#0F172A",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.8rem", fontWeight: 800, flexShrink: 0, marginTop: "2px",
                  }}>
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="type-h3" style={{ fontSize: "0.95rem", marginBottom: "0.5rem" }}>{pt.title}</h3>
                    <p style={{ color: "#64748B", fontSize: "0.9rem", lineHeight: 1.75 }}>{pt.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — compliance matrix */}
          <div className="card-surface" style={{ padding: "2.25rem" }}>
            <p className="type-label" style={{ marginBottom: "1.5rem" }}>Quality & Compliance Matrix</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {[
                { param: "Product Quality Score", val: 98 },
                { param: "On-Time Delivery Rate",  val: 96 },
                { param: "Client Retention Rate",  val: 93 },
                { param: "ISO Audit Compliance",   val: 100 },
                { param: "COC Issuance Rate",       val: 100 },
              ].map((item) => (
                <div key={item.param}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.625rem" }}>
                    <span style={{ fontSize: "0.875rem", color: "#334155", fontWeight: 500 }}>{item.param}</span>
                    <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#0F172A" }}>{item.val}%</span>
                  </div>
                  <div style={{ height: "6px", background: "#F1F5F9", borderRadius: "100px" }}>
                    <div style={{ width: `${item.val}%`, height: "100%", background: "#F59E0B", borderRadius: "100px" }} />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "2rem", paddingTop: "1.75rem", borderTop: "1px solid rgba(148,163,184,0.15)" }}>
              <p className="type-label" style={{ marginBottom: "1.25rem" }}>Manufacturing Locations</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  { label: "Head Office",         loc: "Kalbadevi, Mumbai – 400002" },
                  { label: "Manufacturing Unit",  loc: "Mohaniya, Dist. Sidhi, M.P." },
                  { label: "Branch Office",        loc: "Rewa, Madhya Pradesh" },
                ].map((l) => (
                  <div key={l.label} style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#F59E0B", flexShrink: 0, marginTop: "5px" }} />
                    <div style={{ fontSize: "0.875rem" }}>
                      <span style={{ fontWeight: 600, color: "#0F172A" }}>{l.label}: </span>
                      <span style={{ color: "#64748B" }}>{l.loc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
