
import Home from "./components/Home/Home.jsx";

export const metadata = {
  title: "سرير Sreer | أقرب حضّانة أطفال وعناية مركزة",

  description:
    "منصة سرير Sreer تساعدك في العثور على أقرب حضّانات الأطفال ووحدات العناية المركزة بالمستشفيات. تعرّف على الأسرّة المتاحة، وتواصل مع المستشفى، واحصل على الاتجاهات.",

  alternates: {
    canonical: "https://sreer.net/Patient",
  },

  keywords: [
    "سرير",
    "Sreer",
    "sreer.net",
    "منصة سرير",
    "أقرب حضّانة أطفال",
    "حضّانات حديثي الولادة",
    "حضّانات أطفال بالمستشفيات",
    "أقرب عناية مركزة",
    "أسرة عناية مركزة متاحة",
    "المستشفيات القريبة",
    "NICU",
    "ICU",
  ],

  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: "https://sreer.net/Patient",
    siteName: "سرير Sreer",
    title: "سرير Sreer | أقرب رعاية ليك",
    description:
      "ابحث عن أقرب حضّانات الأطفال ووحدات العناية المركزة، وتعرّف على الأسرّة المتاحة بالمستشفيات.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "سرير Sreer - أقرب رعاية ليك",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export default function Page() {
  return <Home />;
}
