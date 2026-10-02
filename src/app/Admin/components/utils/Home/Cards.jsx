"use client";

import React, { useContext, useMemo } from "react";
import { admin } from "../../../../providers/AdminContext.jsx";

const Cards = () => {
  const { facility } = useContext(admin);

  const facilities = facility?.facilities || [];

  const stats = useMemo(() => {
    const total = facilities.length;

    const active = facilities.filter(
      (item) => item.isActive === true
    ).length;

    const inactive = facilities.filter(
      (item) => item.isActive === false
    ).length;

    return {
      total,
      active,
      inactive,
    };
  }, [facilities]);

  return (
    <div className="grid grid-cols-1 gap-5 mt-8 md:mt-14 lg:grid-cols-12">
      {/* الكارت الكبير */}
      <div className="relative overflow-hidden rounded-2xl border border-[#263244] bg-[#151D2B] p-7 sm:p-10 lg:col-span-7">
        {/* Grid Background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(148,163,184,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148,163,184,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Glow */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#38BDF8]/[0.05] blur-3xl" />

        <div className="relative">
          {/* Header */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] tracking-[0.3em] text-[#94A3B8]">
              TOTAL FACILITIES
            </span>

            <span className="text-[10px] tabular-nums text-[#94A3B8]/60">
              01 / 04
            </span>
          </div>

          {/* Main Number */}
          <div className="flex items-end gap-5 mt-10">
            <span className="text-[76px] font-semibold leading-[0.85] tracking-tight text-[#F8FAFC] tabular-nums sm:text-[112px]">
              {stats.total}
            </span>

            <span className="pb-3 text-base text-[#F8FAFC]/80 sm:pb-5 sm:text-lg">
              منشأة طبية
            </span>
          </div>

          {/* Bottom Info */}
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-[#263244] pt-6 text-[11px] text-[#94A3B8]">
            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-[#38BDF8]" />
              منشآت نشطة · {stats.active}
            </span>

            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-[#EF4444]" />
              منشآت متوقفة · {stats.inactive}
            </span>
          </div>
        </div>
      </div>

      {/* الأعمدة الجانبية */}
      <div className="flex flex-col gap-5 lg:col-span-5">
        {/* حسابات المنشآت */}
        <div
          className="
            flex flex-1 items-center justify-between
            rounded-2xl border border-[#263244]
            bg-[#151D2B] p-6
            transition-all duration-200
            hover:border-[#38BDF8]/30
          "
        >
          <div>
            <p className="text-[10px] tracking-[0.3em] text-[#94A3B8]">
              ACCOUNTS
            </p>

            <p className="flex items-end gap-2 mt-4">
              <span className="text-4xl font-semibold leading-none text-[#F8FAFC] tabular-nums">
                {stats.total}
              </span>

              <span className="pb-1 text-xs text-[#94A3B8]">
                حساب منشأة
              </span>
            </p>
          </div>

          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#263244] text-[10px] text-[#94A3B8]/70 tabular-nums">
            02
          </span>
        </div>

        {/* نشط / متوقف */}
        <div className="grid flex-1 grid-cols-2 gap-5">
          {/* Active */}
          <div
            className="
              flex flex-col justify-between
              rounded-2xl border border-[#263244]
              bg-[#151D2B] p-6
              transition-all duration-200
              hover:border-[#22C55E]/30
            "
          >
            <div className="flex items-center justify-between">
              <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />

              <span className="text-[10px] text-[#94A3B8]/60 tabular-nums">
                03
              </span>
            </div>

            <div className="mt-8">
              <p className="text-4xl font-semibold leading-none text-[#F8FAFC] tabular-nums">
                {stats.active}
              </p>

              <p className="mt-3 text-[11px] text-[#94A3B8]">
                حساب نشط
              </p>
            </div>
          </div>

          {/* Inactive */}
          <div
            className="
              flex flex-col justify-between
              rounded-2xl border border-[#263244]
              bg-[#151D2B] p-6
              transition-all duration-200
              hover:border-[#EF4444]/30
            "
          >
            <div className="flex items-center justify-between">
              <span className="h-1.5 w-1.5 rounded-full bg-[#EF4444]" />

              <span className="text-[10px] text-[#94A3B8]/60 tabular-nums">
                04
              </span>
            </div>

            <div className="mt-8">
              <p className="text-4xl font-semibold leading-none text-[#EF4444] tabular-nums">
                {stats.inactive}
              </p>

              <p className="mt-3 text-[11px] text-[#94A3B8]">
                حساب متوقف
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;