import React from "react";
import Profile from "../components/Profile/Profile.jsx";

export const metadata = {
  title: "الملف الشخصي | لوحة المستشفى | سرير",
  description:
    "إدارة بيانات الملف الشخصي ومعلومات حساب المستشفى من خلال منصة سرير.",

  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

const Page = () => {
  return <Profile />;
};

export default Page;