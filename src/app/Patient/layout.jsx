import PatientContext from "../providers/PatientContext.jsx";

import Footer from "./components/Footer/Footer.jsx";
import Header from "./components/Header.jsx";

export const metadata = {
  metadataBase: new URL("https://sreer.net"),

  title: {
    default: "سرير Sreer | أقرب حضانة أطفال وعناية مركزة",
    template: "%s | سرير Sreer",
  },

  description:
    "سرير Sreer منصة تساعدك في العثور على أقرب حضانة أطفال أو وحدة عناية مركزة متاحة، ومعرفة الأسرة المتوفرة والتواصل مع المستشفيات والوصول إليها بسهولة.",

  applicationName: "سرير Sreer",

  keywords: [
    "سرير",
    "Sreer",
    "أقرب حضانة أطفال",
    "حضانات أطفال",
    "حضانة أطفال متاحة",
    "أقرب عناية مركزة",
    "أسرة العناية المركزة",
    "أسرة المستشفيات المتاحة",
    "مستشفيات",
    "الرعاية الطبية",
  ],

  alternates: {
    canonical: "/Patient",
  },

  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: "https://sreer.net/Patient",
    siteName: "سرير Sreer",
    title: "سرير Sreer | أقرب حضانة أطفال وعناية مركزة",
    description:
      "اعرف أقرب حضانات الأطفال ووحدات العناية المركزة المتاحة، وتعرّف على الأسرة المتوفرة وتواصل مع المستشفى.",
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