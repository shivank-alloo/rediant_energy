"use client";

import { useState, useEffect, useCallback, Fragment } from "react";
import { login, logout, checkAuth } from "@/app/actions/admin";
import { getProducts, saveProduct, deleteProduct, addProduct } from "@/app/actions/products";
import { Product, ProductSpec, CATEGORIES } from "@/lib/products";
import {
  Eye, EyeOff, LogOut, Search, Edit3, Trash2, Plus, Save, X,
  ChevronDown, ChevronUp, Package, Shield, CheckCircle, AlertCircle,
  LayoutDashboard, Zap
} from "lucide-react";

/* ────────────────────────────────────────────────
   TYPES
──────────────────────────────────────────────── */
type ToastType = "success" | "error";
interface Toast { id: number; message: string; type: ToastType }

/* ────────────────────────────────────────────────
   LOGIN VIEW
──────────────────────────────────────────────── */
function LoginView({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await login(password);
    setLoading(false);
    if (res.success) {
      onSuccess();
    } else {
      setError(res.error ?? "Something went wrong.");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
      padding: "2rem",
    }}>
      {/* Ambient glow blobs */}
      <div style={{
        position: "fixed", top: "20%", left: "10%",
        width: "400px", height: "400px",
        background: "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)",
        pointerEvents: "none", borderRadius: "50%",
      }} />
      <div style={{
        position: "fixed", bottom: "20%", right: "10%",
        width: "300px", height: "300px",
        background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
        pointerEvents: "none", borderRadius: "50%",
      }} />

      <div style={{
        width: "100%", maxWidth: "420px",
        background: "rgba(30, 41, 59, 0.9)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(148,163,184,0.15)",
        borderRadius: "24px",
        padding: "3rem 2.5rem",
        boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03) inset",
      }}>
        {/* Logo mark */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{
            width: "64px", height: "64px", borderRadius: "18px",
            background: "linear-gradient(135deg, #F59E0B, #D97706)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 1.25rem", fontSize: "1.75rem",
            boxShadow: "0 8px 24px rgba(245,158,11,0.35)",
          }}>
            ⚡
          </div>
          <h1 style={{
            fontSize: "1.5rem", fontWeight: 800, color: "#F8FAFC",
            marginBottom: "0.4rem", letterSpacing: "-0.02em",
          }}>
            Admin Portal
          </h1>
          <p style={{ fontSize: "0.875rem", color: "#94A3B8" }}>
            Rediant Energy — Product Management
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#94A3B8", marginBottom: "0.5rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Username
            </label>
            <input
              type="text"
              name="username"
              value="admin"
              readOnly
              style={{
                width: "100%", boxSizing: "border-box",
                background: "rgba(15,23,42,0.4)", border: "1.5px solid rgba(148,163,184,0.1)",
                borderRadius: "12px", padding: "0.875rem 1rem", color: "#64748B",
                fontSize: "0.9rem", outline: "none", cursor: "not-allowed",
              }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#94A3B8", marginBottom: "0.5rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                id="admin-password"
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder="Enter admin password"
                required
                style={{
                  width: "100%", boxSizing: "border-box",
                  background: "rgba(15,23,42,0.6)", border: `1.5px solid ${error ? "#EF4444" : "rgba(148,163,184,0.15)"}`,
                  borderRadius: "12px", padding: "0.875rem 3rem 0.875rem 1rem",
                  color: "#F8FAFC", fontSize: "0.9rem", outline: "none",
                  transition: "border-color 0.2s",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                style={{
                  position: "absolute", right: "0.875rem", top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer", color: "#64748B",
                  display: "flex", alignItems: "center",
                }}
              >
                {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
            {error && (
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "0.5rem", color: "#EF4444", fontSize: "0.8rem" }}>
                <AlertCircle size={13} /> {error}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !password}
            style={{
              width: "100%", padding: "0.9rem",
              background: loading || !password ? "rgba(245,158,11,0.4)" : "linear-gradient(135deg, #F59E0B, #D97706)",
              border: "none", borderRadius: "12px",
              color: "#0F172A", fontWeight: 800, fontSize: "0.9rem",
              cursor: loading || !password ? "not-allowed" : "pointer",
              transition: "all 0.2s", letterSpacing: "0.02em",
              boxShadow: loading || !password ? "none" : "0 4px 16px rgba(245,158,11,0.35)",
            }}
          >
            {loading ? "Authenticating…" : "Sign In →"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.75rem", color: "#475569" }}>
          Protected area · Session expires in 24h
        </p>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────
   SPECS EDITOR MODAL
──────────────────────────────────────────────── */
function SpecsEditorModal({
  product,
  onClose,
  onSaved,
}: {
  product: Product;
  onClose: () => void;
  onSaved: (p: Product) => void;
}) {
  const [form, setForm] = useState<Product>({ ...product, specs: product.specs.map((s) => ({ ...s })) });
  const [saving, setSaving] = useState(false);

  const updateField = (field: keyof Product, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const updateSpec = (index: number, key: keyof ProductSpec, value: string) => {
    setForm((prev) => {
      const specs = prev.specs.map((s, i) => i === index ? { ...s, [key]: value } : s);
      return { ...prev, specs };
    });
  };

  const addSpec = () => {
    setForm((prev) => ({ ...prev, specs: [...prev.specs, { label: "", value: "" }] }));
  };

  const removeSpec = (index: number) => {
    setForm((prev) => ({ ...prev, specs: prev.specs.filter((_, i) => i !== index) }));
  };

  const handleSave = async () => {
    setSaving(true);
    const res = await saveProduct(form);
    setSaving(false);
    if (res.success) onSaved(form);
  };

  // Close on Escape
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [onClose]);

  const inputStyle = {
    width: "100%", boxSizing: "border-box" as const,
    background: "rgba(15,23,42,0.5)", border: "1.5px solid rgba(148,163,184,0.2)",
    borderRadius: "8px", padding: "0.6rem 0.875rem",
    color: "#F8FAFC", fontSize: "0.85rem", outline: "none",
  };

  const labelStyle = {
    display: "block" as const, fontSize: "0.7rem", fontWeight: 700, color: "#64748B",
    marginBottom: "0.35rem", letterSpacing: "0.06em", textTransform: "uppercase" as const,
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1.5rem",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(760px, 100%)", maxHeight: "90vh",
          background: "#1E293B",
          border: "1px solid rgba(148,163,184,0.15)",
          borderRadius: "20px",
          display: "flex", flexDirection: "column",
          boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
          overflow: "hidden",
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        {/* Modal Header */}
        <div style={{
          padding: "1.5rem 2rem", flexShrink: 0,
          borderBottom: "1px solid rgba(148,163,184,0.1)",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
            <div style={{
              width: "44px", height: "44px", borderRadius: "12px",
              background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.25rem",
            }}>
              {product.icon}
            </div>
            <div>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#F8FAFC", marginBottom: "0.2rem" }}>
                Edit Product
              </h2>
              <p style={{ fontSize: "0.75rem", color: "#64748B" }}>{product.id}</p>
            </div>
          </div>
          <button onClick={onClose} style={{
            width: "36px", height: "36px", borderRadius: "10px",
            background: "rgba(148,163,184,0.1)", border: "none", cursor: "pointer",
            color: "#94A3B8", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <X size={17} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div style={{ overflowY: "auto", flex: 1, padding: "2rem" }}>

          {/* Basic Fields */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem",
            marginBottom: "1.5rem",
          }}>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Product Name</label>
              <input style={inputStyle} value={form.name} onChange={(e) => updateField("name", e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Icon (emoji)</label>
              <input style={inputStyle} value={form.icon} onChange={(e) => updateField("icon", e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Badge (optional)</label>
              <input style={inputStyle} value={form.badge ?? ""} onChange={(e) => updateField("badge", e.target.value)} placeholder="e.g. Best Seller" />
            </div>
            <div>
              <label style={labelStyle}>Category</label>
              <select
                style={{ ...inputStyle, cursor: "pointer" }}
                value={form.categorySlug}
                onChange={(e) => {
                  const cat = CATEGORIES.find((c) => c.slug === e.target.value);
                  setForm((prev) => ({ ...prev, categorySlug: e.target.value, category: cat?.label ?? prev.category }));
                }}
              >
                {CATEGORIES.filter((c) => c.slug !== "all").map((c) => (
                  <option key={c.slug} value={c.slug}>{c.label}</option>
                ))}
              </select>
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Description</label>
              <textarea
                style={{ ...inputStyle, minHeight: "80px", resize: "vertical", lineHeight: 1.6 }}
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
              />
            </div>
          </div>

          {/* Specs Section */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#64748B", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Technical Specifications
              </p>
              <button
                onClick={addSpec}
                style={{
                  display: "flex", alignItems: "center", gap: "0.4rem",
                  padding: "0.4rem 0.875rem", borderRadius: "8px",
                  background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)",
                  color: "#F59E0B", fontSize: "0.78rem", fontWeight: 700, cursor: "pointer",
                }}
              >
                <Plus size={13} /> Add Row
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {form.specs.map((spec, idx) => (
                <div key={idx} style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr auto",
                  gap: "0.625rem", alignItems: "center",
                  background: "rgba(15,23,42,0.4)", borderRadius: "10px", padding: "0.75rem",
                  border: "1px solid rgba(148,163,184,0.08)",
                }}>
                  <input
                    style={inputStyle}
                    placeholder="Label (e.g. Material)"
                    value={spec.label}
                    onChange={(e) => updateSpec(idx, "label", e.target.value)}
                  />
                  <input
                    style={inputStyle}
                    placeholder="Value (e.g. GI / Copper)"
                    value={spec.value}
                    onChange={(e) => updateSpec(idx, "value", e.target.value)}
                  />
                  <button
                    onClick={() => removeSpec(idx)}
                    style={{
                      width: "34px", height: "34px", borderRadius: "8px",
                      background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
                      color: "#EF4444", display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer", flexShrink: 0,
                    }}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: "1.25rem 2rem", flexShrink: 0,
          borderTop: "1px solid rgba(148,163,184,0.1)",
          background: "rgba(15,23,42,0.5)",
          display: "flex", gap: "0.75rem", justifyContent: "flex-end",
        }}>
          <button onClick={onClose} style={{
            padding: "0.7rem 1.5rem", borderRadius: "10px",
            background: "rgba(148,163,184,0.1)", border: "1px solid rgba(148,163,184,0.15)",
            color: "#94A3B8", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer",
          }}>
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              padding: "0.7rem 1.75rem", borderRadius: "10px",
              background: saving ? "rgba(245,158,11,0.4)" : "linear-gradient(135deg, #F59E0B, #D97706)",
              border: "none", color: "#0F172A", fontSize: "0.875rem",
              fontWeight: 800, cursor: saving ? "not-allowed" : "pointer",
              boxShadow: saving ? "none" : "0 4px 12px rgba(245,158,11,0.3)",
            }}
          >
            <Save size={15} /> {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────
   ADD PRODUCT MODAL
──────────────────────────────────────────────── */
function AddProductModal({ onClose, onAdded }: { onClose: () => void; onAdded: (p: Product) => void }) {
  const [form, setForm] = useState<Product>({
    id: "", name: "", category: "Earthing & Grounding", categorySlug: "earthing",
    description: "", icon: "📦", badge: "", specs: [{ label: "", value: "" }],
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [onClose]);

  const handleAdd = async () => {
    if (!form.id.trim() || !form.name.trim()) { setError("Product ID and Name are required."); return; }
    setSaving(true);
    const res = await addProduct(form);
    setSaving(false);
    if (res.success) onAdded(form);
    else setError("Failed to add product.");
  };

  const inputStyle = {
    width: "100%", boxSizing: "border-box" as const,
    background: "rgba(15,23,42,0.5)", border: "1.5px solid rgba(148,163,184,0.2)",
    borderRadius: "8px", padding: "0.6rem 0.875rem",
    color: "#F8FAFC", fontSize: "0.85rem", outline: "none",
  };
  const labelStyle = {
    display: "block" as const, fontSize: "0.7rem", fontWeight: 700, color: "#64748B",
    marginBottom: "0.35rem", letterSpacing: "0.06em", textTransform: "uppercase" as const,
  };

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem",
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        width: "min(700px, 100%)", maxHeight: "90vh",
        background: "#1E293B", border: "1px solid rgba(148,163,184,0.15)",
        borderRadius: "20px", display: "flex", flexDirection: "column",
        boxShadow: "0 40px 80px rgba(0,0,0,0.6)", overflow: "hidden",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}>
        <div style={{
          padding: "1.5rem 2rem", flexShrink: 0,
          borderBottom: "1px solid rgba(148,163,184,0.1)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{
              width: "40px", height: "40px", borderRadius: "10px",
              background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Plus size={18} color="#22C55E" />
            </div>
            <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#F8FAFC" }}>Add New Product</h2>
          </div>
          <button onClick={onClose} style={{
            width: "36px", height: "36px", borderRadius: "10px",
            background: "rgba(148,163,184,0.1)", border: "none", cursor: "pointer",
            color: "#94A3B8", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <X size={17} />
          </button>
        </div>

        <div style={{ overflowY: "auto", flex: 1, padding: "2rem" }}>
          {error && (
            <div style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
              borderRadius: "8px", padding: "0.75rem 1rem", color: "#EF4444",
              fontSize: "0.83rem", marginBottom: "1rem",
            }}>
              <AlertCircle size={14} /> {error}
            </div>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
            <div>
              <label style={labelStyle}>Product ID (unique slug)</label>
              <input style={inputStyle} placeholder="e.g. gi-rod-25mm" value={form.id}
                onChange={(e) => { setForm((p) => ({ ...p, id: e.target.value })); setError(""); }} />
            </div>
            <div>
              <label style={labelStyle}>Product Name</label>
              <input style={inputStyle} placeholder="e.g. GI Earth Rod" value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
            </div>
            <div>
              <label style={labelStyle}>Icon (emoji)</label>
              <input style={inputStyle} value={form.icon}
                onChange={(e) => setForm((p) => ({ ...p, icon: e.target.value }))} />
            </div>
            <div>
              <label style={labelStyle}>Badge (optional)</label>
              <input style={inputStyle} placeholder="e.g. New Arrival" value={form.badge ?? ""}
                onChange={(e) => setForm((p) => ({ ...p, badge: e.target.value }))} />
            </div>
            <div>
              <label style={labelStyle}>Category</label>
              <select style={{ ...inputStyle, cursor: "pointer" }}
                value={form.categorySlug}
                onChange={(e) => {
                  const cat = CATEGORIES.find((c) => c.slug === e.target.value);
                  setForm((p) => ({ ...p, categorySlug: e.target.value, category: cat?.label ?? p.category }));
                }}>
                {CATEGORIES.filter((c) => c.slug !== "all").map((c) => (
                  <option key={c.slug} value={c.slug}>{c.label}</option>
                ))}
              </select>
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Description</label>
              <textarea style={{ ...inputStyle, minHeight: "70px", resize: "vertical", lineHeight: 1.6 }}
                value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} />
            </div>
          </div>

          {/* Specs */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.875rem" }}>
              <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#64748B", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Specifications
              </p>
              <button onClick={() => setForm((p) => ({ ...p, specs: [...p.specs, { label: "", value: "" }] }))}
                style={{
                  display: "flex", alignItems: "center", gap: "0.4rem",
                  padding: "0.4rem 0.875rem", borderRadius: "8px",
                  background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)",
                  color: "#F59E0B", fontSize: "0.78rem", fontWeight: 700, cursor: "pointer",
                }}>
                <Plus size={13} /> Add Row
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {form.specs.map((spec, idx) => (
                <div key={idx} style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr auto",
                  gap: "0.625rem", alignItems: "center",
                  background: "rgba(15,23,42,0.4)", borderRadius: "10px", padding: "0.75rem",
                  border: "1px solid rgba(148,163,184,0.08)",
                }}>
                  <input style={inputStyle} placeholder="Label" value={spec.label}
                    onChange={(e) => setForm((p) => ({ ...p, specs: p.specs.map((s, i) => i === idx ? { ...s, label: e.target.value } : s) }))} />
                  <input style={inputStyle} placeholder="Value" value={spec.value}
                    onChange={(e) => setForm((p) => ({ ...p, specs: p.specs.map((s, i) => i === idx ? { ...s, value: e.target.value } : s) }))} />
                  <button onClick={() => setForm((p) => ({ ...p, specs: p.specs.filter((_, i) => i !== idx) }))}
                    style={{
                      width: "34px", height: "34px", borderRadius: "8px",
                      background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
                      color: "#EF4444", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0,
                    }}>
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          padding: "1.25rem 2rem", flexShrink: 0,
          borderTop: "1px solid rgba(148,163,184,0.1)",
          background: "rgba(15,23,42,0.5)",
          display: "flex", gap: "0.75rem", justifyContent: "flex-end",
        }}>
          <button onClick={onClose} style={{
            padding: "0.7rem 1.5rem", borderRadius: "10px",
            background: "rgba(148,163,184,0.1)", border: "1px solid rgba(148,163,184,0.15)",
            color: "#94A3B8", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer",
          }}>Cancel</button>
          <button onClick={handleAdd} disabled={saving} style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            padding: "0.7rem 1.75rem", borderRadius: "10px",
            background: saving ? "rgba(34,197,94,0.3)" : "linear-gradient(135deg, #22C55E, #16A34A)",
            border: "none", color: "#fff", fontSize: "0.875rem",
            fontWeight: 800, cursor: saving ? "not-allowed" : "pointer",
            boxShadow: saving ? "none" : "0 4px 12px rgba(34,197,94,0.3)",
          }}>
            <Plus size={15} /> {saving ? "Adding…" : "Add Product"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────
   DASHBOARD VIEW
──────────────────────────────────────────────── */
function DashboardView({ onLogout }: { onLogout: () => void }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [addingProduct, setAddingProduct] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const addToast = useCallback((message: string, type: ToastType) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const data = await getProducts();
    setProducts(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const filtered = products.filter((p) => {
    const matchCat = activeCategory === "all" || p.categorySlug === activeCategory;
    const q = search.toLowerCase();
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.id.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product? This cannot be undone.")) return;
    setDeletingId(id);
    const res = await deleteProduct(id);
    setDeletingId(null);
    if (res.success) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      addToast("Product deleted successfully.", "success");
    } else {
      addToast("Failed to delete product.", "error");
    }
  };

  const handleLogout = async () => {
    await logout();
    onLogout();
  };

  const categoryCounts = CATEGORIES.map((cat) => ({
    ...cat,
    count: cat.slug === "all" ? products.length : products.filter((p) => p.categorySlug === cat.slug).length,
  }));

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0F172A",
      fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
      color: "#F8FAFC",
    }}>

      {/* Toast Stack */}
      <div style={{ position: "fixed", top: "1.5rem", right: "1.5rem", zIndex: 99999, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
        {toasts.map((t) => (
          <div key={t.id} style={{
            display: "flex", alignItems: "center", gap: "0.625rem",
            padding: "0.875rem 1.25rem", borderRadius: "12px", minWidth: "280px",
            background: t.type === "success" ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)",
            border: `1px solid ${t.type === "success" ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`,
            color: t.type === "success" ? "#86EFAC" : "#FCA5A5",
            backdropFilter: "blur(12px)", boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
            animation: "slideInRight 0.3s ease",
            fontSize: "0.85rem", fontWeight: 600,
          }}>
            {t.type === "success" ? <CheckCircle size={15} /> : <AlertCircle size={15} />}
            {t.message}
          </div>
        ))}
      </div>

      {/* Header */}
      <header style={{
        background: "rgba(15,23,42,0.95)", backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(148,163,184,0.1)",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{
          maxWidth: "1400px", margin: "0 auto",
          padding: "1rem 2rem",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{
              width: "42px", height: "42px", borderRadius: "12px",
              background: "linear-gradient(135deg, #F59E0B, #D97706)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.25rem", boxShadow: "0 4px 12px rgba(245,158,11,0.3)",
            }}>⚡</div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                <span style={{ fontSize: "1rem", fontWeight: 800, color: "#F8FAFC", letterSpacing: "-0.02em" }}>
                  Rediant Admin
                </span>
                <span style={{
                  fontSize: "0.65rem", fontWeight: 700, padding: "0.2rem 0.5rem",
                  borderRadius: "6px", background: "rgba(245,158,11,0.15)",
                  border: "1px solid rgba(245,158,11,0.3)", color: "#F59E0B",
                  letterSpacing: "0.05em", textTransform: "uppercase",
                }}>
                  v1.0
                </span>
              </div>
              <p style={{ fontSize: "0.72rem", color: "#64748B", marginTop: "0.1rem" }}>
                Product Management Dashboard
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 0.875rem", borderRadius: "20px", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22C55E" }} />
              <span style={{ fontSize: "0.75rem", color: "#86EFAC", fontWeight: 600 }}>Authenticated</span>
            </div>
            <button onClick={handleLogout} style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              padding: "0.5rem 1.125rem", borderRadius: "10px",
              background: "rgba(148,163,184,0.08)", border: "1px solid rgba(148,163,184,0.15)",
              color: "#94A3B8", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer",
              transition: "all 0.2s",
            }}>
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "2.5rem 2rem" }}>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
          {[
            { icon: <Package size={20} />, label: "Total Products", value: products.length, color: "#F59E0B" },
            { icon: <LayoutDashboard size={20} />, label: "Categories", value: CATEGORIES.length - 1, color: "#818CF8" },
            { icon: <Zap size={20} />, label: "With Badge", value: products.filter((p) => p.badge).length, color: "#22C55E" },
            { icon: <Shield size={20} />, label: "Active Session", value: "1", color: "#38BDF8" },
          ].map((stat) => (
            <div key={stat.label} style={{
              background: "rgba(30,41,59,0.8)", border: "1px solid rgba(148,163,184,0.1)",
              borderRadius: "16px", padding: "1.5rem",
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                <div style={{
                  width: "40px", height: "40px", borderRadius: "10px",
                  background: `${stat.color}18`, border: `1px solid ${stat.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center", color: stat.color,
                }}>{stat.icon}</div>
              </div>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "#F8FAFC", lineHeight: 1, marginBottom: "0.375rem" }}>{stat.value}</div>
              <div style={{ fontSize: "0.78rem", color: "#64748B", fontWeight: 500 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div style={{
          background: "rgba(30,41,59,0.8)", border: "1px solid rgba(148,163,184,0.1)",
          borderRadius: "16px", padding: "1.5rem",
          display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap",
          marginBottom: "1.25rem",
        }}>
          {/* Search */}
          <div style={{ position: "relative", flex: "1 1 220px", minWidth: "200px" }}>
            <Search size={15} style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", color: "#64748B", pointerEvents: "none" }} />
            <input
              type="text"
              placeholder="Search products…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%", boxSizing: "border-box",
                background: "rgba(15,23,42,0.6)", border: "1.5px solid rgba(148,163,184,0.15)",
                borderRadius: "10px", padding: "0.65rem 0.875rem 0.65rem 2.5rem",
                color: "#F8FAFC", fontSize: "0.85rem", outline: "none",
              }}
            />
          </div>

          {/* Add Button */}
          <button onClick={() => setAddingProduct(true)} style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            padding: "0.65rem 1.25rem", borderRadius: "10px",
            background: "linear-gradient(135deg, #F59E0B, #D97706)",
            border: "none", color: "#0F172A", fontSize: "0.85rem",
            fontWeight: 800, cursor: "pointer", whiteSpace: "nowrap",
            boxShadow: "0 4px 12px rgba(245,158,11,0.3)",
          }}>
            <Plus size={16} /> Add Product
          </button>
        </div>

        {/* Category Tabs */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
          {categoryCounts.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              style={{
                display: "flex", alignItems: "center", gap: "0.5rem",
                padding: "0.5rem 1rem", borderRadius: "20px",
                border: activeCategory === cat.slug ? "1.5px solid #F59E0B" : "1.5px solid rgba(148,163,184,0.15)",
                background: activeCategory === cat.slug ? "rgba(245,158,11,0.12)" : "rgba(30,41,59,0.6)",
                color: activeCategory === cat.slug ? "#F59E0B" : "#64748B",
                fontSize: "0.78rem", fontWeight: 700, cursor: "pointer", transition: "all 0.2s",
              }}
            >
              {cat.label}
              <span style={{
                padding: "0.1rem 0.5rem", borderRadius: "10px",
                background: activeCategory === cat.slug ? "rgba(245,158,11,0.2)" : "rgba(148,163,184,0.1)",
                fontSize: "0.7rem", fontWeight: 800,
              }}>{cat.count}</span>
            </button>
          ))}
        </div>

        {/* Product Table */}
        <div style={{
          background: "rgba(30,41,59,0.8)", border: "1px solid rgba(148,163,184,0.1)",
          borderRadius: "16px", overflow: "hidden",
        }}>
          {loading ? (
            <div style={{ padding: "4rem", textAlign: "center", color: "#64748B" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>⏳</div>
              Loading products…
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: "4rem", textAlign: "center", color: "#64748B" }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🔍</div>
              No products found
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(148,163,184,0.1)" }}>
                  {["Product", "Category", "Specs", "Badge", "Actions"].map((col) => (
                    <th key={col} style={{
                      padding: "1rem 1.25rem", textAlign: "left",
                      fontSize: "0.68rem", fontWeight: 700, color: "#64748B",
                      letterSpacing: "0.08em", textTransform: "uppercase",
                    }}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((product) => (
                  <Fragment key={product.id}>
                    <tr
                      key={product.id}
                      style={{
                        borderBottom: expandedRow === product.id ? "none" : "1px solid rgba(148,163,184,0.07)",
                        transition: "background 0.15s",
                        background: expandedRow === product.id ? "rgba(245,158,11,0.03)" : "transparent",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(148,163,184,0.04)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = expandedRow === product.id ? "rgba(245,158,11,0.03)" : "transparent"; }}
                    >
                      {/* Product */}
                      <td style={{ padding: "1rem 1.25rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                          <div style={{
                            width: "40px", height: "40px", borderRadius: "10px",
                            background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.15)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: "1.1rem", flexShrink: 0,
                          }}>
                            {product.icon}
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "#F8FAFC" }}>{product.name}</div>
                            <div style={{ fontSize: "0.72rem", color: "#475569", marginTop: "0.1rem", fontFamily: "monospace" }}>{product.id}</div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td style={{ padding: "1rem 1.25rem" }}>
                        <span style={{
                          padding: "0.25rem 0.75rem", borderRadius: "20px",
                          background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)",
                          color: "#A5B4FC", fontSize: "0.75rem", fontWeight: 600, whiteSpace: "nowrap",
                        }}>
                          {product.category}
                        </span>
                      </td>

                      {/* Specs */}
                      <td style={{ padding: "1rem 1.25rem" }}>
                        <button
                          onClick={() => setExpandedRow(expandedRow === product.id ? null : product.id)}
                          style={{
                            display: "flex", alignItems: "center", gap: "0.4rem",
                            background: "rgba(148,163,184,0.08)", border: "1px solid rgba(148,163,184,0.15)",
                            borderRadius: "8px", padding: "0.35rem 0.75rem",
                            color: "#94A3B8", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer",
                          }}
                        >
                          {product.specs.length} rows
                          {expandedRow === product.id ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                        </button>
                      </td>

                      {/* Badge */}
                      <td style={{ padding: "1rem 1.25rem" }}>
                        {product.badge ? (
                          <span style={{
                            padding: "0.2rem 0.625rem", borderRadius: "6px",
                            background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.25)",
                            color: "#FCD34D", fontSize: "0.72rem", fontWeight: 700,
                          }}>
                            {product.badge}
                          </span>
                        ) : (
                          <span style={{ color: "#475569", fontSize: "0.75rem" }}>—</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td style={{ padding: "1rem 1.25rem" }}>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <button
                            onClick={() => setEditingProduct(product)}
                            style={{
                              display: "flex", alignItems: "center", gap: "0.375rem",
                              padding: "0.4rem 0.875rem", borderRadius: "8px",
                              background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)",
                              color: "#A5B4FC", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer",
                            }}
                          >
                            <Edit3 size={13} /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            disabled={deletingId === product.id}
                            style={{
                              display: "flex", alignItems: "center", gap: "0.375rem",
                              padding: "0.4rem 0.75rem", borderRadius: "8px",
                              background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
                              color: "#FCA5A5", fontSize: "0.78rem", fontWeight: 600,
                              cursor: deletingId === product.id ? "not-allowed" : "pointer",
                            }}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expanded specs row */}
                    {expandedRow === product.id && (
                      <tr key={`${product.id}-expanded`}>
                        <td colSpan={5} style={{ padding: "0 1.25rem 1.25rem", background: "rgba(245,158,11,0.02)" }}>
                          <div style={{
                            background: "rgba(15,23,42,0.6)", borderRadius: "12px",
                            padding: "1rem", border: "1px solid rgba(148,163,184,0.1)",
                            display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "0.5rem",
                          }}>
                            {product.specs.map((spec, idx) => (
                              <div key={idx} style={{
                                display: "flex", flexDirection: "column", gap: "0.2rem",
                                background: "rgba(30,41,59,0.8)", borderRadius: "8px",
                                padding: "0.625rem 0.875rem", border: "1px solid rgba(148,163,184,0.08)",
                              }}>
                                <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                                  {spec.label}
                                </span>
                                <span style={{ fontSize: "0.83rem", fontWeight: 600, color: "#CBD5E1" }}>
                                  {spec.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer note */}
        <p style={{ textAlign: "center", marginTop: "2rem", fontSize: "0.75rem", color: "#334155" }}>
          Changes are saved to products.json · Visible on the public site after reload
        </p>
      </main>

      {/* Edit Modal */}
      {editingProduct && (
        <SpecsEditorModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSaved={(updated) => {
            setProducts((prev) => prev.map((p) => p.id === updated.id ? updated : p));
            setEditingProduct(null);
            addToast("Product updated successfully!", "success");
          }}
        />
      )}

      {/* Add Modal */}
      {addingProduct && (
        <AddProductModal
          onClose={() => setAddingProduct(false)}
          onAdded={(newProd) => {
            setProducts((prev) => [...prev, newProd]);
            setAddingProduct(false);
            addToast("Product added successfully!", "success");
          }}
        />
      )}

      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        input::placeholder { color: #475569; }
        textarea::placeholder { color: #475569; }
        select option { background: #1E293B; color: #F8FAFC; }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}

/* ────────────────────────────────────────────────
   ROOT PAGE
──────────────────────────────────────────────── */
export default function AdminPage() {
  const [authState, setAuthState] = useState<"checking" | "unauthenticated" | "authenticated">("checking");

  useEffect(() => {
    checkAuth().then((ok) => setAuthState(ok ? "authenticated" : "unauthenticated"));
  }, []);

  if (authState === "checking") {
    return (
      <div style={{
        minHeight: "100vh", background: "#0F172A",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Inter', system-ui, sans-serif", color: "#64748B",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>⚡</div>
          <p>Checking session…</p>
        </div>
      </div>
    );
  }

  if (authState === "unauthenticated") {
    return <LoginView onSuccess={() => setAuthState("authenticated")} />;
  }

  return <DashboardView onLogout={() => setAuthState("unauthenticated")} />;
}
