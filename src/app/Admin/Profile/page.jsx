import React from "react";
import Profile from "../components/Profile/Profile.jsx";

export const metadata = {
  title: "الملف الشخصي | لوحة تحكم الإدارة | سرير",
  description:
    "إدارة بيانات الملف الشخصي لحساب مدير منصة سرير.",

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