
import Home from "./components/Home/Home.jsx";

export const metadata = {
  metadataBase: new URL("https://sreer.net"),

  title: "سرير | اعرف أقرب حضّانة وعناية مركزة",
  description:
    "منصة سرير تساعدك في الوصول إلى أقرب حضّانات الأطفال ووحدات العناية المركزة بالمستشفيات، ومعرفة الأسرة المتاحة والتواصل مع المستشفى والحصول على الاتجاهات.",

  alternates: {
    canonical: "/Patient",
  },

  keywords: [
    "سرير",
    "Sreer",
    "أقرب حضانة أطفال",
    "حضانات أطفال في المستشفيات",
    "أقرب عناية مركزة",
    "أسرة العناية المركزة",
    "الأسرة المتاحة بالمستشفيات",
    "البحث عن مستشفى",
  ],

  openGraph: {
    title: "سرير | أقرب حضّانة وعناية مركزة",
    description:
      "اعرف أقرب حضّانات الأطفال ووحدات العناية المركزة، وتحقق من الأسرة المتاحة وتواصل مع المستشفى.",
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
