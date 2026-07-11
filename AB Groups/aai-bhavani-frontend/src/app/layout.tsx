import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { Toaster } from "react-hot-toast";
import FloatingButtons from "@/components/shared/FloatingButtons";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AAI BHAVANI GROUP | Building Trust. Creating Value.",
    template: "%s | AAI BHAVANI GROUP",
  },
  description:
    "AAI BHAVANI GROUP — Your trusted partner for Property Buy & Sell, Home Loans, Interior Design, and Project Management. 100% Transparent. No Hidden Charges.",
  keywords: [
    "property consultancy",
    "home loan",
    "interior design",
    "Pune real estate",
    "Aai Bhavani",
    "property buy sell",
  ],
  openGraph: {
    title: "AAI BHAVANI GROUP | Building Trust. Creating Value.",
    description:
      "Trusted partner for Property, Loans & Interior Solutions. 1500+ Happy Clients.",
    type: "website",
    locale: "en_IN",
  },
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#0B1F3A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased bg-white">
        <Providers>
          {children}
          <FloatingButtons />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#0B1F3A",
                color: "#fff",
                borderRadius: "12px",
                fontSize: "14px",
                fontFamily: "Inter, sans-serif",
              },
              success: {
                iconTheme: { primary: "#D4AF37", secondary: "#0B1F3A" },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
