
"use client";

import React from "react";
import { FaBars } from "react-icons/fa6";

const Header = ({ toggleSidebar }) => {
    return (
    <header className="sticky top-0 z-30 border-b border-[#263244] bg-[#080B12]">
      <div className="flex h-[78px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
        {/* يمين: القائمة + التاريخ */}
        <div className="flex items-center min-w-0 gap-4">
          <button
  onClick={toggleSidebar}
  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#263244] text-[#94A3B8] transition-all duration-200 hover:border-[#38BDF8]/40 hover:text-[#F8FAFC] lg:hidden"
  aria-label="القائمة"
>
  <FaBars className="text-sm" />
</button>

          <div className="min-w-0">
            <p className="text-[10px] tracking-[0.3em] text-[#94A3B8]">
              01 OCT 2026
            </p>

            <p className="mt-1 truncate text-[13px] text-[#F8FAFC]/90">
              الأربعاء، 01 أكتوبر 2026
            </p>
          </div>
        </div>

        {/* وسط: حالة المنصة */}
        <div className="hidden items-center gap-3 rounded-full border border-[#263244] bg-[#111827]/60 px-4 py-2 md:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />

          <span className="text-[11px] text-[#94A3B8]">
            حالة المنصة
          </span>

          <span className="h-3 w-px bg-[#263244]" />

          <span className="text-[11px] text-[#F8FAFC]">
            تعمل بشكل طبيعي
          </span>
        </div>

        {/* يسار: المستخدم */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden text-left sm:block">
            <p className="text-[13px] leading-tight text-[#F8FAFC]">
              أحمد الروبي
            </p>

            <p className="mt-1 text-[10px] text-[#94A3B8]">
              مسؤول المنصة
            </p>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#263244] bg-[#111827] text-[11px] tracking-wide text-[#38BDF8]">
            أر
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
