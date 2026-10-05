import PatientContext from "../providers/PatientContext.jsx";

import Footer from "./components/Footer/Footer.jsx";
import Header from "./components/Header.jsx";

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://sereer.vercel.app"
  ),

  title: {
    default: "سرير | أقرب رعاية ليك",
    template: "%s | سرير",
  },

  description:
    "سرير يساعدك في العثور على أقرب حضّانة أطفال أو وحدة عناية مركزة متاحة بالقرب منك، مع معرفة الأسرة المتاحة والتواصل مع المستشفى والحصول على الاتجاهات بسهولة.",

  applicationName: "سرير",

  keywords: [
    "سرير",
    "حضّانة أطفال",
    "حضانات أطفال",
    "عناية مركزة",
    "سرير حضانة",
    "سرير عناية مركزة",
    "مستشفيات",
    "الرعاية الطبية",
  ],

  openGraph: {
    type: "website",
    locale: "ar_EG",
    siteName: "سرير",
    title: "سرير | أقرب رعاية ليك",
    description:
      "اعرف أقرب حضّانات الأطفال ووحدات العناية المركزة المتاحة بالقرب منك.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <PatientContext>
          <Header />

          {children}

          <Footer />
        </PatientContext>
      </body>
    </html>
  );
}