import React from "react";
import Login from "./components/Login/Login.jsx";

export const metadata = {
  title: "تسجيل الدخول | سرير",
  description:
    "تسجيل الدخول إلى حسابك للوصول إلى منصة سرير وإدارة خدمات الرعاية الطبية.",

  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

const Page = () => {
  return <Login />;
};

export default Page;