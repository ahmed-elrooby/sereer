"use client";

import React from "react";
import {
  FaCircleCheck,
  FaUserInjured,
  FaScrewdriverWrench,
  FaBed,
} from "react-icons/fa6";

const Cards = ({
  available = 3,
  occupied = 5,
  maintenance = 1,
  total = 9,
}) => {
  const occupancy =
    total > 0 ? Math.round((occupied / total) * 100) : 0;

  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const dashOffset =
    circumference - (occupancy / 100) * circumference;

  return (
    <section className="grid gap-4 mt-4 md:mt-7 lg:grid-cols-3">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-2">
        {/* Available */}
        <div className="p-4 border-2 rounded-2xl border-blue-600/30 bg-blue-50 sm:p-5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-semibold text-blue-600 sm:text-sm">
              متاح
            </p>

            <span className="grid w-8 h-8 text-sm text-blue-600 rounded-lg shrink-0 place-items-center bg-white/70">
              <FaCircleCheck size={15} />
            </span>
          </div>

          <p className="mt-3 text-4xl font-bold leading-none text-blue-600">
            {available}
          </p>

          <p className="mt-1.5 text-[11px] text-blue-600/70">
            جاهزة لاستقبال الحالات
          </p>
        </div>

        {/* Occupied */}
        <div className="p-4 bg-white border shadow-sm rounded-2xl border-slate-200 sm:p-5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-medium text-slate-500 sm:text-sm">
              مشغولة
            </p>

            <span className="grid w-8 h-8 text-sm text-red-500 rounded-lg shrink-0 place-items-center bg-red-50">
              <FaUserInjured size={15} />
            </span>
          </div>

          <p className="mt-3 text-3xl font-bold leading-none text-slate-900">
            {occupied}
          </p>

          <p className="mt-1.5 text-[11px] text-slate-500">
            أسرة قيد الاستخدام
          </p>
        </div>

        {/* Maintenance */}
        <div className="p-4 bg-white border shadow-sm rounded-2xl border-slate-200 sm:p-5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-medium text-slate-500 sm:text-sm">
              تحت الصيانة
            </p>

            <span className="grid w-8 h-8 text-sm rounded-lg shrink-0 place-items-center bg-amber-50 text-amber-500">
              <FaScrewdriverWrench size={15} />
            </span>
          </div>

          <p className="mt-3 text-3xl font-bold leading-none text-slate-900">
            {maintenance}
          </p>

          <p className="mt-1.5 text-[11px] text-slate-500">
            خارج الخدمة مؤقتًا
          </p>
        </div>

        {/* Total */}
        <div className="p-4 bg-white border shadow-sm rounded-2xl border-slate-200 sm:p-5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-medium text-slate-500 sm:text-sm">
              إجمالي الأسرة
            </p>

            <span className="grid w-8 h-8 text-sm rounded-lg shrink-0 place-items-center bg-slate-50 text-slate-400">
              <FaBed size={15} />
            </span>
          </div>

          <p className="mt-3 text-3xl font-bold leading-none text-slate-900">
            {total}
          </p>

          <p className="mt-1.5 text-[11px] text-slate-500">
            الطاقة الاستيعابية الكاملة
          </p>
        </div>
      </div>

      {/* Capacity Ring */}
      <div className="flex flex-col p-5 bg-white border shadow-sm rounded-2xl border-slate-200">
        <h3 className="text-base font-bold text-slate-900">
          معدل الإشغال
        </h3>

        <p className="mt-1 text-xs text-slate-500">
          نسبة أسرة العناية المركزة المشغولة من الإجمالي
        </p>

        <div className="grid flex-1 py-4 place-items-center">
          <div className="relative w-40 h-40">
            <svg
              viewBox="0 0 120 120"
              className="w-full h-full -rotate-90"
            >
              {/* Background */}
              <circle
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth="12"
                className="text-slate-200"
              />

              {/* Progress */}
              <circle
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                className="text-blue-600 transition-all duration-500"
              />
            </svg>

            <div className="absolute inset-0 grid place-items-center">
              <div className="text-center">
                <p className="text-3xl font-bold leading-none text-blue-600">
                  {occupancy}%
                </p>

                <p className="mt-1 text-[11px] text-slate-500">
                  مشغول
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
            مشغول
          </span>

          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
            متبقي
          </span>
        </div>
      </div>
    </section>
  );
};

export default Cards;