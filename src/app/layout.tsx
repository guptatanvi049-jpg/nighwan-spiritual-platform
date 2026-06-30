import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Phone, Mail } from "lucide-react";
import { UserContextProvider } from "@/context/UserContext";

import FloatingContactBar from "@/components/FloatingContactBar";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Nighwan Technology | Connecting Devotion with Technology",
  description: "Book Trusted Pandits, Explore Ancient Temples, generate AI Kundli, watch Live Darshan streams, and participate in Vedic Pujas digitally with Nighwan Technology Pvt. Ltd.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#faf6ee] text-[#1e1915]">
        <UserContextProvider>
          {children}
        </UserContextProvider>

        <FloatingContactBar />
      </body>
    </html>
  );
}
