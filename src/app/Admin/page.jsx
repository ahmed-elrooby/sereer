import React from "react";

import Cards from "./components/utils/Home/Cards.jsx";
import Intro from "./components/utils/Home/Intro.jsx";
import Table from "./components/utils/Home/Table.jsx";
import StatusPlatform from "./components/utils/Home/StatusPlatform.jsx";

export const metadata = {
  title: "لوحة التحكم | سرير",
  description:
    "لوحة التحكم الرئيسية لإدارة ومتابعة منصة سرير للرعاية الطبية وتوافر الأسرة.",

  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

const Page = () => {
  return (
    <>
      <Intro />

      <Cards />

      <div className="mt-8 grid grid-cols-1 gap-5 md:mt-14 md:grid-cols-3">
        <Table />
        <StatusPlatform />
      </div>
    </>
  );
};

export default Page;