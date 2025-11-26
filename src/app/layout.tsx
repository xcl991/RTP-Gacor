import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron, Rajdhani, Teko, Russo_One, Exo_2, Chakra_Petch, Black_Ops_One } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Font untuk layout Default - Futuristic & Tech
const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

// Font untuk layout Classic - Bold & Strong
const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Font untuk layout Futuristic - Tall & Modern
const teko = Teko({
  variable: "--font-teko",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Font untuk layout Neon - Gaming & Bold
const russoOne = Russo_One({
  variable: "--font-russo",
  subsets: ["latin"],
  weight: "400",
});

// Font untuk layout Elegant - Premium & Stylish
const exo2 = Exo_2({
  variable: "--font-exo2",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

// Font untuk layout Cyber - Cyberpunk Style
const chakraPetch = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Font untuk layout Minimal - Clean & Bold
const blackOpsOne = Black_Ops_One({
  variable: "--font-blackops",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "RTP Gacor - Live RTP Generator",
  description: "Generate gambar RTP Live untuk website slot Anda. Pilih website, atur jumlah game, pilih waktu, background, dan style yang sesuai.",
  keywords: ["RTP", "Slot", "Pragmatic Play", "PG Soft", "RTP Live", "Generator", "Gacor"],
  authors: [{ name: "RTP Gacor Team" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "RTP Gacor - Live RTP Generator",
    description: "Generate gambar RTP Live untuk website slot Anda",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RTP Gacor - Live RTP Generator",
    description: "Generate gambar RTP Live untuk website slot Anda",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} ${rajdhani.variable} ${teko.variable} ${russoOne.variable} ${exo2.variable} ${chakraPetch.variable} ${blackOpsOne.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
