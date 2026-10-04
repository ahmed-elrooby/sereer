"use client";

import React, { useContext, useMemo } from "react";
import {
  FaMobileScreenButton,
  FaBaby,
} from "react-icons/fa6";

import { Hospital } from "../../../../providers/HospitalContext.jsx";

const Info = () => {
  const { units } = useContext(Hospital);

  const availableBeds = useMemo(() => {
    return (units?.data || [])
      .filter(
        (unit) =>
          unit.type === "NICU" &&
          unit.isActive !== false
      )
      .reduce(
        (total, unit) =>
          total + Number(unit.availableBeds || 0),
        0
      );
  }, [units]);

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
              ما يظهر للأهالي في التطبيق
            </p>

            <p className="mt-0.5 text-[11px] text-slate-500">
              عدد الأسرة المتاحة حاليًا في الحضّانات
            </p>
          </div>
        </div>

        {/* Patient Data */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5">
            <FaBaby
              size={15}
              className="text-emerald-600"
            />

            <span className="text-lg font-bold leading-none text-emerald-600">
              {availableBeds}
            </span>

            <span className="text-xs text-emerald-700">
              سرير متاح
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Info;