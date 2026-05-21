"use client";

import { X, Trash2, Send, ShoppingCart, FileText } from "lucide-react";
import { useQuoteCart } from "@/context/QuoteCartContext";
import { useState } from "react";

export default function QuoteCartDrawer() {
  const { items, removeItem, updateQty, clearCart, totalCount, isOpen, setIsOpen } = useQuoteCart();
  const [form, setForm] = useState({ name: "", email: "", phone: "", specs: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#0F172A]/50 backdrop-blur-sm z-[250] anim-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div className={`rfq-drawer ${isOpen ? "open" : ""}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center">
              <ShoppingCart size={16} className="text-amber-600" />
            </div>
            <div>
              <h2 className="font-bold text-[#0F172A] text-base">RFQ List</h2>
              <p className="text-slate-400 text-xs">{totalCount} item{totalCount !== 1 ? "s" : ""} selected</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-[#0F172A] hover:bg-slate-100 transition-all duration-150"
          >
            <X size={17} />
          </button>
        </div>

        {/* SLA Callout */}
        <div className="mx-6 my-3 px-4 py-3 bg-amber-50 border border-amber-100 rounded-xl">
          <p className="text-xs text-amber-800 leading-relaxed">
            <strong>24-Hour SLA:</strong> Our corporate engineering division will compile and deliver your comprehensive technical quotation within 24 hours.
          </p>
        </div>

        {submitted ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
              <Send size={24} className="text-emerald-600" />
            </div>
            <div>
              <h3 className="font-bold text-[#0F172A] text-lg mb-1">RFQ Submitted!</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Our engineering team will review your requirements and send a detailed quote to <strong>{form.email}</strong> within 24 hours.
              </p>
            </div>
            <button
              onClick={() => { setSubmitted(false); clearCart(); setIsOpen(false); }}
              className="btn-amber px-6 py-3 text-sm mt-2"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            {/* Product List */}
            <div className="flex-1 overflow-y-auto px-6 py-3 space-y-2.5">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 gap-3 text-center">
                  <ShoppingCart size={28} className="text-slate-200" />
                  <p className="text-slate-400 text-sm">Your RFQ list is empty.</p>
                  <p className="text-slate-300 text-xs">Browse products and click &quot;Add to RFQ&quot;</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.product.id} className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <span className="text-xl mt-0.5 shrink-0">{item.product.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#0F172A] text-sm font-semibold truncate">{item.product.name}</p>
                      <p className="text-slate-400 text-xs">{item.product.category}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-slate-500 text-xs">Qty:</span>
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => updateQty(item.product.id, Math.max(1, item.qty - 1))}
                            className="w-7 h-7 flex items-center justify-center text-slate-500 hover:bg-slate-100 text-sm font-bold"
                          >−</button>
                          <span className="px-2 text-[#0F172A] text-xs font-bold">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.product.id, item.qty + 1)}
                            className="w-7 h-7 flex items-center justify-center text-slate-500 hover:bg-slate-100 text-sm font-bold"
                          >+</button>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="p-1.5 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all duration-150"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* 4-Field RFQ Form */}
            {items.length > 0 && (
              <div className="border-t border-slate-100 px-6 py-5">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-bold text-[#0F172A] flex items-center gap-1.5">
                    <FileText size={14} className="text-amber-500" />
                    Submit Inquiry
                  </p>
                  <button onClick={clearCart} className="text-xs text-red-400 hover:text-red-600">
                    Clear all
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    required
                    type="text"
                    placeholder="Full Name *"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="form-input text-sm py-3"
                  />
                  <input
                    required
                    type="email"
                    placeholder="Corporate Email *"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="form-input text-sm py-3"
                  />
                  <input
                    required
                    type="tel"
                    placeholder="Mobile Number *"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="form-input text-sm py-3"
                  />
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:border-amber-300 transition-colors duration-200 cursor-pointer">
                    <FileText size={18} className="mx-auto text-slate-300 mb-1.5" />
                    <p className="text-xs text-slate-400">
                      Upload Project Spec File{" "}
                      <span className="text-amber-500 font-medium hover:underline">Browse</span>
                    </p>
                    <p className="text-[10px] text-slate-300 mt-0.5">PDF, Excel, DXF · Max 10MB</p>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-amber w-full py-3.5 text-sm"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Submitting…
                      </span>
                    ) : (
                      <><Send size={14} /> Submit RFQ — {totalCount} Products</>
                    )}
                  </button>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
