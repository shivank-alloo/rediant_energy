"use client";

import Link from "next/link";
import { ArrowRight, Download, ShieldCheck, Award, FlaskConical } from "lucide-react";

const TRUST_BADGES = [
  { icon: ShieldCheck, label: "ISO 9001:2015",  sub: "Quality Mgmt.",  color: "#3B82F6" },
  { icon: FlaskConical, label: "CPRI Certified", sub: "Power Research", color: "#10B981" },
  { icon: Award,        label: "BIS Approved",   sub: "IS Standards",   color: "#F59E0B" },
  { icon: ShieldCheck,  label: "IEC 60502",       sub: "Cable Standard", color: "#8B5CF6" },
];

const STATS = [
  { val: "20+",  label: "Years Manufacturing" },
  { val: "500+", label: "Corporate Clients"   },
  { val: "150+", label: "Product SKUs"        },
  { val: "24hr", label: "Quote Turnaround"    },
];

export default function Hero() {
  const scrollToProducts = () =>
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="section-white" style={{ position: "relative", overflow: "hidden" }}>
      {/* Background decoration */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", right: 0, top: 0, width: "50%", height: "100%",
          background: "linear-gradient(to left, #F8FAFC, transparent)",
        }} />
      </div>

      <div style={{
        position: "relative", maxWidth: "1280px", margin: "0 auto",
        padding: "6rem 2rem 7rem",
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "7fr 5fr", gap: "5rem", alignItems: "center" }}
          className="lg:grid-cols-[7fr_5fr] grid-cols-1">

          {/* ── Left Column ──────────────────────────── */}
          <div>
            {/* Eyebrow */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}
              className="anim-fade-up">
              <span className="badge badge-amber">ISO-Certified Manufacturer</span>
              <span className="type-label">Mumbai, India · Pan-India Supply · Est. 2005</span>
            </div>

            {/* H1 */}
            <h1 className="type-h1 anim-fade-up" style={{ marginBottom: "1.75rem", animationDelay: "0.08s" }}>
              Engineered for{" "}
              <span style={{ position: "relative", display: "inline-block" }}>
                Unmatched Reliability
                <span style={{
                  position: "absolute", left: 0, right: 0, bottom: "-4px",
                  height: "3px", borderRadius: "2px", background: "#F59E0B",
                }} />
              </span>
              :<br />
              Certified Industrial Energy Infrastructure.
            </h1>

            {/* Subheadline */}
            <p className="anim-fade-up" style={{
              color: "#475569", fontSize: "1.1rem", lineHeight: 1.75,
              maxWidth: "560px", marginBottom: "2.75rem", animationDelay: "0.12s",
            }}>
              ISO-Certified manufacturing, CPRI-Tested components, and BIS-Compliant
              materials engineered to international standards for power, telecom,
              and infrastructure projects.
            </p>

            {/* CTAs */}
            <div className="anim-fade-up" style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "3.5rem", animationDelay: "0.16s" }}>
              <button onClick={scrollToProducts} className="btn-amber" style={{ fontSize: "0.95rem" }}>
                Explore Technical Catalog <ArrowRight size={17} />
              </button>
              <a href="/Rediant-Energy-Corporate-Profile.pdf" download className="btn-outline" style={{ fontSize: "0.95rem" }}>
                <Download size={16} /> Download Corporate Profile
              </a>
            </div>

            {/* Stats */}
            <div className="anim-fade-up" style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1.75rem", animationDelay: "0.2s",
            }}>
              {STATS.map((s) => (
                <div key={s.label} style={{ borderLeft: "3px solid #F59E0B", paddingLeft: "1.125rem" }}>
                  <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0F172A", lineHeight: 1.1, fontFamily: "var(--font-jakarta, system-ui)" }}>
                    {s.val}
                  </div>
                  <div className="type-label" style={{ marginTop: "0.5rem" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right Column — Trust Card ─────────────── */}
          <div className="anim-fade-up" style={{ animationDelay: "0.24s" }}>
            <div className="card-surface" style={{ padding: "2.25rem", position: "relative", overflow: "hidden" }}>
              {/* Amber corner accent */}
              <div style={{
                position: "absolute", top: 0, right: 0, width: "100px", height: "100px",
                background: "rgba(245,158,11,0.07)", borderBottomLeftRadius: "80px",
                pointerEvents: "none",
              }} />

              <p className="type-label" style={{ marginBottom: "1.5rem" }}>
                Third-Party Certifications & Approvals
              </p>

              {/* Trust Badges */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
                {TRUST_BADGES.map((b) => {
                  const Icon = b.icon;
                  return (
                    <div key={b.label} className="trust-badge">
                      <div style={{
                        width: "44px", height: "44px", borderRadius: "50%",
                        background: "#F8FAFC", border: "1.5px solid rgba(148,163,184,0.3)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <Icon size={18} style={{ color: b.color }} />
                      </div>
                      <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0F172A", textAlign: "center", lineHeight: 1.3 }}>
                        {b.label}
                      </div>
                      <div style={{ fontSize: "0.7rem", color: "#94A3B8", textAlign: "center" }}>
                        {b.sub}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="divider" style={{ marginBottom: "1.75rem" }} />

              {/* Standards Table */}
              <p className="type-label" style={{ marginBottom: "1rem" }}>Applicable Standards</p>
              <table className="spec-table">
                <tbody>
                  {[
                    ["Earthing Systems", "IS 3043 / IEEE 80"],
                    ["Cable Trays",      "BS EN 61537"],
                    ["Power Cables",     "IS 7098 / IEC 60502"],
                    ["Cable Glands",     "BS 6121 / IS 12943"],
                    ["Solar Panels",     "IEC 61215 / IEC 61730"],
                    ["LED Lighting",     "IS 10322 / IP66"],
                  ].map(([cat, std]) => (
                    <tr key={cat}>
                      <td>{cat}</td>
                      <td><span className="badge badge-slate">{std}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(148,163,184,0.15)" }}>
                <Link href="/contact" className="btn-amber" style={{ width: "100%", fontSize: "0.9rem" }}>
                  Request Technical Quotation — 24hr SLA
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
