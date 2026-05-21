"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Search, Plus, Check, X, SlidersHorizontal, FileText, ExternalLink } from "lucide-react";
import { PRODUCTS, CATEGORIES, Product } from "@/lib/products";
import { useQuoteCart } from "@/context/QuoteCartContext";
import Link from "next/link";

const MATERIAL_OPTIONS = [
  "All Materials", "Brass (60/40)", "Hot-Dip GI Steel", "Aluminium Alloy",
  "Polyamide PA66 (Nylon)", "Copper / Copper-Bonded", "MS Steel", "Annealed Copper",
];
const SIZE_OPTIONS = [
  "All Sizes", "Micro (PG7–PG16)", "Standard (M20–M32)", "Medium (M32–M63)",
  "Large (M63+)", "1.5–16mm²", "25–300mm²", "50–600mm width",
];
const CERT_OPTIONS = [
  "All Certifications", "IS 3043", "BS EN 61537", "BS 6121", "IS 7098",
  "IEC 60502", "IEC 61215", "IS 694", "IP65 / IP66",
];

function highlight(text: string, query: string) {
  if (!query.trim()) return <span>{text}</span>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <span>{text}</span>;
  return (
    <span>
      {text.slice(0, idx)}
      <mark>{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </span>
  );
}

/* ── Spec Sheet Modal ───────────────────────────────── */
function SpecModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const { addItem, isInCart } = useQuoteCart();
  const inCart = isInCart(product.id);
  const [mounted, setMounted] = useState(false);

  // Mount after hydration so createPortal works in SSR
  useEffect(() => { setMounted(true); }, []);

  // Close on Escape key
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", h);
    // Prevent body scroll while modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", h);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <>
      {/* Backdrop wrapper which centers the child modal using flexbox */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(15,23,42,0.6)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          zIndex: 9998,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
        }}
        className="anim-fade-in"
      >
        {/* Modal — animated with scaleIn without transform conflict */}
        <div
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
          style={{
            width: "min(700px, 100%)",
            maxHeight: "88vh",
            background: "#FFFFFF",
            borderRadius: "20px",
            boxShadow: "0 40px 100px rgba(0,0,0,0.25), 0 8px 32px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
          className="anim-scale-in"
        >
          {/* Header */}
          <div style={{
            padding: "1.75rem 2rem",
            borderBottom: "1px solid rgba(148,163,184,0.15)",
            display: "flex", alignItems: "flex-start",
            justifyContent: "space-between", gap: "1rem",
            flexShrink: 0,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{
                width: "52px", height: "52px", borderRadius: "14px", flexShrink: 0,
                background: "#FFFBEB", border: "1.5px solid #FDE68A",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.5rem",
              }}>
                {product.icon}
              </div>
              <div>
                <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0F172A", marginBottom: "0.3rem" }}>
                  {product.name}
                </h2>
                <p style={{
                  fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em",
                  textTransform: "uppercase", color: "#94A3B8",
                }}>
                  {product.category}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                width: "38px", height: "38px", borderRadius: "10px", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "#F1F5F9", border: "none", cursor: "pointer", color: "#64748B",
                transition: "background 0.15s",
              }}
            >
              <X size={17} />
            </button>
          </div>

          {/* Scrollable Body */}
          <div style={{ overflowY: "auto", padding: "2rem", flex: 1 }}>
            {/* Description */}
            <p style={{ color: "#64748B", fontSize: "0.92rem", lineHeight: 1.8, marginBottom: "2rem" }}>
              {product.description}
            </p>

            {/* Full Specs Table */}
            <div style={{ marginBottom: "2rem" }}>
              <p style={{
                fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em",
                textTransform: "uppercase", color: "#94A3B8", marginBottom: "1rem",
              }}>
                Full Technical Specifications
              </p>
              <table className="spec-table">
                <tbody>
                  {product.specs.map((s) => (
                    <tr key={s.label}>
                      <td>{s.label}</td>
                      <td>{s.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Certifications */}
            <div>
              <p style={{
                fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em",
                textTransform: "uppercase", color: "#94A3B8", marginBottom: "1rem",
              }}>
                Certifications & Compliance
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem" }}>
                {product.specs
                  .filter((s) => ["Standard", "IP Rating", "Certification"].includes(s.label))
                  .map((s) => (
                    <span key={s.label} className="badge badge-navy">{s.value}</span>
                  ))}
                <span className="badge badge-green">GST Invoice Available</span>
                <span className="badge badge-slate">COC on Request</span>
                <span className="badge badge-amber">ISO 9001:2015</span>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div style={{
            padding: "1.5rem 2rem",
            borderTop: "1px solid rgba(148,163,184,0.15)",
            background: "#F8FAFC",
            display: "flex", gap: "0.875rem",
            flexShrink: 0,
          }}>
            <Link
              href={`/contact?product=${encodeURIComponent(product.name)}`}
              onClick={onClose}
              className="btn-outline"
              style={{ flex: 1, fontSize: "0.875rem" }}
            >
              <ExternalLink size={15} /> Request Quote
            </Link>
            <button
              onClick={() => { addItem(product); onClose(); }}
              className="btn-amber"
              style={{ flex: 1, fontSize: "0.875rem" }}
              disabled={inCart}
            >
              {inCart
                ? <><Check size={15} /> In RFQ List</>
                : <><Plus size={15} /> Add to RFQ</>
              }
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}

/* ── Product Card ───────────────────────────────────── */
function ProductCard({ product }: { product: Product }) {
  const { addItem, removeItem, isInCart } = useQuoteCart();
  const inCart = isInCart(product.id);
  const [activeTab, setActiveTab] = useState<"specs" | "dims" | "certs">("specs");
  const [showModal, setShowModal] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div className="card-surface flex flex-col overflow-hidden group">

      {/* Header */}
      <div style={{ padding: "1.75rem 1.75rem 1.25rem" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
          {/* Icon / Image */}
          {product.image && !imgError ? (
            <div
              style={{
                width: "52px", height: "52px", borderRadius: "14px", flexShrink: 0,
                border: "1.5px solid rgba(148,163,184,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                overflow: "hidden", transition: "all 0.3s",
                background: "#FFFFFF",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
              className="group-hover:!border-amber-300 group-hover:shadow-sm"
            >
              <img 
                src={product.image} 
                alt={product.name} 
                onError={() => setImgError(true)}
                style={{ width: "100%", height: "100%", objectFit: "cover" }} 
              />
            </div>
          ) : (
            <div
              style={{
                width: "52px", height: "52px", borderRadius: "14px", flexShrink: 0,
                background: "#F8FAFC", border: "1.5px solid rgba(148,163,184,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.5rem", transition: "all 0.3s",
              }}
              className="group-hover:!bg-amber-50 group-hover:!border-amber-200"
            >
              {product.icon}
            </div>
          )}

          {/* Title */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{
              fontSize: "0.95rem", fontWeight: 700, color: "#0F172A",
              lineHeight: 1.3, marginBottom: "0.35rem",
            }}>
              {product.name}
            </h3>
            {product.badge && (
              <span className="badge badge-amber" style={{ marginBottom: "0.35rem", display: "inline-block" }}>
                {product.badge}
              </span>
            )}
            <p className="type-label" style={{ marginTop: "0.25rem" }}>{product.category}</p>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="tab-bar" style={{ paddingLeft: "1.25rem", paddingRight: "1.25rem" }}>
        {(["specs", "dims", "certs"] as const).map((t) => (
          <button key={t} onClick={() => setActiveTab(t)} className={`tab-item ${activeTab === t ? "active" : ""}`}>
            {t === "specs" ? "Technical" : t === "dims" ? "Parameters" : "Compliance"}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ padding: "1.25rem 1.75rem", flex: 1, minHeight: "148px" }}>
        {activeTab === "specs" && (
          <table className="spec-table">
            <tbody>
              {product.specs.slice(0, 4).map((s) => (
                <tr key={s.label}>
                  <td>{s.label}</td>
                  <td>{s.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {activeTab === "dims" && (
          <table className="spec-table">
            <tbody>
              {product.specs.slice(2, 6).map((s) => (
                <tr key={s.label}>
                  <td>{s.label}</td>
                  <td>{s.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {activeTab === "certs" && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", paddingTop: "0.25rem" }}>
            {product.specs
              .filter((s) => ["Standard", "IP Rating", "Voltage", "Certification"].includes(s.label))
              .map((s) => <span key={s.label} className="badge badge-navy">{s.value}</span>)}
            <span className="badge badge-green">GST Invoice</span>
            <span className="badge badge-slate">COC Available</span>
          </div>
        )}
      </div>

      {/* Description */}
      <div style={{ padding: "0 1.75rem 1.25rem" }}>
        <p style={{ fontSize: "0.82rem", color: "#94A3B8", lineHeight: 1.6 }}
          className="line-clamp-2">
          {product.description}
        </p>
      </div>

      {/* Action Buttons */}
      <div style={{
        borderTop: "1px solid rgba(148,163,184,0.15)",
        padding: "1.25rem 1.5rem",
        display: "flex", gap: "0.75rem",
      }}>
        {/* Tech Specs — now opens modal */}
        <button
          onClick={() => setShowModal(true)}
          className="btn-outline"
          style={{ flex: 1, fontSize: "0.82rem", padding: "0.75rem 0.875rem", minHeight: "48px", gap: "0.4rem" }}
        >
          <FileText size={14} />
          Tech Specs
        </button>

        {/* Add to RFQ */}
        <button
          onClick={() => (inCart ? removeItem(product.id) : addItem(product))}
          style={{
            flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
            gap: "0.4rem", padding: "0.75rem 0.875rem", minHeight: "48px",
            borderRadius: "10px", fontSize: "0.82rem", fontWeight: 700,
            cursor: "pointer", transition: "all 0.2s",
            ...(inCart
              ? { background: "#ECFDF5", borderColor: "#A7F3D0", borderStyle: "solid", borderWidth: "1.5px", color: "#065F46" }
              : { background: "#F59E0B", border: "none", color: "#0F172A" }
            ),
          }}
        >
          {inCart ? <><Check size={13} /> Added</> : <><Plus size={13} /> Add to RFQ</>}
        </button>
      </div>

      {/* Spec Sheet Modal */}
      {showModal && <SpecModal product={product} onClose={() => setShowModal(false)} />}
    </div>
  );
}

/* ── Main Section ───────────────────────────────────── */
export default function CatalogSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [showAC, setShowAC] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeMaterial, setActiveMaterial] = useState("All Materials");
  const [activeCert, setActiveCert] = useState("All Certifications");
  const [activeSize, setActiveSize] = useState("All Sizes");
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(searchQuery), 220);
    return () => clearTimeout(t);
  }, [searchQuery]);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setShowAC(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const suggestions = useMemo(() => {
    if (!debouncedQuery.trim() || debouncedQuery.length < 2) return [];
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(debouncedQuery.toLowerCase())
    ).slice(0, 6);
  }, [debouncedQuery]);

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const q = debouncedQuery.toLowerCase();
      const matchSearch = !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.specs.some((s) => s.value.toLowerCase().includes(q));
      const matchCat = activeCategory === "all" || p.categorySlug === activeCategory;
      const matchMat = activeMaterial === "All Materials" ||
        p.specs.some((s) => s.value.toLowerCase().includes(activeMaterial.toLowerCase().split(" ")[0]));
      const matchCert = activeCert === "All Certifications" ||
        p.specs.some((s) => s.value.toLowerCase().includes(activeCert.toLowerCase().split(" ")[0]));
      return matchSearch && matchCat && matchMat && matchCert;
    });
  }, [debouncedQuery, activeCategory, activeMaterial, activeCert]);

  const clearFilters = () => {
    setSearchQuery(""); setDebouncedQuery("");
    setActiveCategory("all"); setActiveMaterial("All Materials");
    setActiveCert("All Certifications"); setActiveSize("All Sizes");
  };

  const isFiltered = searchQuery || activeCategory !== "all" ||
    activeMaterial !== "All Materials" || activeCert !== "All Certifications" || activeSize !== "All Sizes";

  return (
    <section id="catalog" className="section-canvas" style={{ padding: "7rem 0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>

        {/* ── Section Header ──────────────────────────── */}
        <div style={{ marginBottom: "3.5rem" }}>
          <p className="type-label" style={{ marginBottom: "0.875rem" }}>Product Catalog</p>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
            <div>
              <h2 className="type-h2">Technical Product Matrix</h2>
              <p style={{ color: "#64748B", fontSize: "1rem", marginTop: "0.75rem", lineHeight: 1.7, maxWidth: "520px" }}>
                All data sheets are freely downloadable — no login, no forms, no friction.
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span className="badge badge-slate" style={{ padding: "0.35rem 0.875rem", fontSize: "0.78rem" }}>
                {filtered.length} Products
              </span>
              {isFiltered && (
                <button onClick={clearFilters} className="btn-ghost" style={{ fontSize: "0.82rem" }}>
                  <X size={13} /> Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Search ──────────────────────────────────── */}
        <div className="card-surface" style={{ padding: "1.75rem", marginBottom: "1.5rem" }}>
          <div className="relative" ref={searchRef} style={{ position: "relative" }}>
            <Search size={17} style={{
              position: "absolute", left: "1.125rem", top: "50%", transform: "translateY(-50%)",
              color: "#94A3B8", pointerEvents: "none",
            }} />
            <input
              type="text"
              placeholder="Search by product name, part type, material, or certification standard…"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setShowAC(true); }}
              onFocus={() => setShowAC(true)}
              className="form-input"
              style={{ paddingLeft: "3rem", paddingRight: "3rem", fontSize: "0.95rem" }}
            />
            {searchQuery && (
              <button
                onClick={() => { setSearchQuery(""); setDebouncedQuery(""); }}
                style={{
                  position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)",
                  padding: "0.375rem", borderRadius: "6px", color: "#94A3B8",
                  background: "none", border: "none", cursor: "pointer",
                }}
              >
                <X size={16} />
              </button>
            )}
            {showAC && suggestions.length > 0 && (
              <div className="autocomplete-dropdown">
                {suggestions.map((p) => (
                  <div
                    key={p.id}
                    className="autocomplete-item"
                    onMouseDown={() => { setSearchQuery(p.name); setDebouncedQuery(p.name); setShowAC(false); }}
                  >
                    <span style={{ fontSize: "1.375rem", flexShrink: 0 }}>{p.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600 }}>{highlight(p.name, debouncedQuery)}</div>
                      <div style={{ fontSize: "0.78rem", color: "#94A3B8", marginTop: "0.125rem" }}>{p.category}</div>
                    </div>
                    <span className="badge badge-slate">{p.specs[0]?.value.split("/")[0]}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Filters ─────────────────────────────────── */}
        <div className="card-surface" style={{ padding: "1.75rem", marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1.5rem" }}>
            <SlidersHorizontal size={15} style={{ color: "#94A3B8" }} />
            <span className="type-label">Filter Products</span>
          </div>

          {/* Category Chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem", marginBottom: "1.75rem", paddingBottom: "1.75rem", borderBottom: "1px solid rgba(148,163,184,0.15)" }}>
            {CATEGORIES.map((c) => (
              <button
                key={c.slug}
                onClick={() => setActiveCategory(c.slug)}
                className={`filter-chip ${activeCategory === c.slug ? "active" : ""}`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Advanced Dropdowns — 3-col grid with proper labels */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
            {[
              { label: "Material Composition", value: activeMaterial, set: setActiveMaterial, opts: MATERIAL_OPTIONS },
              { label: "Sizing Scale", value: activeSize, set: setActiveSize, opts: SIZE_OPTIONS },
              { label: "Certification Standard", value: activeCert, set: setActiveCert, opts: CERT_OPTIONS },
            ].map((f) => (
              <div key={f.label}>
                <label style={{ display: "block", marginBottom: "0.5rem" }} className="type-label">
                  {f.label}
                </label>
                <select value={f.value} onChange={(e) => f.set(e.target.value)} className="form-select">
                  {f.opts.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* ── Product Grid ─────────────────────────────── */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "6rem 0" }}>
            <Search size={40} style={{ margin: "0 auto 1.25rem", color: "#CBD5E1" }} />
            <p style={{ fontSize: "1.05rem", fontWeight: 600, color: "#475569", marginBottom: "0.5rem" }}>
              No products match your filters.
            </p>
            <p style={{ fontSize: "0.9rem", color: "#94A3B8", marginBottom: "1.5rem" }}>
              Try broadening your search or clearing filters.
            </p>
            <button onClick={clearFilters} className="btn-amber">Clear All Filters</button>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.75rem",
          }}
            className="sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
