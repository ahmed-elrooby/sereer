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

  const allUnits = facilities.flatMap(
    (facility) => facility.units || []
  );

  const availableBeds = allUnits
    .filter((unit) => unit.isActive === true)
    .reduce(
      (sum, unit) => sum + Number(unit.availableBeds || 0),
      0
    );

  const totalBeds = allUnits.reduce(
    (sum, unit) => sum + Number(unit.availableBeds || 0),
    0
  );

  const activePercentage =
    total > 0 ? (active / total) * 100 : 0;

  return {
    total,
    active,
    inactive,
    availableBeds,
    totalBeds,
    activePercentage,
  };
}, [facilities]);

  return (
    <div className="grid grid-cols-1 gap-5 mt-10 lg:grid-cols-12">
      {/* Total Facilities */}
      <div className="relative overflow-hidden rounded-2xl border border-[#263244] bg-[#151D2B] p-7 lg:col-span-5">
        {/* Grid Lines */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.32]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(148,163,184,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148,163,184,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Glow */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-[#38BDF8]/[0.06] blur-3xl" />

        <div className="relative">
          <div className="flex items-center justify-between">
            <span className="text-[10px] tracking-[0.3em] text-[#94A3B8]">
              TOTAL FACILITIES
            </span>

            <span className="text-[10px] tabular-nums text-[#94A3B8]/60">
              01 / 04
            </span>
          </div>

          <div className="flex items-end gap-4 mt-8">
            <span className="text-[68px] font-semibold leading-[0.85] tracking-tight text-[#F8FAFC] tabular-nums sm:text-[88px]">
              {stats.total}
            </span>

            <span className="pb-2 text-sm text-[#F8FAFC]/80 sm:pb-4 sm:text-base">
              منشأة طبية
            </span>
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-[#263244] pt-5 text-[11px] text-[#94A3B8]">
            <span>
              منشآت نشطة · {stats.active}
            </span>

            <span>
              منشآت متوقفة · {stats.inactive}
            </span>
          </div>
        </div>
      </div>

      {/* Active */}
      <div className="flex flex-col justify-between rounded-2xl border border-[#263244] bg-[#151D2B] p-6 transition-all duration-200 hover:border-[#22C55E]/30 lg:col-span-3">
        <div className="flex items-center justify-between">
          <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />

          <span className="text-[10px] tabular-nums text-[#94A3B8]/60">
            02
          </span>
        </div>

        <div className="mt-8">
          <p className="text-4xl font-semibold leading-none text-[#F8FAFC] tabular-nums">
            {stats.active}
          </p>

          <p className="mt-3 text-[11px] text-[#94A3B8]">
            منشأة نشطة
          </p>

          <div className="mt-4 h-[2px] w-full overflow-hidden rounded-full bg-[#263244]/70">
            <div
              className="h-full rounded-full bg-[#22C55E] transition-all duration-500"
              style={{
                width: `${stats.activePercentage}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Suspended */}
      <div className="flex flex-col justify-between rounded-2xl border border-[#263244] bg-[#151D2B] p-6 transition-all duration-200 hover:border-[#EF4444]/30 lg:col-span-2">
        <div className="flex items-center justify-between">
          <span className="h-1.5 w-1.5 rounded-full bg-[#EF4444]" />

          <span className="text-[10px] tabular-nums text-[#94A3B8]/60">
            03
          </span>
        </div>

        <div className="mt-8">
          <p className="text-4xl font-semibold leading-none text-[#EF4444] tabular-nums">
            {stats.inactive}
          </p>

          <p className="mt-3 text-[11px] text-[#94A3B8]">
            منشأة متوقفة
          </p>
        </div>
      </div>

      {/* Beds */}
      <div className="flex flex-col justify-between rounded-2xl border border-[#263244] bg-[#151D2B] p-6 lg:col-span-2">
        <div className="flex items-center justify-between">
          <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8]" />

          <span className="text-[10px] tabular-nums text-[#94A3B8]/60">
            04
          </span>
        </div>

        <div className="mt-8">
          <p className="text-4xl font-semibold leading-none text-[#F8FAFC] tabular-nums">
            {stats.availableBeds}
            <span className="text-lg font-normal text-[#94A3B8]">
              /{stats.totalBeds}
            </span>
          </p>

          <p className="mt-3 text-[11px] text-[#94A3B8]">
            أسرّة متاحة
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cards;