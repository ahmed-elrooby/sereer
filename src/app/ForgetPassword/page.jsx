import React from "react";
import Forget from "../components/Forget/Forget.jsx";

export const metadata = {
  title: "نسيت كلمة المرور | سرير",
  description:
    "استعادة الوصول إلى حسابك في منصة سرير من خلال إعادة تعيين كلمة المرور.",

  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

const Page = () => {
  return <Forget />;
};

export default Page;