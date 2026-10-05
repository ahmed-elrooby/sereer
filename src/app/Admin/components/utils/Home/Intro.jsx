"use client";

import React, { useContext } from "react";
import { authContext } from "../../../../providers/Auth.jsx";

const Intro = () => {
  const {profile}=useContext(authContext)
  return (
    <div className="relative mt-8 md:mt-14">
      {/* Section Meta */}
      <div className="flex items-center gap-3 text-[10px] tracking-[0.3em] text-[#94A3B8]">
        <span className="h-px w-8 bg-[#263244]" />

        <span>01 / OCTOBER</span>

        <span className="text-[#94A3B8]/40">—</span>

        <span>PLATFORM OVERVIEW</span>
      </div>

      {/* Heading */}
      <h1 className="mt-6 text-3xl font-semibold leading-[1.35] tracking-tight text-[#F8FAFC] sm:text-4xl lg:text-[44px]">
        صباح الخير،{" "}
        <span className="text-[#38BDF8]">{profile?.data?.user?.name}</span>
      </h1>

      {/* Description */}
      <p className="mt-4 max-w-md text-sm leading-relaxed text-[#94A3B8] sm:text-base">
        هذه نظرة سريعة على حالة المنصة اليوم.
      </p>
    </div>
  );
};

export default Intro;
