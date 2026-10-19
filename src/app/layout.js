
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import QueryProvider from "./providers/Query.jsx";
import Auth from "./providers/Auth.jsx";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://sreer.net";

export const metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "سرير Sreer | أقرب رعاية ليك",
    template: "%s | سرير Sreer",
  },

  description:
    "منصة سرير Sreer تساعدك في الوصول إلى حضّانات الأطفال ووحدات العناية المركزة بالمستشفيات القريبة، ومعرفة الأسرّة المتاحة وطرق التواصل.",

  applicationName: "سرير Sreer",

  keywords: [
    "سرير",
    "Sreer",
    "sreer.net",
    "منصة سرير",
    "حضانات الأطفال",
    "حضانات حديثي الولادة",
    "عناية مركزة",
    "أقرب حضانة",
    "أقرب عناية مركزة",
    "أسرة المستشفيات المتاحة",
    "المستشفيات القريبة",
    "NICU",
    "ICU",
  ],

  authors: [{ name: "Main Tech" }],
  creator: "Main Tech",
  publisher: "سرير Sreer",

  openGraph: {
    type: "website",
    locale: "ar_EG",
    siteName: "سرير Sreer",
    title: "سرير Sreer | أقرب رعاية ليك",
    description:
      "اعرف أقرب حضّانات الأطفال ووحدات العناية المركزة، وتعرّف على الأسرّة المتاحة وطرق التواصل مع المستشفيات.",
  },

  twitter: {
    card: "summary",
    title: "سرير Sreer | أقرب رعاية ليك",
    description:
      "منصة سرير للوصول إلى الحضّانات ووحدات العناية المركزة بالمستشفيات القريبة.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "سرير",
              alternateName: ["Sreer", "سرير Sreer"],
              url: siteUrl,
              inLanguage: "ar-EG",
            }),
          }}
        />
      </head>

      <body>
        <QueryProvider>
          <Auth>{children}</Auth>
        </QueryProvider>

        <Toaster />
      </body>
    </html>
  );
}
