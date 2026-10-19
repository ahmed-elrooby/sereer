import Home from "./components/Home/Home.jsx";

export const metadata = {
  title: "سرير | sreer — أقرب حضّانة أطفال وعناية مركزة",

  description:
    "منصة سرير | sreer تساعدك في العثور على أقرب حضّانات الأطفال ووحدات العناية المركزة بالمستشفيات، ومعرفة الأسرّة المتاحة والتواصل مع المستشفى والوصول إليها.",

  alternates: {
    canonical: "https://sreer.net/Patient",
  },

  keywords: [
    "سرير",
    "sreer",
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
    siteName: "سرير | sreer",
    title: "سرير | sreer — أقرب حضّانة أطفال وعناية مركزة",
    description:
      "اعثر على أقرب حضّانات الأطفال ووحدات العناية المركزة، وتعرّف على الأسرّة المتاحة بالمستشفيات.",
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