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

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),

  title: {
    default: "سرير | أقرب رعاية ليك",
    template: "%s | سرير",
  },

  description:
    "سرير منصة تساعدك في العثور على أقرب حضّانة أطفال أو وحدة عناية مركزة متاحة بالقرب منك، ومعرفة الأسرة المتاحة والتواصل مع المستشفى بسهولة.",

  applicationName: "سرير",

  keywords: [
    "سرير",
    "حضّانة أطفال",
    "حضانات أطفال",
    "عناية مركزة",
    "أقرب حضانة",
    "أقرب عناية مركزة",
    "أسرة المستشفيات",
    "المستشفيات",
    "الرعاية الطبية",
  ],

  authors: [
    {
      name: "Main Tech",
    },
  ],

  creator: "Main Tech",
  publisher: "Main Tech",

  openGraph: {
    type: "website",
    locale: "ar_EG",
    siteName: "سرير",
    title: "سرير | أقرب رعاية ليك",
    description:
      "اعرف أقرب حضّانة أطفال أو وحدة عناية مركزة متاحة بالقرب منك، وشوف الأسرة المتاحة وتواصل مع المستشفى بسهولة.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <QueryProvider>
          <Auth>{children}</Auth>
        </QueryProvider>

        <Toaster />
      </body>
    </html>
  );
}