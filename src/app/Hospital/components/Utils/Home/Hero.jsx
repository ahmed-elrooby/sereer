"use client";

import React from "react";
import { FaBed } from "react-icons/fa6";

const Hero = () => {
  return (
    <section className="p-5 mx-auto mt-6 text-white bg-blue-600 shadow-sm rounded-2xl sm:p-7">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        {/* Main Available Beds */}
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="grid w-16 h-16 text-3xl shrink-0 place-items-center rounded-2xl bg-white/15 sm:h-20 sm:w-20 sm:text-4xl">
            <FaBed />
          </div>

          <div>
            <p className="flex items-center gap-2 text-xs text-white/80 sm:text-sm">
              <span className="w-2 h-2 rounded-full animate-pulse bg-emerald-300" />
              الأسرة المتاحة الآن
            </p>

            <div className="mt-1.5 flex items-end gap-3">
              <span className="text-5xl font-bold leading-none sm:text-6xl">
                7
              </span>

              <span className="pb-1 text-base text-white/90 sm:text-lg">
                سرير متاح
              </span>
            </div>

            <p className="mt-2 text-[11px] text-white/70 sm:text-sm">
              يظهر هذا الرقم للمرضى الباحثين عن سرير في الوقت الحقيقي
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid w-full grid-cols-3 gap-2 sm:gap-3 lg:w-auto">
          {/* Total */}
          <div className="px-3 py-3 text-center rounded-xl bg-white/10 sm:px-5">
            <p className="text-xl font-bold sm:text-2xl">21</p>

            <p className="mt-0.5 text-[10px] text-white/75 sm:text-[11px]">
              إجمالي الأسرة
            </p>
          </div>

          {/* Occupied */}
          <div className="px-3 py-3 text-center rounded-xl bg-white/10 sm:px-5">
            <p className="text-xl font-bold sm:text-2xl">12</p>

            <p className="mt-0.5 text-[10px] text-white/75 sm:text-[11px]">
              مشغول
            </p>
          </div>

          {/* Maintenance */}
          <div className="px-3 py-3 text-center rounded-xl bg-white/10 sm:px-5">
            <p className="text-xl font-bold sm:text-2xl">2</p>

            <p className="mt-0.5 text-[10px] text-white/75 sm:text-[11px]">
              تحت الصيانة
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;