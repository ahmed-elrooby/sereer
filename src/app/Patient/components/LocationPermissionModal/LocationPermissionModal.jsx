"use client";

import { FaLocationDot } from "react-icons/fa6";

const LocationPermissionModal = ({
  isOpen,
  onAllow,
  isLoading,
  error,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md p-6 bg-white shadow-2xl rounded-3xl sm:p-8">

        {/* Icon */}
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-5 text-blue-600 rounded-2xl bg-blue-50">
          <FaLocationDot size={28} />
        </div>

        {/* Content */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            اسمح لنا بتحديد موقعك
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-500">
            عشان نقدر نعرضلك أقرب حضّانة أو عناية مركزة متاحة ليك،
            محتاجين نعرف موقعك الحالي.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="px-4 py-3 mt-5 text-sm leading-6 text-center text-red-600 rounded-xl bg-red-50">
            {error}
          </div>
        )}

        {/* Button */}
        <button
          type="button"
          onClick={onAllow}
          disabled={isLoading}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <FaLocationDot />

          {isLoading
            ? "جاري تحديد موقعك..."
            : "السماح بتحديد موقعي"}
        </button>

        <p className="mt-5 text-xs text-center text-slate-400">
          🔒 موقعك بيُستخدم فقط لعرض الأماكن الأقرب ليك.
        </p>
      </div>
    </div>
  );
};

export default LocationPermissionModal;