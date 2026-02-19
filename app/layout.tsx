import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Footer } from "@/components/layout/site-footer";
import { SiteNav } from "@/components/layout/site-nav";
import { Logo } from "@/components/layout/logo";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { getAllCaseStudies } from "@/data/case-studies";
import { cn } from "@/lib/utils";

const manropeSans = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const nohemi = localFont({
  src: "../public/fonts/Nohemi-VF.woff2",
  variable: "--font-nohemi",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5f5" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  colorScheme: "dark light",
};

export const metadata: Metadata = {
  title: {
    default: "travishall.design",
    template: "%s | travishall.design",
  },
  description: "Selected design and development work by Travis Hall",
  metadataBase: new URL("https://travishall.design"),
  openGraph: {
    title: "travishall.design",
    description: "Selected design and development work by Travis Hall",
    url: "https://travishall.design",
    siteName: "travishall.design",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "travishall.design",
    description: "Selected design and development work by Travis Hall",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allStudies = getAllCaseStudies();
  const navStudies = allStudies.map(({ id, title }) => ({ id, title }));

  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth" data-scroll-behavior="smooth">
      <body
        className={cn(
          manropeSans.variable,
          nohemi.variable,
          "antialiased relative min-h-screen font-sans"
        )}
      >
        <ThemeProvider>
          <SmoothScroll>
            <Logo />
            <SiteNav studies={navStudies} />
            <main className="relative">{children}</main>
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
