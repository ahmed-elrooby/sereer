import React from "react";

import Home from "./components/Home/Home.jsx";

export const metadata = {
  title: "سرير | أقرب حضّانة وعناية مركزة ليك",
  description:
    "اعرف أقرب حضّانة أطفال أو وحدة عناية مركزة متاحة بالقرب منك، وشوف الأسرة المتاحة وتواصل مع المستشفى واحصل على الاتجاهات بسهولة.",

  keywords: [
    "سرير",
    "أقرب حضانة",
    "حضانات أطفال",
    "عناية مركزة",
    "أقرب عناية مركزة",
    "أسرة المستشفيات",
    "مستشفيات",
    "الرعاية الطبية",
  ],

  openGraph: {
    title: "سرير | أقرب حضّانة وعناية مركزة ليك",
    description:
      "ابحث عن أقرب حضّانة أطفال أو عناية مركزة متاحة بالقرب منك.",
    type: "website",
    locale: "ar_EG",
    siteName: "سرير",
  },

  robots: {
    index: true,
    follow: true,
  },
};

const Page = () => {
  return (
    <>
      <Home />
    </>
  );
};

export default Page;