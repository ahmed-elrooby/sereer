"use client";

import React from "react";
import {
  FaBars,
  FaBell,
  FaHospital,
} from "react-icons/fa6";

const Header = ({ onMenuClick }) => {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/85 backdrop-blur">
      <div className="flex h-[73px] items-center gap-3 px-4 sm:px-6 lg:px-8">
        {/* Mobile Menu */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="فتح القائمة"
          className="grid w-10 h-10 transition bg-white border shrink-0 place-items-center rounded-xl border-slate-200 text-slate-600 hover:border-blue-200 hover:text-blue-600 lg:hidden"
        >
          <FaBars size={16} />
        </button>

        {/* Hospital Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <FaHospital
              size={16}
              className="hidden text-blue-600 shrink-0 sm:block"
            />

            <h1 className="text-base font-bold truncate text-slate-900 sm:text-xl">
              مرحبًا، مستشفى النور التخصصي
            </h1>
          </div>

          <p className="mt-0.5 truncate text-[11px] text-slate-500 sm:text-sm">
            تابع حالة الأسرة والخدمات المتاحة في المستشفى
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0 sm:gap-3">
          {/* Notifications */}
          <button
            type="button"
            aria-label="الإشعارات"
            className="relative grid w-10 h-10 transition bg-white border place-items-center rounded-xl border-slate-200 text-slate-500 hover:border-blue-200 hover:text-blue-600"
          >
            <FaBell size={16} />

            <span className="absolute -left-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              3
            </span>
          </button>

          {/* Profile */}
          <button
            type="button"
            className="flex items-center gap-2 py-1 transition bg-white border rounded-xl border-slate-200 pe-1 ps-2 hover:border-blue-200"
          >
            <div className="grid w-8 h-8 text-sm font-bold text-blue-600 rounded-lg place-items-center bg-blue-50">
              ن
            </div>

            <div className="hidden leading-tight text-right pe-1 sm:block">
              <p className="text-xs font-semibold text-slate-800">
                د. أحمد النور
              </p>

              <p className="mt-0.5 text-[10px] text-slate-500">
                مدير المستشفى
              </p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;