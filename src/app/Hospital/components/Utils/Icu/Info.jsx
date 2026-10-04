"use client";

import React, { useContext, useMemo } from "react";
import {
  FaMobileScreenButton,
  FaHeartPulse,
  FaClock,
} from "react-icons/fa6";

import { Hospital } from "../../../../providers/HospitalContext.jsx";

const Info = () => {
  const { units } = useContext(Hospital);

  const icuUnits = useMemo(() => {
    return (
      units?.data?.filter(
        (unit) => unit.type === "ICU" && unit.isActive
      ) || []
    );
  }, [units]);

  // إجمالي الأسرة المتاحة في وحدات العناية
  const available = useMemo(() => {
    return icuUnits.reduce(
      (total, unit) => total + Number(unit.availableBeds || 0),
      0
    );
  }, [icuUnits]);

  // آخر تحديث من وحدات العناية
  const updatedAt = useMemo(() => {
    if (!icuUnits.length) return "لا توجد بيانات";

    const latestUnit = icuUnits.reduce((latest, unit) => {
      if (!latest) return unit;

      return new Date(unit.updatedAt) > new Date(latest.updatedAt)
        ? unit
        : latest;
    }, null);

    if (!latestUnit?.updatedAt) return "غير متوفر";

    const diffInMinutes = Math.floor(
      (Date.now() - new Date(latestUnit.updatedAt).getTime()) /
        (1000 * 60)
    );

    if (diffInMinutes < 1) {
      return "الآن";
    }

    if (diffInMinutes === 1) {
      return "منذ دقيقة";
    }

    if (diffInMinutes < 60) {
      return `منذ ${diffInMinutes} دقيقة`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);

    if (diffInHours === 1) {
      return "منذ ساعة";
    }

    if (diffInHours < 24) {
      return `منذ ${diffInHours} ساعة`;
    }

    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays === 1) {
      return "منذ يوم";
    }

    return `منذ ${diffInDays} يوم`;
  }, [icuUnits]);

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

          {/* Available Beds */}
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

          {/* Last Update */}
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
