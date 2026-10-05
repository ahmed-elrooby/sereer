"use client";

import React, { useContext } from "react";
import { FaHeartPulse } from "react-icons/fa6";
import { Hospital } from "../../../../providers/HospitalContext.jsx";

const Hero = () => {
  const { units } = useContext(Hospital);
  // وحدات العناية المركزة فقط
  const icuUnits =
    units?.data?.filter((unit) => unit.type === "ICU" && unit.isActive) || [];

  // إجمالي الأسرة المتاحة في وحدات العناية
  const available = icuUnits.reduce(
    (total, unit) => total + Number(unit.availableBeds || 0),
    0
  );

  // عدد وحدات العناية
  const totalUnits = icuUnits.length;

  return (
    <section className="p-5 mt-4 text-white bg-blue-600 shadow-sm md:mt-7 rounded-2xl sm:p-7">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

        {/* Main Available */}
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="grid w-16 h-16 text-3xl shrink-0 place-items-center rounded-2xl bg-white/15 sm:h-20 sm:w-20 sm:text-4xl">
            <FaHeartPulse />
          </div>

          <div>
            <p className="flex items-center gap-2 text-xs text-white/80 sm:text-sm">
              <span className="w-2 h-2 rounded-full animate-pulse bg-emerald-300" />

              أسرة عناية مركزة متاحة الآن
            </p>

            <div className="mt-1.5 flex items-end gap-3">
              <span className="text-5xl font-bold leading-none sm:text-6xl">
                {available}
              </span>

              <span className="pb-1 text-base text-white/90 sm:text-lg">
                سرير متاح
              </span>
            </div>

            <p className="mt-2 text-[11px] text-white/70 sm:text-sm">
              إجمالي الأسرة المتاحة في وحدات العناية المركزة
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 lg:w-auto">

          {/* ICU Units */}
          <div className="px-5 py-3 text-center rounded-xl bg-white/10">
            <p className="text-xl font-bold sm:text-2xl">
              {totalUnits}
            </p>

            <p className="mt-0.5 text-[10px] text-white/75 sm:text-[11px]">
              وحدات العناية
            </p>
          </div>

          {/* Available */}
          <div className="px-5 py-3 text-center rounded-xl bg-white/10">
            <p className="text-xl font-bold sm:text-2xl">
              {available}
            </p>

            <p className="mt-0.5 text-[10px] text-white/75 sm:text-[11px]">
              أسرة متاحة
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;

