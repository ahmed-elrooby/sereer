"use client";

import React from "react";
import { FaPlus } from "react-icons/fa6";

const Header = ({ onAddBed }) => {
  return (
    <div className="flex flex-col justify-between gap-3 mt-4 md:mt-6 sm:flex-row sm:items-center">
      {/* Title */}
      <div>
        <h2 className="text-lg font-bold text-slate-900">
          إدارة الأسرة
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          تابع حالة كل سرير وقم بتحديث حالته بسهولة.
        </p>
      </div>

      {/* Add Bed */}
      <button
        type="button"
        onClick={onAddBed}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
      >
        <FaPlus size={14} />
        إضافة سرير
      </button>
    </div>
  );
};

export default Header;