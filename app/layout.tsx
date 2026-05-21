import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { QuoteCartProvider } from "@/context/QuoteCartContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import QuoteCartDrawer from "@/components/products/QuoteCartDrawer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rediant Energy — ISO-Certified Industrial Energy Infrastructure",
  description:
    "ISO-Certified manufacturer & supplier of earthing systems, cable glands, cable trays, industrial LED lighting, armoured cables, and solar systems. Mumbai, India.",
  keywords:
    "earthing electrode, cable gland, cable tray, industrial LED, armoured cables, solar panels, Mumbai manufacturer, IS 3043, BS EN 61537",
  openGraph: {
    title: "Rediant Energy — Certified Industrial Energy Infrastructure",
    description:
      "ISO-Certified manufacturing, CPRI-Tested components, and BIS-Compliant materials engineered to international industrial standards.",
    url: "https://rediantenergy.com",
    siteName: "Rediant Energy",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body>
        <QuoteCartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <QuoteCartDrawer />
        </QuoteCartProvider>
      </body>
    </html>
  );
}
