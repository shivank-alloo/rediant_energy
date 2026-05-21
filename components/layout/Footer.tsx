import Link from "next/link";
import { Zap, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

const PRODUCT_LINKS = [
  { href: "/products?cat=earthing",    label: "Earthing & Grounding Systems" },
  { href: "/products?cat=cable-gland", label: "Industrial Cable Glands"       },
  { href: "/products?cat=cable-tray",  label: "Cable Management Trays"        },
  { href: "/products?cat=cables",      label: "Cables & Wires"                },
  { href: "/products?cat=led",         label: "LED Industrial Lighting"        },
  { href: "/products?cat=solar",       label: "Commercial Solar Systems"       },
];

const STANDARDS = ["IS 3043","BS EN 61537","BS 6121","IS 7098","IEC 60502","IEC 61215","IS 694"];

export default function Footer() {
  return (
    <footer style={{ background: "#0F172A" }}>

      {/* Main Grid */}
      <div className="max-w-[1280px] mx-auto py-16 md:py-24 px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-10 lg:gap-16">

          {/* ── Brand Column ─────────────────── */}
          <div>
            <Link href="/" style={{
              display: "inline-flex", alignItems: "center",
              textDecoration: "none", marginBottom: "1.75rem",
            }}>
              <img
                src="/logo.png"
                alt="Rediant Energy Industries Logo"
                style={{ height: "48px", width: "auto", objectFit: "contain" }}
              />
            </Link>

            <p style={{ color: "#64748B", fontSize: "0.9rem", lineHeight: 1.85, marginBottom: "2rem", maxWidth: "280px" }}>
              ISO-Certified manufacturer and supplier of industrial energy systems,
              cable management, and LED solutions in Mumbai, India.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem" }}>
              {["ISO 9001:2015", "BIS Approved", "CPRI Certified"].map((b) => (
                <span key={b} style={{
                  display: "inline-flex", alignItems: "center",
                  padding: "0.3rem 0.75rem", borderRadius: "100px",
                  fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
                  background: "#FEF3C7", color: "#92400E", border: "1px solid rgba(245,158,11,0.3)",
                }}>
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* ── Products Column ──────────────── */}
          <div>
            <h3 style={{
              fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em",
              textTransform: "uppercase", color: "#475569", marginBottom: "2rem",
            }}>
              Product Catalog
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1.125rem" }}>
              {PRODUCT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} style={{
                    display: "flex", alignItems: "center", gap: "0.5rem",
                    color: "#64748B", fontSize: "0.875rem", textDecoration: "none",
                    transition: "color 0.15s",
                  }}
                    className="group hover:!text-white"
                  >
                    <ArrowRight size={12} style={{ opacity: 0, transition: "opacity 0.15s" }}
                      className="group-hover:opacity-100" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Company Column ───────────────── */}
          <div>
            <h3 style={{
              fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em",
              textTransform: "uppercase", color: "#475569", marginBottom: "2rem",
            }}>
              Company
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1.125rem" }}>
              {[
                { href: "/",        label: "Home"              },
                { href: "/about",   label: "About Us"          },
                { href: "/products",label: "All Products"      },
                { href: "/contact", label: "Request a Quote"   },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} style={{
                    color: "#64748B", fontSize: "0.875rem", textDecoration: "none",
                    transition: "color 0.15s",
                  }}
                    className="hover:!text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 style={{
              fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em",
              textTransform: "uppercase", color: "#475569",
              marginTop: "2.5rem", marginBottom: "1.25rem",
            }}>
              Standards
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {STANDARDS.map((s) => (
                <span key={s} style={{
                  padding: "0.2rem 0.625rem", borderRadius: "100px",
                  border: "1px solid rgba(148,163,184,0.2)",
                  fontSize: "0.72rem", color: "#64748B",
                }}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* ── Contact Column ───────────────── */}
          <div>
            <h3 style={{
              fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em",
              textTransform: "uppercase", color: "#475569", marginBottom: "2rem",
            }}>
              Contact
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2rem" }}>
              {/* Address */}
              <div style={{ display: "flex", gap: "0.875rem" }}>
                <MapPin size={15} style={{ color: "#F59E0B", flexShrink: 0, marginTop: "2px" }} />
                <p style={{ color: "#64748B", fontSize: "0.875rem", lineHeight: 1.8 }}>
                  Office No-19/A, 3rd Floor, Jhaveri Bhuvan, Kalbadevi Road, Mumbai – 400002
                </p>
              </div>

              {/* Phone */}
              <a href="tel:+919324109605" style={{
                display: "flex", alignItems: "center", gap: "0.875rem",
                textDecoration: "none",
              }}>
                <Phone size={14} style={{ color: "#F59E0B", flexShrink: 0 }} />
                <span style={{ color: "#64748B", fontSize: "0.875rem", transition: "color 0.15s" }}
                  className="hover:!text-white">
                  +91 93241 09605
                </span>
              </a>

              {/* Email */}
              <a href="mailto:rediantenergy@gmail.com" style={{
                display: "flex", alignItems: "center", gap: "0.875rem",
                textDecoration: "none",
              }}>
                <Mail size={14} style={{ color: "#F59E0B", flexShrink: 0 }} />
                <span style={{ color: "#64748B", fontSize: "0.875rem", transition: "color 0.15s" }}
                  className="hover:!text-white">
                  rediantenergy@gmail.com
                </span>
              </a>
            </div>

            <Link href="/contact" className="btn-amber" style={{ width: "100%", fontSize: "0.875rem" }}>
              Request a Quote
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-[1280px] mx-auto py-6 px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p style={{ color: "#64748B", fontSize: "0.82rem" }}>
            © {new Date().getFullYear()} Rediant Energy Services. All rights reserved.
          </p>
          <p style={{ color: "#64748B", fontSize: "0.82rem" }}>
            GST Registered · ISO 9001:2015 Certified · Mumbai, India
          </p>
        </div>
      </div>
    </footer>
  );
}
