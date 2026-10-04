"use client";

import React, { useContext, useMemo } from "react";
import { FaBed } from "react-icons/fa6";
import { Hospital } from "../../../../providers/HospitalContext.jsx";
import { authContext } from "../../../../providers/Auth.jsx";

const Hero = () => {
  const { profile } = useContext(authContext);
  const { units } = useContext(Hospital);

  const services = profile?.data?.facility?.services || [];

  // units API response:
  // {
  //   success: true,
  //   data: [...]
  // }

  const activeUnits = useMemo(() => {
    return (units?.data || []).filter(
      (unit) => unit.isActive !== false
    );
  }, [units]);

  // Available NICU beds
  const nicuBeds = useMemo(() => {
    return activeUnits
      .filter((unit) => unit.type === "NICU")
      .reduce(
        (total, unit) => total + Number(unit.availableBeds || 0),
        0
      );
  }, [activeUnits]);

  // Available ICU beds
  const icuBeds = useMemo(() => {
    return activeUnits
      .filter((unit) => unit.type === "ICU")
      .reduce(
        (total, unit) => total + Number(unit.availableBeds || 0),
        0
      );
  }, [activeUnits]);

  // Total available beds
  const totalAvailableBeds = nicuBeds + icuBeds;

  // Facility services
  const hasNICU = services.includes("NICU");
  const hasICU = services.includes("ICU");

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
                {totalAvailableBeds}
              </span>

              <span className="pb-1 text-base text-white/90 sm:text-lg">
                سرير متاح
              </span>
            </div>

            <p className="mt-2 text-[11px] text-white/70 sm:text-sm">
              إجمالي الأسرة المتاحة في الحضّانات والعناية المركزة
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid w-full grid-cols-2 gap-2 sm:gap-3 lg:w-auto">
          {/* NICU */}
          {hasNICU && (
            <div className="px-4 py-3 text-center rounded-xl bg-white/10 sm:px-6">
              <p className="text-xl font-bold sm:text-2xl">
                {nicuBeds}
              </p>

              <p className="mt-0.5 text-[10px] text-white/75 sm:text-[11px]">
                حضّانات متاحة
              </p>
            </div>
          )}

          {/* ICU */}
          {hasICU && (
            <div className="px-4 py-3 text-center rounded-xl bg-white/10 sm:px-6">
              <p className="text-xl font-bold sm:text-2xl">
                {icuBeds}
              </p>

              <p className="mt-0.5 text-[10px] text-white/75 sm:text-[11px]">
                عناية مركزة متاحة
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
