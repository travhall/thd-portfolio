import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Footer } from "@/components/layout/site-footer";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { SiteNav } from "@/components/layout/site-nav";
// import Link from "next/link";

const manropeSans = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const nohemi = localFont({
  src: [
    {
      path: "../public/fonts/Nohemi-VF.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-nohemi",
});

export const metadata: Metadata = {
  title: "travishall.design",
  description: "selected design and development work by Travis Hall",
};

const darkMode = {
  colorScheme: "dark light",
  themeColor: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content={darkMode.colorScheme} />
        <meta name="theme-color" content={darkMode.themeColor} />
      </head>
      <body
        className={`${manropeSans.variable} ${nohemi.variable} antialiased relative`}
      >
        <ThemeProvider>
          <ScrollToTop />
          <SiteNav />
          <main className="relative">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
