import React from "react";
import Icu from "../components/Icu/Icu.jsx";

export const metadata = {
  title: "العناية المركزة | لوحة المستشفى | سرير",
  description:
    "إدارة ومتابعة وحدات العناية المركزة وتحديث عدد الأسرة المتاحة من خلال لوحة تحكم المستشفى في منصة سرير.",

  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

const Page = () => {
  return <Icu />;
};

export default Page;