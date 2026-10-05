import React from "react";

import ResultsClient from "../../components/ResultsClient/ResultsClient.jsx";

export const metadata = {
  title: "النتائج | سرير",
  description:
    "اعرف أقرب الحضّانات أو وحدات العناية المركزة المتاحة بالقرب منك من خلال منصة سرير.",

  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

const Page = () => {
  return <ResultsClient />;
};

export default Page;