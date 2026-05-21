"use client";

import { Suspense } from "react";
import CatalogSection from "@/components/sections/CatalogSection";

function ProductsContent() {
  return (
    <div className="min-h-screen" style={{ background: "#F8FAFC" }}>
      {/* Page Hero */}
      <section className="section-white border-b border-slate-200/60 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="type-label mb-3">Full Technical Catalog</p>
            <h1 className="type-h1 mb-4">
              150+ Industrial-Grade Products.{" "}
              <span className="text-amber-500">All Specs. No Gates.</span>
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed">
              Filter by category, material, sizing, and certification. Every data sheet is freely downloadable — no login, no forms.
            </p>
          </div>
        </div>
      </section>
      <CatalogSection />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <ProductsContent />
    </Suspense>
  );
}
