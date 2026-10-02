"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaArrowRight,
  FaBedPulse,
  FaLocationDot,
  FaPhone,
  FaRoute,
  FaClock,
  FaCircleCheck,
  FaTriangleExclamation,
} from "react-icons/fa6";

const hospitals = [
  {
    id: 1,
    name: "مستشفى النور التخصصي",
    distance: "2.4 كم",
    duration: "حوالي 8 دقائق",
    updatedAt: "منذ 5 دقائق",
    availableBeds: 4,
  },
  {
    id: 2,
    name: "مستشفى الحياة",
    distance: "4.1 كم",
    duration: "حوالي 12 دقيقة",
    updatedAt: "منذ 12 دقيقة",
    availableBeds: 2,
  },
  {
    id: 3,
    name: "مستشفى الأمل للأطفال",
    distance: "6.8 كم",
    duration: "حوالي 18 دقيقة",
    updatedAt: "منذ 35 دقيقة",
    availableBeds: 1,
  },
  {
    id: 4,
    name: "مستشفى الرحمة",
    distance: "8.2 كم",
    duration: "حوالي 22 دقيقة",
    updatedAt: "منذ 50 دقيقة",
    availableBeds: 0,
  },
];

const Incubator = () => {
  const [filter, setFilter] = useState("nearest");

  const filteredHospitals =
    filter === "available"
      ? hospitals.filter((hospital) => hospital.availableBeds > 0)
      : hospitals;

  return (
    <main className="min-h-[calc(100vh-72px)] bg-slate-50 px-4 py-6 md:px-6 md:py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/Patient"
            className="inline-flex items-center gap-2 mb-5 text-sm font-medium transition text-slate-500 hover:text-blue-600"
          >
            <FaArrowRight />
            تغيير نوع الرعاية
          </Link>

          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center text-blue-600 h-14 w-14 shrink-0 rounded-2xl bg-blue-50">
              <FaBedPulse size={26} />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                أقرب الحضّانات المتاحة
              </h1>

              <div className="flex flex-wrap items-center mt-2 text-sm gap-x-3 gap-y-1 text-slate-500">
                <span className="flex items-center gap-1.5">
                  <FaLocationDot className="text-blue-500" />
                  النتائج بالقرب من موقعك
                </span>

                <span className="hidden text-slate-300 sm:block">
                  •
                </span>

                <span>{filteredHospitals.length} أماكن</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 p-2 mb-5 overflow-x-auto bg-white border rounded-2xl border-slate-200">
          <button
            type="button"
            onClick={() => setFilter("nearest")}
            className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
              filter === "nearest"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
            }`}
          >
            الأقرب أولاً
          </button>

          <button
            type="button"
            onClick={() => setFilter("available")}
            className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
              filter === "available"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
            }`}
          >
            المتاح الآن
          </button>
        </div>

        {/* Notice */}
        <div className="flex gap-3 p-4 mb-5 border border-blue-100 rounded-2xl bg-blue-50">
          <FaLocationDot className="mt-0.5 shrink-0 text-blue-600" />

          <div>
            <p className="text-sm font-semibold text-blue-900">
              بنعرضلك الأماكن الأقرب ليك
            </p>

            <p className="mt-1 text-xs leading-5 text-blue-700">
              عدد الأسرة بيتحدث من المستشفى، لذلك يُفضل الاتصال قبل
              التوجه للتأكد من استمرار توفر السرير.
            </p>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {filteredHospitals.map((hospital) => {
            const hasBeds = hospital.availableBeds > 0;

            return (
              <div
                key={hospital.id}
                className="p-5 transition bg-white border-2 border-blue-600 shadow-sm rounded-3xl hover:shadow-md md:p-6"
              >
                {/* Hospital Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-bold text-slate-900">
                        {hospital.name}
                      </h2>

                      {hasBeds ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                          <FaCircleCheck size={11} />
                          متاح
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600">
                          <FaTriangleExclamation size={11} />
                          غير متاح
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-sm text-slate-500">
                      حضّانة أطفال
                    </p>
                  </div>

                  {/* Distance */}
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50">
                    <FaLocationDot className="text-blue-500" />

                    <span className="text-sm font-bold text-slate-700">
                      {hospital.distance}
                    </span>
                  </div>
                </div>

                {/* Available Beds - Main Information */}
                <div
                  className={`mt-5 flex items-center gap-4 rounded-2xl border p-4 ${
                    hasBeds
                      ? "border-emerald-100 bg-emerald-50"
                      : "border-red-100 bg-red-50"
                  }`}
                >
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${
                      hasBeds
                        ? "bg-white text-emerald-600"
                        : "bg-white text-red-500"
                    }`}
                  >
                    <FaBedPulse size={27} />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      الأسرة المتاحة حاليًا
                    </p>

                    <p
                      className={`mt-1 text-xl font-bold ${
                        hasBeds
                          ? "text-emerald-700"
                          : "text-red-600"
                      }`}
                    >
                      {hospital.availableBeds === 0
                        ? "لا توجد أسرّة متاحة"
                        : hospital.availableBeds === 1
                        ? "سرير واحد متاح"
                        : `${hospital.availableBeds} سراير متاحة`}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-3 mt-4 sm:grid-cols-3">
                  {/* Distance */}
                  <div className="p-3 rounded-2xl bg-slate-50">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <FaRoute />
                      المسافة
                    </div>

                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {hospital.distance}
                    </p>
                  </div>

                  {/* Duration */}
                  <div className="p-3 rounded-2xl bg-slate-50">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <FaClock />
                      وقت الوصول
                    </div>

                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {hospital.duration}
                    </p>
                  </div>

                  {/* Last Update */}
                  <div className="col-span-2 p-3 rounded-2xl bg-slate-50 sm:col-span-1">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <FaClock />
                      آخر تحديث
                    </div>

                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {hospital.updatedAt}
                    </p>
                  </div>
                </div>

                {/* Warning */}
                <div
                  className={`mt-4 flex gap-2 rounded-xl px-3 py-3 text-xs leading-5 ${
                    hasBeds
                      ? "bg-blue-50 text-blue-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  <FaTriangleExclamation className="mt-0.5 shrink-0" />

                  <span>
                    {hasBeds
                      ? "يُفضل الاتصال بالمستشفى للتأكد من استمرار توفر السرير قبل التوجه."
                      : "لا توجد أسرّة متاحة حاليًا. يمكنك الاتصال بالمستشفى للاستفسار عن أقرب موعد لتوفر سرير."}
                  </span>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3 mt-5">
                  <a
                    href="tel:"
                    className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-white transition bg-blue-600 rounded-xl hover:bg-blue-700"
                  >
                    <FaPhone />
                    اتصل الآن
                  </a>

                  <a
                    href="#"
                    className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold transition bg-white border rounded-xl border-slate-200 text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <FaRoute />
                    الاتجاهات
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredHospitals.length === 0 && (
          <div className="px-6 py-12 text-center bg-white border rounded-3xl border-slate-200">
            <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-2xl bg-slate-100 text-slate-400">
              <FaBedPulse size={28} />
            </div>

            <h2 className="mt-5 text-lg font-bold text-slate-900">
              مفيش حضّانات متاحة حاليًا
            </h2>

            <p className="max-w-md mx-auto mt-2 text-sm leading-6 text-slate-500">
              ملقيناش حضّانات فيها سراير متاحة بالقرب منك حاليًا.
              جرب البحث مرة تانية بعد شوية.
            </p>
          </div>
        )}

        {/* Bottom Note */}
        <div className="mt-6 text-center">
          <p className="text-xs leading-5 text-slate-400">
            المعلومات المعروضة تعتمد على آخر تحديث من المستشفى. يُرجى
            التأكد هاتفيًا من توفر السرير قبل التوجه.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Incubator;