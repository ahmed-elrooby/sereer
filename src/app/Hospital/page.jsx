import React from "react";

import Hero from "./components/Utils/Home/Hero.jsx";
import Header from "./components/Utils/Home/Header.jsx";
import Serrer from "./components/Utils/Home/Serrer.jsx";

export const metadata = {
  title: "سرير | أقرب رعاية ليك",
  description:
    "سرير يساعدك في العثور على أقرب حضّانة أطفال أو وحدة عناية مركزة متاحة بالقرب منك، مع معرفة الأسرة المتاحة والوصول إلى المستشفى بسهولة.",

  keywords: [
    "سرير",
    "حضانة أطفال",
    "حضانات أطفال",
    "عناية مركزة",
    "سرير حضانة",
    "سرير عناية مركزة",
    "مستشفيات",
    "الرعاية الطبية",
  ],

  openGraph: {
    title: "سرير | أقرب رعاية ليك",
    description:
      "اعرف أقرب حضّانة أطفال أو عناية مركزة متاحة ليك، وشوف الأسرة المتاحة والوصول للمستشفى بسهولة.",
    type: "website",
    locale: "ar_EG",
    siteName: "سرير",
  },

  twitter: {
    card: "summary_large_image",
    title: "سرير | أقرب رعاية ليك",
    description:
      "اعرف أقرب حضّانة أطفال أو عناية مركزة متاحة ليك.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

const Page = () => {
  return (
    <>
      <Hero />
      <Header />
      <Serrer />
    </>
  );
};

export default Page;