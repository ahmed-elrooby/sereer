import React from "react";
import Incubators from "../components/Incubators/Incubators.jsx";

export const metadata = {
  title: "الحضّانات | لوحة المستشفى | سرير",
  description:
    "إدارة ومتابعة وحدات الحضّانات وتحديث عدد الأسرة المتاحة من خلال لوحة تحكم المستشفى في منصة سرير.",

  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

const Page = () => {
  return <Incubators />;
};

export default Page;