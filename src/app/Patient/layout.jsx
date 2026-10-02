import Header from "./components/Header.jsx";


export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),

  title: {
    default: "أقرب حضّانة وعناية مركزة | رعاية",
    template: "%s | رعاية",
  },

  description:
    "ابحث عن أقرب حضّانة أطفال أو عناية مركزة متاحة بالقرب منك. اعرف المسافة، وتواصل مع المستشفى، واحصل على الاتجاهات بسهولة.",

  applicationName: "رعاية",

  openGraph: {
    type: "website",
    locale: "ar_EG",
    siteName: "رعاية",
    title: "رعاية | أقرب حضّانة وعناية مركزة",
    description:
      "اعرف أقرب حضّانات الأطفال وأماكن العناية المركزة بالقرب منك.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html >
      <body >
        <Header/>
        {children}</body>
    </html>
  );
}