import Facility from "../components/Facility/Facility.jsx";

export const metadata = {
  title: "لوحة تحكم الإدارة | سرير",
  description:
    "لوحة تحكم إدارة منصة سرير لإدارة المستشفيات والوحدات الطبية ومتابعة توافر الأسرة.",

  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

const Page = () => {
  return <Facility />;
};

export default Page;