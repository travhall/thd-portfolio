import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { PageBgProvider } from "@/components/layout/page-bg-provider";
import { Footer } from "@/components/layout/site-footer";
import { SiteNav } from "@/components/layout/site-nav";
import { Logo } from "@/components/layout/logo";
import { getAllCaseStudies } from "@/data/case-studies";
import { cn } from "@/lib/utils";
import { WebSiteJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";

const { siteName, url, descriptions, ogImage } = siteConfig;

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
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: descriptions.site,
  metadataBase: new URL(url),
  openGraph: {
    title: siteName,
    description: descriptions.site,
    url,
    siteName,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: ogImage.default,
        width: ogImage.width,
        height: ogImage.height,
        alt: `${siteName} — ${descriptions.site}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: descriptions.site,
    images: [ogImage.default],
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
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={cn(
          manropeSans.variable,
          nohemi.variable,
          "antialiased relative min-h-screen font-sans"
        )}
      >
        <WebSiteJsonLd />
        <ThemeProvider>
          <PageBgProvider>
            <a
              href="#main-content"
              className="skip-nav"
            >
              Skip to main content
            </a>
            <Logo />
            <SiteNav studies={navStudies} />
            <main id="main-content" className="relative">{children}</main>
            <Footer />
          </PageBgProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
