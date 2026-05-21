import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";

export default function CTAStrip() {
  return (
    <section className="section-navy py-16 relative overflow-hidden">
      {/* Subtle structural overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cta-dots" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#fff" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-dots)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left">
            <div className="badge badge-amber mb-4">24-Hour Quote SLA</div>
            <h2 className="type-h2 text-white mb-3">
              Ready to Spec Your Next Project?
            </h2>
            <p className="text-slate-400 text-base max-w-xl leading-relaxed">
              Our corporate engineering division will compile and deliver your comprehensive technical quotation within 24 hours — with COC documentation and applicable IS/IEC certifications.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/contact" className="btn-amber px-8 py-4 text-[15px] whitespace-nowrap">
              Request Technical Quotation
              <ArrowRight size={16} />
            </Link>
            <a
              href="tel:+919324109605"
              className="btn-outline border-slate-600 text-slate-300 hover:text-white hover:border-slate-400 hover:bg-slate-800 px-8 py-4 text-[15px] whitespace-nowrap"
            >
              <Phone size={15} />
              +91 93241 09605
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
