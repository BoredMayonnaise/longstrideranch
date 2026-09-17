import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SiteEffects } from "@/components/SiteEffects";
import { site } from "@/lib/site";
import "./tokens.css";
import "./main.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Boarding, Training & Horse Sales`,
    template: `%s — ${site.name}`,
  },
  description: site.blurb,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/img/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1f3d2f" },
    { media: "(prefers-color-scheme: dark)", color: "#121613" },
  ],
};

/**
 * Runs before first paint: pins the saved theme, and hides `.reveal` blocks so
 * they can fade in. The timer undoes the hiding if the bundle never arrives.
 */
const bootstrap = `
document.documentElement.classList.add('js');
try {
  var t = localStorage.getItem('lsr-theme');
  if (t === 'light' || t === 'dark') document.documentElement.dataset.theme = t;
} catch (e) {}
setTimeout(function () {
  if (!window.__lsrReady) document.documentElement.classList.remove('js');
}, 2500);
`.trim();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootstrap }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <SiteEffects />
      </body>
    </html>
  );
}
