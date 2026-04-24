import type { Metadata } from "next";
import { DM_Sans, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

// 1. Konfigūruojame pagrindinį šriftą
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "500", "600", "700"],
  variable: "--font-dm-sans",
});

// 2. Konfigūruojame antraščių šriftą
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-bricolage",
});

export const metadata: Metadata = {
  title: "Weather Now",
  description: "Frontend Mentor Weather Challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`
          ${dmSans.variable} 
          ${bricolage.variable} 
          antialiased 
          font-sans 
          bg-brand-dark 
          text-brand-white 
          min-h-full
        `}
      >
        {children}
      </body>
    </html>
  );
}
