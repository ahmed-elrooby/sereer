"use client";

import React, { useState } from "react";
import {
  FaArrowRight,
  FaLocationDot,
  FaPhone,
  FaRoute,
  FaHospital,
  FaClock,
  FaCircleCheck,
  FaTriangleExclamation,
} from "react-icons/fa6";

const Icu = () => {
  const [filter, setFilter] = useState("nearest");

  const hospitals = [
    {
      id: 1,
      name: "مستشفى النور التخصصي",
      distance: "2.4 كم",
      time: "حوالي 8 دقائق",
      updated: "منذ 5 دقائق",
      status: "available",
    },
    {
      id: 2,
      name: "مستشفى الحياة",
      distance: "4.1 كم",
      time: "حوالي 12 دقيقة",
      updated: "منذ 12 دقيقة",
      status: "available",
    },
    {
      id: 3,
      name: "مستشفى الأمل",
      distance: "6.8 كم",
      time: "حوالي 18 دقيقة",
      updated: "منذ 35 دقيقة",
      status: "confirm",
    },
  ];

  return (
    <main className="min-h-[calc(100vh-72px)] bg-slate-50 px-4 py-6 md:px-6 md:py-8">
      <div className="max-w-5xl mx-auto">

        {/* Back */}
        <button
          type="button"
          className="flex items-center gap-2 mb-6 text-sm font-medium transition text-slate-500 hover:text-blue-600"
        >
          <FaArrowRight />
          تغيير نوع الرعاية
        </button>

        {/* Header */}
        <div className="p-5 bg-white border shadow-sm rounded-3xl border-slate-200 md:p-7">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center h-14 w-14 shrink-0 rounded-2xl bg-emerald-50 text-emerald-600">
                <FaHospital size={26} />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  أقرب أماكن العناية المركزة
                </h1>

                <div className="flex items-center gap-2 mt-2 text-sm text-slate-500">
                  <FaLocationDot className="text-blue-500" />
                  النتائج بالقرب من موقعك
                </div>
              </div>
            </div>

            {/* Result count */}
            <div className="px-5 py-3 text-center rounded-2xl bg-slate-50">
              <span className="block text-2xl font-bold text-slate-900">
                {hospitals.length}
              </span>

              <span className="text-xs text-slate-500">
                أماكن تم العثور عليها
              </span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between gap-3 mt-5">
          <div>
            <h2 className="font-bold text-slate-900">
              الأماكن المتاحة بالقرب منك
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              مرتبة حسب الأقرب إلى موقعك
            </p>
          </div>

          <div className="flex p-1 bg-white border rounded-xl border-slate-200">
            <button
              onClick={() => setFilter("nearest")}
              className={`rounded-lg px-3 py-2 text-xs font-medium transition ${
                filter === "nearest"
                  ? "bg-blue-600 text-white"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              الأقرب أولاً
            </button>

            <button
              onClick={() => setFilter("available")}
              className={`rounded-lg px-3 py-2 text-xs font-medium transition ${
                filter === "available"
                  ? "bg-blue-600 text-white"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              المتاح الآن
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="mt-5 space-y-4">
          {hospitals.map((hospital) => (
            <div
              key={hospital.id}
              className="p-5 transition bg-white border-2 border-blue-600 shadow-sm rounded-3xl hover:border-slate-300 hover:shadow-md md:p-6"
            >
              {/* Top */}
              <div className="flex items-start justify-between gap-4">

                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {hospital.name}
                  </h3>

                  <div className="flex items-center gap-2 mt-2 text-sm text-slate-500">
                    <FaHospital className="text-slate-400" />
                    عناية مركزة
                  </div>
                </div>

                {/* Status */}
                {hospital.status === "available" ? (
                  <div className="flex shrink-0 items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                    <FaCircleCheck />
                    متاح
                  </div>
                ) : (
                  <div className="flex shrink-0 items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
                    <FaTriangleExclamation />
                    يحتاج تأكيد
                  </div>
                )}
              </div>

              {/* Information */}
              <div className="grid grid-cols-2 gap-3 py-4 mt-5 border-y border-slate-100 md:grid-cols-3">

                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center text-blue-600 rounded-lg h-9 w-9 bg-blue-50">
                    <FaLocationDot size={14} />
                  </div>

                  <div>
                    <span className="block text-xs text-slate-400">
                      المسافة
                    </span>
                    <span className="text-sm font-semibold text-slate-700">
                      {hospital.distance}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center rounded-lg h-9 w-9 bg-violet-50 text-violet-600">
                    <FaRoute size={14} />
                  </div>

                  <div>
                    <span className="block text-xs text-slate-400">
                      وقت الوصول
                    </span>
                    <span className="text-sm font-semibold text-slate-700">
                      {hospital.time}
                    </span>
                  </div>
                </div>

                <div className="flex items-center col-span-2 gap-3 md:col-span-1">
                  <div className="flex items-center justify-center rounded-lg h-9 w-9 bg-slate-100 text-slate-500">
                    <FaClock size={14} />
                  </div>

                  <div>
                    <span className="block text-xs text-slate-400">
                      آخر تحديث
                    </span>
                    <span className="text-sm font-semibold text-slate-700">
                      {hospital.updated}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 mt-5 sm:flex-row">

                <button
                  type="button"
                  className="flex items-center justify-center flex-1 gap-2 px-4 py-3 text-sm font-bold text-white transition bg-blue-600 rounded-xl hover:bg-blue-700"
                >
                  <FaPhone />
                  اتصل الآن
                </button>

                <button
                  type="button"
                  className="flex items-center justify-center flex-1 gap-2 px-4 py-3 text-sm font-bold transition bg-white border rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50"
                >
                  <FaRoute />
                  الاتجاهات
                </button>
              </div>

              {/* Confirmation warning */}
              {hospital.status === "confirm" && (
                <p className="mt-3 text-xs text-center text-amber-600">
                  يُفضل الاتصال بالمستشفى للتأكد من توفر السرير قبل التوجه.
                </p>
              )}
            </div>
          ))}
        </div>

      </div>
    </main>
  );
};

export default Icu;