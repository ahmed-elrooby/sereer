"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaBedPulse,
  FaHeartPulse,
  FaArrowLeft,
} from "react-icons/fa6";

const Home = () => {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState(null);

  const handleContinue = () => {
    if (!selectedType) return;

    router.push(`/Patient/Results/${selectedType}`);
  };

  return (
    <main className="min-h-[calc(100vh-72px)]  px-4 py-8 md:px-6 md:py-12">
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

          {/* Incubator */}
          <button
            type="button"
            onClick={() => setSelectedType("Incubator")}
            className={`group relative overflow-hidden rounded-3xl border bg-white p-6 text-right transition-all duration-200 md:p-7 ${
              selectedType === "incubator"
                ? "border-blue-500 ring-2 ring-blue-100 shadow-lg"
                : "border-slate-200 shadow-sm hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
            }`}
          >
            {selectedType === "Incubator" && (
              <div className="absolute flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-blue-600 rounded-full left-5 top-5">
                ✓
              </div>
            )}

            <div className="flex items-center justify-between">
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl transition ${
                  selectedType === "incubator"
                    ? "bg-blue-600 text-white"
                    : "bg-blue-50 text-blue-600 group-hover:bg-blue-100"
                }`}
              >
                <FaBedPulse size={30} />
              </div>

              <FaArrowLeft
                className={`text-xl transition-all ${
                  selectedType === "Incubator"
                    ? "-translate-x-1 text-blue-600"
                    : "text-slate-300 group-hover:-translate-x-1 group-hover:text-blue-500"
                }`}
              />
            </div>

            <div className="mt-7">
              <h2 className="text-xl font-bold text-slate-900">
                حضّانة أطفال
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                ابحث عن حضّانات متاحة لحديثي الولادة والأطفال
                الذين يحتاجون إلى رعاية خاصة.
              </p>
            </div>

            <div
              className={`mt-6 rounded-xl px-4 py-3 text-sm font-medium ${
                selectedType === "incubator"
                  ? "bg-blue-50 text-blue-700"
                  : "bg-slate-50 text-slate-500"
              }`}
            >
              {selectedType === "incubator"
                ? "✓ تم اختيار حضّانة أطفال"
                : "اضغط لاختيار حضّانة أطفال"}
            </div>
          </button>

          {/* ICU */}
          <button
            type="button"
            onClick={() => setSelectedType("Icu")}
            className={`group relative overflow-hidden rounded-3xl border bg-white p-6 text-right transition-all duration-200 md:p-7 ${
              selectedType === "Icu"
                ? "border-emerald-500 ring-2 ring-emerald-100 shadow-lg"
                : "border-slate-200 shadow-sm hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md"
            }`}
          >
            {selectedType === "Icu" && (
              <div className="absolute flex items-center justify-center w-6 h-6 text-xs font-bold text-white rounded-full left-5 top-5 bg-emerald-600">
                ✓
              </div>
            )}

            <div className="flex items-center justify-between">
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl transition ${
                  selectedType === "Icu"
                    ? "bg-emerald-600 text-white"
                    : "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100"
                }`}
              >
                <FaHeartPulse size={30} />
              </div>

              <FaArrowLeft
                className={`text-xl transition-all ${
                  selectedType === "Icu"
                    ? "-translate-x-1 text-emerald-600"
                    : "text-slate-300 group-hover:-translate-x-1 group-hover:text-emerald-500"
                }`}
              />
            </div>

            <div className="mt-7">
              <h2 className="text-xl font-bold text-slate-900">
                عناية مركزة
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                ابحث عن أماكن عناية مركزة متاحة للحالات التي
                تحتاج إلى رعاية ومتابعة مكثفة.
              </p>
            </div>

            <div
              className={`mt-6 rounded-xl px-4 py-3 text-sm font-medium ${
                selectedType === "Icu"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-slate-50 text-slate-500"
              }`}
            >
              {selectedType === "Icu"
                ? "✓ تم اختيار عناية مركزة"
                : "اضغط لاختيار عناية مركزة"}
            </div>
          </button>
        </div>

        {/* Continue */}
        <div className="w-full max-w-md mx-auto mt-8">
          <button
            type="button"
            onClick={handleContinue}
            disabled={!selectedType}
            className="flex items-center justify-center w-full gap-3 px-6 py-4 text-base font-bold text-white transition-all bg-blue-600 shadow-sm rounded-2xl hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
          >
            البحث عن الأماكن المتاحة
            <FaArrowLeft />
          </button>

          <p className="mt-3 text-xs text-center text-slate-400">
            هنستخدم موقعك الحالي للبحث عن الأماكن الأقرب ليك
          </p>
        </div>
      </div>
    </main>
  );
};

export default Home;