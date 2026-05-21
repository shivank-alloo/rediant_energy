"use client";

import { useState } from "react";
import { Plus, Check, LayoutGrid, Table } from "lucide-react";
import { Product } from "@/lib/products";
import { useQuoteCart } from "@/context/QuoteCartContext";

interface ProductCardProps {
  product: Product;
  viewMode: "visual" | "datasheet";
}

export default function ProductCard({ product, viewMode }: ProductCardProps) {
  const [flipped, setFlipped] = useState(false);
  const { addItem, removeItem, isInCart } = useQuoteCart();
  const inCart = isInCart(product.id);

  const toggleCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inCart) removeItem(product.id);
    else addItem(product);
  };

  if (viewMode === "datasheet") {
    return (
      <div className="glass-card p-5 flex flex-col gap-3">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{product.icon}</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-white font-medium text-sm">{product.name}</h3>
                {product.badge && (
                  <span className="badge-accent text-[10px]">{product.badge}</span>
                )}
              </div>
              <p className="text-[#64748B] text-xs mt-0.5">{product.category}</p>
            </div>
          </div>
          <button
            onClick={toggleCart}
            className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
              inCart
                ? "bg-[rgba(0,242,254,0.12)] text-[#00F2FE] border border-[rgba(0,242,254,0.3)]"
                : "bg-white/5 text-[#94A3B8] border border-white/10 hover:border-[rgba(0,242,254,0.3)] hover:text-[#00F2FE]"
            }`}
          >
            {inCart ? <Check size={11} /> : <Plus size={11} />}
            {inCart ? "Added" : "Quote"}
          </button>
        </div>

        {/* Spec Table */}
        <div className="border border-white/[0.06] rounded-lg overflow-hidden">
          <table className="w-full text-xs">
            <tbody>
              {product.specs.map((spec, i) => (
                <tr key={spec.label} className={i % 2 === 0 ? "bg-white/[0.02]" : ""}>
                  <td className="text-[#64748B] px-3 py-2 font-medium w-2/5">{spec.label}</td>
                  <td className="text-[#CBD5E1] px-3 py-2">{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Visual / Flip Card Mode
  return (
    <div
      className="flip-card h-72 cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <div className={`flip-card-inner h-full ${flipped ? "flipped" : ""}`}>
        {/* Front */}
        <div className="flip-card-front glass-card p-6 flex flex-col gap-4">
          {/* Badge */}
          {product.badge && (
            <span className="badge-accent self-start">{product.badge}</span>
          )}

          {/* Icon */}
          <div className="w-14 h-14 rounded-xl bg-[rgba(0,242,254,0.08)] border border-[rgba(0,242,254,0.12)] flex items-center justify-center text-3xl">
            {product.icon}
          </div>

          {/* Name & Category */}
          <div className="flex-1">
            <h3 className="text-white font-semibold text-base mb-1">{product.name}</h3>
            <p className="text-[#64748B] text-xs">{product.category}</p>
          </div>

          {/* Description */}
          <p className="text-[#64748B] text-xs leading-relaxed line-clamp-2">
            {product.description}
          </p>

          {/* Hint */}
          <p className="text-[#334155] text-[10px] text-center">Click to view specs →</p>
        </div>

        {/* Back */}
        <div className="flip-card-back glass-card p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-[#00F2FE] font-semibold text-sm">{product.name}</h3>
            <span className="text-[#334155] text-[10px]">Click to flip back</span>
          </div>

          {/* Specs */}
          <div className="flex-1 grid grid-cols-2 gap-1.5 overflow-hidden">
            {product.specs.map((spec) => (
              <div key={spec.label} className="bg-white/[0.03] border border-white/[0.05] rounded-lg px-2.5 py-1.5">
                <div className="text-[#64748B] text-[9px] uppercase tracking-wide">{spec.label}</div>
                <div className="text-[#CBD5E1] text-xs font-medium mt-0.5 truncate">{spec.value}</div>
              </div>
            ))}
          </div>

          {/* Add to Quote */}
          <button
            onClick={toggleCart}
            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
              inCart
                ? "bg-[rgba(0,242,254,0.12)] text-[#00F2FE] border border-[rgba(0,242,254,0.3)]"
                : "btn-accent"
            }`}
          >
            {inCart ? (
              <>
                <Check size={12} />
                Added to Quote Sheet
              </>
            ) : (
              <>
                <Plus size={12} />
                Add to Quote Sheet
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// View Mode Toggle
export function ViewToggle({
  mode,
  onChange,
}: {
  mode: "visual" | "datasheet";
  onChange: (m: "visual" | "datasheet") => void;
}) {
  return (
    <div className="flex items-center gap-1 p-1 bg-white/[0.04] rounded-lg border border-white/[0.06]">
      <button
        onClick={() => onChange("visual")}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
          mode === "visual"
            ? "bg-[rgba(0,242,254,0.12)] text-[#00F2FE]"
            : "text-[#64748B] hover:text-white"
        }`}
      >
        <LayoutGrid size={12} />
        Visual
      </button>
      <button
        onClick={() => onChange("datasheet")}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
          mode === "datasheet"
            ? "bg-[rgba(0,242,254,0.12)] text-[#00F2FE]"
            : "text-[#64748B] hover:text-white"
        }`}
      >
        <Table size={12} />
        Data Sheet
      </button>
    </div>
  );
}
