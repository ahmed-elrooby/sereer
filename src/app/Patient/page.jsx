import Home from "./components/Home/Home.jsx";

export const metadata = {
  metadataBase: new URL("https://sreer.net"),

  title: "سرير | أقرب حضّانة أطفال وعناية مركزة بالمستشفيات",

  description:
    "ابحث عن أقرب حضّانات الأطفال ووحدات العناية المركزة بالمستشفيات عبر منصة سرير. تعرّف على الأسرة المتاحة، وتواصل مع المستشفى، واحصل على الاتجاهات.",

  alternates: {
    canonical: "https://sreer.net/Patient",
  },

  keywords: [
    "سرير",
    "Sreer",
    "أقرب حضّانة أطفال",
    "حضّانات أطفال بالمستشفيات",
    "أماكن حضّانات الأطفال",
    "أقرب وحدة عناية مركزة",
    "أسرة عناية مركزة متاحة",
    "المستشفيات القريبة",
  ],

  openGraph: {
    title: "سرير | ابحث عن أقرب حضّانة أطفال وعناية مركزة",
    description:
      "اعثر على المستشفيات القريبة التي توفر حضّانات أطفال ووحدات عناية مركزة، وتعرّف على الأسرة المتاحة وبيانات التواصل.",
    url: "https://sreer.net/Patient",
    siteName: "سرير",
    type: "website",
    locale: "ar_EG",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <Home />;
}