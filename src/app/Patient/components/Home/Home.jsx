"use client";

import { useRouter } from "next/navigation";

import {
  FaBedPulse,
  FaHeartPulse,
  FaArrowLeft,
} from "react-icons/fa6";

const Home = () => {
  const router = useRouter();

  const handleNavigate = (type) => {
    router.push(`/Patient/Results/${type}`);
  };

  return (
    <main className="min-h-[calc(100vh-72px)] bg-slate-50 px-4 py-8 md:px-6 md:py-12">
      <div className="mx-auto flex min-h-[calc(100vh-136px)] max-w-5xl flex-col justify-center">

        {/* Header */}
        <div className="w-full max-w-2xl mx-auto text-center">

          {/* Location Status */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium border rounded-full border-emerald-100 bg-emerald-50 text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            تم تحديد موقعك بنجاح
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            إيه اللي بتدور عليه؟
          </h1>

          <p className="max-w-lg mx-auto mt-4 text-sm leading-7 text-slate-500 md:text-base">
            اختار نوع الرعاية اللي محتاجها، وهنبحثلك عن أقرب الأماكن
            المتاحة بالقرب منك.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-5 mt-10 md:grid-cols-2">

          {/* =========================
              NICU
          ========================== */}
          <button
            type="button"
            onClick={() => handleNavigate("NICU")}
            className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 text-right shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg active:scale-[0.99] md:p-7"
          >
            {/* Top */}
            <div className="flex items-center justify-between">

              <div className="flex items-center justify-center w-16 h-16 text-blue-600 transition-all duration-200 rounded-2xl bg-blue-50 group-hover:bg-blue-600 group-hover:text-white">
                <FaBedPulse size={30} />
              </div>

              <FaArrowLeft
                className="text-xl transition-all duration-200 text-slate-300 group-hover:-translate-x-1 group-hover:text-blue-600"
              />
            </div>

            {/* Content */}
            <div className="mt-7">

              <h2 className="text-xl font-bold text-slate-900">
                حضّانة أطفال
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                ابحث عن حضّانات متاحة لحديثي الولادة والأطفال
                الذين يحتاجون إلى رعاية خاصة.
              </p>

            </div>

            {/* Action */}
            <div className="px-4 py-3 mt-6 text-sm font-medium transition-colors rounded-xl bg-slate-50 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-700">
              عرض الحضّانات المتاحة
            </div>
          </button>

          {/* =========================
              ICU
          ========================== */}
          <button
            type="button"
            onClick={() => handleNavigate("ICU")}
            className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 text-right shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg active:scale-[0.99] md:p-7"
          >
            {/* Top */}
            <div className="flex items-center justify-between">

              <div className="flex items-center justify-center w-16 h-16 transition-all duration-200 rounded-2xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white">
                <FaHeartPulse size={30} />
              </div>

              <FaArrowLeft
                className="text-xl transition-all duration-200 text-slate-300 group-hover:-translate-x-1 group-hover:text-emerald-600"
              />
            </div>

            {/* Content */}
            <div className="mt-7">

              <h2 className="text-xl font-bold text-slate-900">
                عناية مركزة
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                ابحث عن أماكن عناية مركزة متاحة للحالات التي
                تحتاج إلى رعاية ومتابعة مكثفة.
              </p>

            </div>

            {/* Action */}
            <div className="px-4 py-3 mt-6 text-sm font-medium transition-colors rounded-xl bg-slate-50 text-slate-500 group-hover:bg-emerald-50 group-hover:text-emerald-700">
              عرض أماكن العناية المتاحة
            </div>
          </button>

        </div>

      </div>
    </main>
  );
};

export default Home;