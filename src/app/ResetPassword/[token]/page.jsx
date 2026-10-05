import React from "react";
import ResetPassword from "../../components/ResetPassword/ResetPassword.jsx";

export const metadata = {
  title: "إعادة تعيين كلمة المرور | سرير",
  description:
    "إعادة تعيين كلمة المرور واستعادة الوصول إلى حسابك في منصة سرير.",

  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

const Page = () => {
  return <ResetPassword />;
};

export default Page;