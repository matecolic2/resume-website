import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mate Colic | CV Website",
  description: "Dark theme CV website with About Me, Projects, and Contact sections.",
  openGraph: {
    title: "Mate Colic | CV Website",
    description: "Dark theme CV website with About Me, Projects, and Contact sections.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#0a0e16",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
