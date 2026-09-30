import React from "react";
import {
  FaBed,
  FaCircleCheck,
  FaUserInjured,
  FaScrewdriverWrench,
} from "react-icons/fa6";

const Cards = () => {
  return (
    <div className="grid grid-cols-2 gap-3 mt-4 md:mt-6 sm:gap-4 lg:grid-cols-4">
      {/* Total Beds */}
      <div className="p-4 bg-white border shadow-sm rounded-2xl border-slate-200 sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-medium text-slate-500 sm:text-sm">
            إجمالي الأسرة
          </p>

          <span className="grid w-8 h-8 text-sm rounded-lg shrink-0 place-items-center bg-slate-50 text-slate-400">
            <FaBed size={15} />
          </span>
        </div>

        <p className="mt-3 text-2xl font-bold leading-none text-slate-900 sm:text-3xl">
          21
        </p>
      </div>

      {/* Available */}
      <div className="p-4 border-2 rounded-2xl border-blue-600/30 bg-blue-50 sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-semibold text-blue-600 sm:text-sm">
            متاح
          </p>

          <span className="grid w-8 h-8 text-sm text-blue-600 rounded-lg shrink-0 place-items-center bg-white/70">
            <FaCircleCheck size={15} />
          </span>
        </div>

        <p className="mt-3 text-4xl font-bold leading-none text-blue-600">
          7
        </p>

        <p className="mt-1.5 text-[11px] text-blue-600/70">
          متاحة للحجز الآن
        </p>
      </div>

      {/* Occupied */}
      <div className="p-4 bg-white border shadow-sm rounded-2xl border-slate-200 sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-medium text-slate-500 sm:text-sm">
            مشغول
          </p>

          <span className="grid w-8 h-8 text-sm rounded-lg shrink-0 place-items-center bg-slate-50 text-slate-400">
            <FaUserInjured size={15} />
          </span>
        </div>

        <p className="mt-3 text-2xl font-bold leading-none text-slate-900 sm:text-3xl">
          12
        </p>
      </div>

      {/* Maintenance */}
      <div className="p-4 bg-white border shadow-sm rounded-2xl border-slate-200 sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-medium text-slate-500 sm:text-sm">
            تحت الصيانة
          </p>

          <span className="grid w-8 h-8 text-sm rounded-lg shrink-0 place-items-center bg-slate-50 text-slate-400">
            <FaScrewdriverWrench size={15} />
          </span>
        </div>

        <p className="mt-3 text-2xl font-bold leading-none text-slate-900 sm:text-3xl">
          2
        </p>
      </div>
    </div>
  );
};

export default Cards;