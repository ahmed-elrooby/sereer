"use client";

import React from "react";
import {
  FaMobileScreenButton,
  FaHeartPulse,
  FaClock,
} from "react-icons/fa6";

const Info = ({
  available = 3,
  updatedAt = "منذ 2 دقيقة",
}) => {
  return (
    <section className="p-4 mt-4 bg-white border shadow-sm rounded-2xl border-slate-200 md:mt-7 sm:p-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        {/* Info */}
        <div className="flex items-center gap-3">
          <div className="grid w-10 h-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
            <FaMobileScreenButton size={16} />
          </div>

          <div>
            <p className="text-sm font-bold text-slate-900">
              ما يظهر للمرضى في التطبيق
            </p>

            <p className="mt-0.5 text-[11px] text-slate-500">
              يتم تحديث البيانات تلقائيًا
            </p>
          </div>
        </div>

        {/* ICU Data */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5">
            <FaHeartPulse
              size={15}
              className="text-emerald-600"
            />

            <span className="text-lg font-bold leading-none text-emerald-600">
              {available}
            </span>

            <span className="text-xs text-emerald-700">
              سرير عناية متاح
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <FaClock size={12} />

            <span>آخر تحديث</span>

            <span>{updatedAt}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Info;