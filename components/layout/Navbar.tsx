"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu, X, ChevronDown, Phone, Mail, ShoppingCart, Zap,
  Cpu, Cable, Sun, Lightbulb, Layers, Box
} from "lucide-react";
import { useQuoteCart } from "@/context/QuoteCartContext";

const MEGA_MENU_ITEMS = [
  {
    slug: "earthing",
    icon: Zap,
    label: "Earthing & Grounding",
    sub: ["Chemical Electrodes", "GI Strips & Rods", "Pit Chambers", "Lightning Arresters"],
  },
  {
    slug: "cable-gland",
    icon: Cpu,
    label: "Industrial Cable Glands",
    sub: ["Single Compression Brass", "Double Compression Brass", "Nylon PG Glands", "Braco & PG Metal"],
  },
  {
    slug: "cable-tray",
    icon: Layers,
    label: "Cable Management Trays",
    sub: ["GI Perforated Trays", "Ladder-Type Trays", "Aluminium Trays", "Couplers & Accessories"],
  },
  {
    slug: "cables",
    icon: Cable,
    label: "Cables & Wires",
    sub: ["Armoured SWA Power Cable", "FR PVC Copper Wire", "XLPE Insulated Cable", "Flexible Multi-core"],
  },
  {
    slug: "led",
    icon: Lightbulb,
    label: "LED Industrial Lighting",
    sub: ["High-Lumen Street Lights", "Industrial Floodlights", "High-Bay Fittings", "Panel Lights"],
  },
  {
    slug: "solar",
    icon: Sun,
    label: "Commercial Solar Systems",
    sub: ["Mono PERC Arrays", "On-Grid Inverters", "Mounting Structures", "Accessories"],
  },
];

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const pathname = usePathname();
  const { totalCount, setIsOpen } = useQuoteCart();
  const megaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mega menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      {/* ── Top Contact Strip ──────────────────────────────── */}
      <div className="bg-[#0F172A] text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <a href="tel:+919324109605" className="flex items-center gap-1.5 hover:text-white transition-colors duration-150">
              <Phone size={11} />
              +91 93241 09605
            </a>
            <span className="text-slate-700 hidden sm:block">|</span>
            <a href="mailto:sales@rediantenergy.com" className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors duration-150">
              <Mail size={11} />
              sales@rediantenergy.com
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-slate-600">Manufacturing in India · Pan-India Supply</span>
            <span className="badge badge-amber">ISO Certified</span>
          </div>
        </div>
      </div>

      {/* ── Main Nav ─────────────────────────────────────── */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass-light shadow-[0_2px_20px_rgba(0,0,0,0.08)]"
            : "bg-white border-b border-slate-200/60"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-[72px] gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <div className="w-9 h-9 rounded-xl bg-[#0F172A] flex items-center justify-center group-hover:bg-[#1E293B] transition-colors duration-200">
                <Zap size={17} className="text-[#F59E0B]" />
              </div>
              <div className="leading-tight">
                <div className="font-display font-800 text-[0.95rem] font-black tracking-tight text-[#0F172A]">
                  REDIANT<span className="text-[#F59E0B]">ENERGY</span>
                </div>
                <div className="text-[9px] text-slate-400 font-medium tracking-widest uppercase leading-none mt-0.5">
                  Industrial Solutions
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1.5 flex-1">
              {/* Products Mega Menu Trigger */}
              <div className="relative mega-menu-trigger" ref={megaRef}>
                <button
                  onClick={() => setMegaOpen(!megaOpen)}
                  className={`btn-ghost flex items-center gap-1 ${pathname === "/products" ? "text-[#0F172A] bg-slate-100" : ""}`}
                >
                  Products
                  <ChevronDown size={14} className={`transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Mega Menu */}
                {megaOpen && (
                  <div className="mega-menu anim-scale-in">
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                        <div>
                          <p className="type-label">Product Catalog</p>
                          <p className="text-sm text-slate-600 mt-0.5">150+ industrial-grade products across 6 categories</p>
                        </div>
                        <Link
                          href="/products"
                          onClick={() => setMegaOpen(false)}
                          className="btn-amber text-xs px-4 py-2"
                        >
                          Full Catalog →
                        </Link>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {MEGA_MENU_ITEMS.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.slug}
                              href={`/products?cat=${item.slug}`}
                              onClick={() => setMegaOpen(false)}
                              className="group p-3 rounded-xl border border-transparent hover:border-slate-200 hover:bg-slate-50 transition-all duration-200"
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center group-hover:bg-amber-100 transition-colors duration-200">
                                  <Icon size={13} className="text-amber-600" />
                                </div>
                                <span className="text-xs font-700 font-semibold text-[#0F172A] leading-tight">
                                  {item.label}
                                </span>
                              </div>
                              <ul className="space-y-0.5">
                                {item.sub.map((s) => (
                                  <li key={s} className="text-[11px] text-slate-500 group-hover:text-slate-600 transition-colors">
                                    · {s}
                                  </li>
                                ))}
                              </ul>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`btn-ghost ${pathname === link.href ? "text-[#0F172A] bg-slate-100" : ""}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2 ml-auto lg:ml-0">
              {/* RFQ Cart Badge */}
              <button
                onClick={() => setIsOpen(true)}
                className="relative flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-[#0F172A] hover:bg-slate-50 transition-all duration-200 min-h-[40px]"
              >
                <ShoppingCart size={16} />
                <span className="hidden sm:block text-sm font-medium">RFQ List</span>
                {totalCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#F59E0B] text-[#0F172A] text-[10px] font-black flex items-center justify-center shadow-sm">
                    {totalCount}
                  </span>
                )}
              </button>

              {/* RFQ CTA */}
              <Link
                href="/contact"
                className="btn-amber text-sm px-5 py-2.5 min-h-[40px] hidden sm:inline-flex"
              >
                Get Quote
              </Link>

              {/* Mobile Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-[#0F172A] hover:bg-slate-100 transition-all duration-200"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden border-t border-slate-100 bg-white transition-all duration-300 overflow-hidden ${
            mobileOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="px-4 py-4 space-y-1">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">Products</div>
            {MEGA_MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.slug}
                  href={`/products?cat=${item.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-[#0F172A] transition-all duration-150"
                >
                  <Icon size={15} className="text-amber-500 shrink-0" />
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-2 border-t border-slate-100 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-[#0F172A] transition-all duration-150"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="btn-amber w-full mt-2"
              >
                Request Quote
              </Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
