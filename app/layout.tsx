import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SITE } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s · ${SITE.name}`,
  },
  description: `${SITE.tagline} ${SITE.subtitle} Independent fan tribute at ${SITE.domain}.`,
  keywords: ["Lionel Messi", "time capsule", "fan tribute", "Messi passport", "messi10"],
  openGraph: {
    title: SITE.title,
    description: SITE.tagline,
    url: SITE.url,
    siteName: SITE.name,
    locale: "en_GB",
    type: "website",
    images: ["/images/hero-stadium.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.tagline,
  },
  icons: {
    icon: "/favicon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#070b14",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="grain" />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
