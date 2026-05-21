"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  MapPin, Phone, Mail, Clock, ChevronRight, CheckCircle,
  Building2, Package, MessageSquare, Send, Upload, Loader2,
} from "lucide-react";
import { CATEGORIES, PRODUCTS, Product } from "@/lib/products";
import { submitInquiry } from "@/app/actions/inquiry";
import { getProducts } from "@/app/actions/products";

const STEPS = [
  { id: 1, label: "Your Details",  icon: Building2 },
  { id: 2, label: "Product Needs", icon: Package },
  { id: 3, label: "Specifications",icon: MessageSquare },
];

export default function ContactPage() {
  return (
    <Suspense fallback={
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#F8FAFC" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "#64748B", fontWeight: 500 }}>
          <Loader2 className="animate-spin" size={20} />
          Loading Technical Inquiry Form...
        </div>
      </div>
    }>
      <ContactForm />
    </Suspense>
  );
}

function ContactForm() {
  const searchParams = useSearchParams();
  const productParam = searchParams.get("product");

  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "", company: "", email: "", phone: "",
    category: "", quantity: "", standard: "", message: "", callbackTime: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    getProducts().then((res) => {
      if (res && res.length > 0) {
        setProductsList(res);
      }
    });
  }, []);

  useEffect(() => {
    if (productParam) {
      const p = productsList.find((x) => x.name.toLowerCase() === productParam.toLowerCase());
      if (p) {
        setForm((prev) => ({
          ...prev,
          category: p.categorySlug,
          standard: p.specs.find((s) => s.label === "Standard")?.value || "",
          message: `Technical quote and specs request for: ${p.name}.`,
        }));
      }
    }
  }, [productParam, productsList]);

  const upd = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC" }}>

      {/* ── Page Hero ──────────────────────────────── */}
      <section className="bg-white border-b border-[rgba(148,163,184,0.2)] py-12 md:py-20 px-4 sm:px-8">
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <p className="type-label" style={{ marginBottom: "1rem" }}>Technical Inquiry</p>
          <h1 className="type-h1" style={{ marginBottom: "1.25rem", maxWidth: "600px" }}>
            Request a{" "}
            <span style={{ position: "relative", display: "inline-block" }}>
              Technical Quote
              <span style={{
                position: "absolute", left: 0, right: 0, bottom: "-4px",
                height: "3px", background: "#F59E0B", borderRadius: "2px",
              }} />
            </span>
          </h1>
          <p style={{ color: "#64748B", fontSize: "1.1rem", lineHeight: 1.75, maxWidth: "520px" }}>
            Submit your specifications. Our engineering team delivers a comprehensive
            quotation with COC documentation within{" "}
            <strong style={{ color: "#0F172A" }}>24 hours</strong>.
          </p>
        </div>
      </section>

      {/* ── Main Content ────────────────────────────── */}
      <section className="py-12 md:py-20 px-4 sm:px-8">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10 lg:gap-14">

          {/* ── Left Info Panel ──────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

            {/* SLA Card */}
            <div style={{
              background: "#FFFBEB", border: "1.5px solid #FDE68A",
              borderRadius: "16px", padding: "1.75rem",
            }}>
              <p style={{
                fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em",
                textTransform: "uppercase", color: "#92400E", marginBottom: "0.875rem",
              }}>
                24-Hour SLA Guarantee
              </p>
              <p style={{ fontSize: "0.9rem", color: "#78350F", lineHeight: 1.8 }}>
                Our corporate engineering division will compile and deliver your
                comprehensive technical quotation within 24 hours of submission.
              </p>
            </div>

            {/* Quick Contact */}
            <div className="card-surface" style={{ padding: "2rem" }}>
              <h2 style={{
                fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em",
                textTransform: "uppercase", color: "#94A3B8", marginBottom: "1.75rem",
              }}>
                Quick Contact
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {/* Phone Primary */}
                <a href="tel:+919324109605" style={{
                  display: "flex", alignItems: "center", gap: "1rem",
                  textDecoration: "none",
                }}>
                  <div style={{
                    width: "48px", height: "48px", borderRadius: "12px", flexShrink: 0,
                    background: "#FFFBEB", border: "1.5px solid #FDE68A",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Phone size={18} style={{ color: "#D97706" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.72rem", color: "#94A3B8", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.25rem" }}>Primary</div>
                    <div style={{ fontSize: "1rem", fontWeight: 700, color: "#0F172A" }}>+91 93241 09605</div>
                  </div>
                </a>

                {/* Phone Alt */}
                <a href="tel:+918425069104" style={{ display: "flex", alignItems: "center", gap: "1rem", textDecoration: "none" }}>
                  <div style={{
                    width: "48px", height: "48px", borderRadius: "12px", flexShrink: 0,
                    background: "#F8FAFC", border: "1.5px solid rgba(148,163,184,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Phone size={18} style={{ color: "#94A3B8" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.72rem", color: "#94A3B8", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.25rem" }}>Alternate</div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "#475569" }}>+91 84250 69104</div>
                  </div>
                </a>

                {/* Email */}
                <a href="mailto:sales@rediantenergy.com" style={{ display: "flex", alignItems: "center", gap: "1rem", textDecoration: "none" }}>
                  <div style={{
                    width: "48px", height: "48px", borderRadius: "12px", flexShrink: 0,
                    background: "#FFFBEB", border: "1.5px solid #FDE68A",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Mail size={18} style={{ color: "#D97706" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.72rem", color: "#94A3B8", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.25rem" }}>Email</div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0F172A" }}>sales@rediantenergy.com</div>
                  </div>
                </a>

                {/* Hours */}
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{
                    width: "48px", height: "48px", borderRadius: "12px", flexShrink: 0,
                    background: "#F8FAFC", border: "1.5px solid rgba(148,163,184,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Clock size={18} style={{ color: "#94A3B8" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.72rem", color: "#94A3B8", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.25rem" }}>Business Hours</div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#475569" }}>Mon – Sat · 9 AM – 7 PM IST</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Locations */}
            {[
              {
                label: "Head Office", city: "Mumbai",
                address: "Office No-19/A, 3rd Floor, Jhaveri Bhuvan, Kalbadevi Road, Mumbai – 400002",
                phone: "+91 93241 09605", highlight: true,
              },
              {
                label: "Manufacturing Unit", city: "Sidhi, M.P.",
                address: "Village Post, Mohaniya, Tah. Churhat, Dist. Sidhi, Madhya Pradesh",
                phone: null, highlight: false,
              },
              {
                label: "Branch Office", city: "Rewa, M.P.",
                address: "H. No. 3170, Ward No 15, Sharadpuran Saman Bandh, Rewa, M.P.",
                phone: null, highlight: false,
              },
            ].map((loc) => (
              <div key={loc.label} className="card-surface" style={{
                padding: "1.75rem",
                ...(loc.highlight ? { borderLeft: "3px solid #F59E0B" } : {}),
              }}>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <div style={{
                    width: "40px", height: "40px", borderRadius: "10px", flexShrink: 0,
                    background: loc.highlight ? "#FFFBEB" : "#F8FAFC",
                    border: loc.highlight ? "1.5px solid #FDE68A" : "1.5px solid rgba(148,163,184,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <MapPin size={16} style={{ color: loc.highlight ? "#D97706" : "#94A3B8" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.625rem", flexWrap: "wrap" }}>
                      <span style={{
                        fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.09em",
                        textTransform: "uppercase", color: loc.highlight ? "#92400E" : "#64748B",
                      }}>
                        {loc.label}
                      </span>
                      <span style={{ fontSize: "0.72rem", color: "#94A3B8", fontWeight: 600 }}>— {loc.city}</span>
                    </div>
                    <p style={{ fontSize: "0.875rem", color: "#475569", lineHeight: 1.75, marginBottom: loc.phone ? "0.75rem" : 0 }}>
                      {loc.address}
                    </p>
                    {loc.phone && (
                      <a href={`tel:${loc.phone.replace(/\s/g,"")}`} style={{
                        fontSize: "0.875rem", fontWeight: 700, color: "#D97706",
                        textDecoration: "none",
                      }}>
                        {loc.phone}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Standards */}
            <div className="card-surface" style={{ padding: "1.75rem" }}>
              <p style={{
                fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em",
                textTransform: "uppercase", color: "#94A3B8", marginBottom: "1.25rem",
              }}>
                Applicable Standards
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem" }}>
                {["ISO 9001:2015","IS 3043","BS EN 61537","IEC 60502","IS 7098","IS 694","BS 6121","GST Registered"].map(
                  (s) => <span key={s} className="badge badge-slate">{s}</span>
                )}
              </div>
            </div>
          </div>

          {/* ── Right Form Panel ─────────────────────── */}
          <div>
            {submitted ? (
              <div className="card-surface" style={{
                padding: "5rem 3rem", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", textAlign: "center", minHeight: "520px",
              }}>
                <div style={{
                  width: "72px", height: "72px", borderRadius: "50%",
                  background: "#ECFDF5", border: "2px solid #A7F3D0",
                  display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem",
                }}>
                  <CheckCircle size={32} style={{ color: "#10B981" }} />
                </div>
                <h2 className="type-h2" style={{ marginBottom: "1rem" }}>Inquiry Submitted!</h2>
                <p style={{ color: "#64748B", fontSize: "1rem", maxWidth: "380px", lineHeight: 1.8, marginBottom: "2rem" }}>
                  Our engineering team will review your requirements and respond to{" "}
                  <strong style={{ color: "#0F172A" }}>{form.email}</strong> within{" "}
                  <strong style={{ color: "#D97706" }}>24 hours</strong> with a detailed technical quotation.
                </p>
                <div style={{
                  padding: "1rem 1.5rem", background: "#FFFBEB", border: "1px solid #FDE68A",
                  borderRadius: "12px", fontSize: "0.875rem", color: "#92400E",
                }}>
                  Urgent? Call us:{" "}
                  <a href="tel:+919324109605" style={{ fontWeight: 700, color: "#D97706" }}>+91 93241 09605</a>
                </div>
              </div>
            ) : (
              <div className="card-surface" style={{ overflow: "hidden" }}>
                {/* Step Indicator */}
                <div className="p-4 sm:px-9 sm:py-7 bg-[#F8FAFC] border-b border-[rgba(148,163,184,0.15)]">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {STEPS.map((s, i) => {
                      const isActive = step === s.id;
                      const isDone = step > s.id;
                      return (
                        <div key={s.id} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                          <button
                            type="button"
                            onClick={() => !submitting && isDone && setStep(s.id)}
                            style={{
                              display: "flex", alignItems: "center", gap: "0.625rem",
                              background: "none", border: "none", cursor: (isDone && !submitting) ? "pointer" : "default",
                              padding: "0.5rem",
                              color: isActive ? "#0F172A" : isDone ? "#D97706" : "#94A3B8",
                            }}
                            disabled={submitting}
                          >
                            <div style={{
                              width: "32px", height: "32px", borderRadius: "50%", flexShrink: 0,
                              display: "flex", alignItems: "center", justifyContent: "center",
                              fontSize: "0.82rem", fontWeight: 800,
                              background: isActive ? "#F59E0B" : isDone ? "#FEF3C7" : "#E2E8F0",
                              color: isActive ? "#0F172A" : isDone ? "#92400E" : "#94A3B8",
                            }}>
                              {isDone ? "✓" : s.id}
                            </div>
                            <span className="hidden sm:inline" style={{ fontSize: "0.85rem", fontWeight: 600 }}>{s.label}</span>
                          </button>
                          {i < STEPS.length - 1 && (
                            <div style={{
                              flex: 1, height: "1px", margin: "0 0.25rem",
                              background: step > s.id ? "#F59E0B" : "rgba(148,163,184,0.3)",
                            }} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <form onSubmit={async (e) => {
                  e.preventDefault();
                  setSubmitting(true);
                  setErrorMsg("");
                  try {
                    const res = await submitInquiry(form);
                    if (res.success) {
                      setSubmitted(true);
                    } else {
                      setErrorMsg(res.error || "Failed to submit inquiry. Please try again.");
                    }
                  } catch (err) {
                    setErrorMsg("An unexpected error occurred. Please try again.");
                  } finally {
                    setSubmitting(false);
                  }
                }}>
                  <div className="p-5 sm:p-9">
                    {/* Error message */}
                    {errorMsg && (
                      <div style={{
                        padding: "1rem", background: "#FEF2F2", border: "1px solid #FCA5A5",
                        borderRadius: "12px", fontSize: "0.875rem", color: "#991B1B",
                        marginBottom: "1.5rem",
                      }}>
                        {errorMsg}
                      </div>
                    )}

                    {/* Step 1 */}
                    {step === 1 && (
                      <div>
                        <h2 className="type-h2" style={{ marginBottom: "0.75rem" }}>Your Details</h2>
                        <p style={{ color: "#64748B", marginBottom: "2rem", lineHeight: 1.7 }}>Tell us about yourself and your organisation.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          {[
                            { key: "name",    label: "Full Name",        placeholder: "John Doe",             type: "text"  },
                            { key: "company", label: "Company Name",     placeholder: "Acme Industries Ltd.", type: "text"  },
                            { key: "email",   label: "Corporate Email",  placeholder: "john@company.com",    type: "email" },
                            { key: "phone",   label: "Mobile Number",    placeholder: "+91 98765 43210",     type: "tel"   },
                          ].map((f) => (
                            <div key={f.key}>
                              <label style={{
                                display: "block", marginBottom: "0.625rem",
                                fontSize: "0.82rem", fontWeight: 600, color: "#475569",
                              }}>
                                {f.label} <span style={{ color: "#F59E0B" }}>*</span>
                              </label>
                              <input
                                type={f.type} required
                                placeholder={f.placeholder}
                                value={(form as Record<string,string>)[f.key]}
                                onChange={(e) => upd(f.key, e.target.value)}
                                className="form-input"
                                disabled={submitting}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Step 2 */}
                    {step === 2 && (
                      <div>
                        <h2 className="type-h2" style={{ marginBottom: "0.75rem" }}>Product Requirements</h2>
                        <p style={{ color: "#64748B", marginBottom: "2rem", lineHeight: 1.7 }}>Specify the products, quantities, and relevant standards.</p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                              <label style={{ display: "block", marginBottom: "0.625rem", fontSize: "0.82rem", fontWeight: 600, color: "#475569" }}>
                                Product Category <span style={{ color: "#F59E0B" }}>*</span>
                              </label>
                              <select required value={form.category} onChange={(e) => upd("category", e.target.value)} className="form-select" disabled={submitting}>
                                <option value="">Select category…</option>
                                {CATEGORIES.filter((c) => c.slug !== "all").map((c) => (
                                  <option key={c.slug} value={c.slug}>{c.label}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label style={{ display: "block", marginBottom: "0.625rem", fontSize: "0.82rem", fontWeight: 600, color: "#475569" }}>
                                Estimated Quantity
                              </label>
                              <input type="text" placeholder="e.g. 500 pcs / 10 MT / 5 kW" value={form.quantity} onChange={(e) => upd("quantity", e.target.value)} className="form-input" disabled={submitting} />
                            </div>
                          </div>
                          <div>
                            <label style={{ display: "block", marginBottom: "0.625rem", fontSize: "0.82rem", fontWeight: 600, color: "#475569" }}>
                              Required Standard / Specification
                            </label>
                            <input type="text" placeholder="e.g. IS 3043, BS EN 61537, IEC 60502…" value={form.standard} onChange={(e) => upd("standard", e.target.value)} className="form-input" disabled={submitting} />
                          </div>
                          <div>
                            <label style={{ display: "block", marginBottom: "0.625rem", fontSize: "0.82rem", fontWeight: 600, color: "#475569" }}>
                              Upload Specification File <span style={{ color: "#94A3B8", fontWeight: 400 }}>(PDF, Excel, DXF — optional)</span>
                            </label>
                            <div style={{
                              border: "2px dashed rgba(148,163,184,0.4)", borderRadius: "12px",
                              padding: "2.5rem 1.5rem", textAlign: "center", cursor: "pointer",
                              transition: "border-color 0.2s, background 0.2s",
                            }}>
                              <Upload size={22} style={{ margin: "0 auto 0.875rem", color: "#CBD5E1", display: "block" }} />
                              <p style={{ fontSize: "0.9rem", color: "#64748B" }}>
                                Drag & drop or <span style={{ color: "#D97706", fontWeight: 600 }}>browse</span>
                              </p>
                              <p style={{ fontSize: "0.78rem", color: "#94A3B8", marginTop: "0.375rem" }}>Max 10 MB</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 3 */}
                    {step === 3 && (
                      <div>
                        <h2 className="type-h2" style={{ marginBottom: "0.75rem" }}>Final Details</h2>
                        <p style={{ color: "#64748B", marginBottom: "2rem", lineHeight: 1.7 }}>Add project context and preferred contact time.</p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                          <div>
                            <label style={{ display: "block", marginBottom: "0.625rem", fontSize: "0.82rem", fontWeight: 600, color: "#475569" }}>
                              Project Description & Special Requirements
                            </label>
                            <textarea
                              rows={5} placeholder="Describe your project, delivery location, timeline, or technical queries…"
                              value={form.message} onChange={(e) => upd("message", e.target.value)}
                              className="form-input" style={{ resize: "none" }}
                              disabled={submitting}
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", marginBottom: "0.625rem", fontSize: "0.82rem", fontWeight: 600, color: "#475569" }}>
                              Preferred Callback Time
                            </label>
                            <select value={form.callbackTime} onChange={(e) => upd("callbackTime", e.target.value)} className="form-select" disabled={submitting}>
                              <option value="">Any time</option>
                              <option>Morning · 9 AM – 12 PM</option>
                              <option>Afternoon · 12 PM – 3 PM</option>
                              <option>Evening · 3 PM – 7 PM</option>
                            </select>
                          </div>
                          {/* Summary */}
                          <div style={{
                            padding: "1.5rem", background: "#F8FAFC",
                            border: "1px solid rgba(148,163,184,0.2)", borderRadius: "12px",
                          }}>
                            <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#94A3B8", marginBottom: "1rem" }}>
                              Submission Summary
                            </p>
                            <table className="spec-table">
                              <tbody>
                                {[
                                  { l: "Name",     v: form.name     || "—" },
                                  { l: "Company",  v: form.company  || "—" },
                                  { l: "Email",    v: form.email    || "—" },
                                  { l: "Category", v: form.category || "—" },
                                  { l: "Quantity", v: form.quantity || "—" },
                                ].map(({ l, v }) => (
                                  <tr key={l}><td>{l}</td><td>{v}</td></tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Form Footer */}
                  <div className="p-5 sm:px-9 sm:py-6 bg-[#F8FAFC] border-t border-[rgba(148,163,184,0.15)] flex items-center justify-between">
                    <button
                      type="button" onClick={() => setStep((s) => Math.max(1, s - 1))}
                      className="btn-ghost"
                      style={{ visibility: step === 1 ? "hidden" : "visible" }}
                      disabled={submitting}
                    >
                      ← Back
                    </button>
                    {step < 3 ? (
                      <button type="button" onClick={() => setStep((s) => s + 1)} className="btn-amber" disabled={submitting}>
                        Continue <ChevronRight size={16} />
                      </button>
                    ) : (
                      <button type="submit" className="btn-amber" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }} disabled={submitting}>
                        {submitting ? (
                          <>
                            <Loader2 className="animate-spin" size={15} />
                            Submitting...
                          </>
                        ) : (
                          <><Send size={15} /> Submit Inquiry</>
                        )}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

