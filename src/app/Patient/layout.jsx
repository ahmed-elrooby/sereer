import Script from "next/script";
import PatientContext from "../providers/PatientContext.jsx";

import Footer from "./components/Footer/Footer.jsx";
import Header from "./components/Header.jsx";

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "سرير Sreer",
  alternateName: ["سرير", "Sreer"],
  url: "https://sreer.net/",
  inLanguage: "ar-EG",
  description:
    "منصة تساعد في العثور على أقرب حضّانات الأطفال ووحدات العناية المركزة ومعرفة الأسرة المتاحة بالمستشفيات.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <Script
          id="website-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
        >
          {JSON.stringify(websiteSchema)}
        </Script>

        <PatientContext>
          <Header />
          {children}
          <Footer />
        </PatientContext>
      </body>
    </html>
  );
}