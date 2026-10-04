"use client";

import React, { useContext } from "react";

import {
  FaPowerOff,
  FaTriangleExclamation,
  FaXmark,
} from "react-icons/fa6";

import { admin } from "../../../../providers/AdminContext.jsx";

const ChangeStatus = ({ selectFacility }) => {
  const {
    handleChangeStatusFacilitySubmit,
    openChangeStatusFacility,
    setOpenChangeStatusFacility,
    loading,
  } = useContext(admin);

  if (!openChangeStatusFacility) return null;

  const isActive = selectFacility?.isActive;

  const handleClose = () => {
    if (loading) return;

    setOpenChangeStatusFacility(false);
  };

  const handleChangeStatus = async () => {
    if (!selectFacility?._id || loading) return;

    await handleChangeStatusFacilitySubmit(
      selectFacility._id,
      !isActive
    );
  };

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
      onMouseDown={handleClose}
    >
      <div
        dir="rtl"
        className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-800 bg-[#0D1118] shadow-2xl shadow-black/40"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                isActive
                  ? "bg-red-500/10 text-red-400"
                  : "bg-emerald-500/10 text-emerald-400"
              }`}
            >
              <FaPowerOff className="text-sm" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-slate-100">
                {isActive ? "تعطيل المنشأة" : "تفعيل المنشأة"}
              </h2>

              <p className="mt-0.5 text-[11px] text-slate-500">
                تأكيد تغيير حالة المنشأة
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="flex items-center justify-center w-8 h-8 transition-all rounded-lg text-slate-500 hover:bg-slate-800 hover:text-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FaXmark className="text-sm" />
          </button>
        </div>

        {/* Content */}
        <div className="px-5 py-5">
          <div
            className={`mb-5 rounded-xl border p-4 ${
              isActive
                ? "border-red-500/10 bg-red-500/[0.06]"
                : "border-emerald-500/10 bg-emerald-500/[0.06]"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`mt-0.5 ${
                  isActive ? "text-red-400" : "text-emerald-400"
                }`}
              >
                <FaTriangleExclamation className="text-sm" />
              </div>

              <div>
                <p
                  className={`text-xs font-medium ${
                    isActive
                      ? "text-red-300"
                      : "text-emerald-300"
                  }`}
                >
                  {isActive
                    ? "هل تريد تعطيل هذه المنشأة؟"
                    : "هل تريد تفعيل هذه المنشأة؟"}
                </p>

                <p className="mt-1.5 text-[11px] leading-5 text-slate-400">
                  {isActive
                    ? "بعد التعطيل لن تظهر المنشأة للمرضى ضمن نتائج البحث."
                    : "بعد التفعيل ستصبح المنشأة متاحة للظهور للمرضى مرة أخرى."}
                </p>
              </div>
            </div>
          </div>

          {/* Facility */}
          <div className="rounded-xl border border-slate-800 bg-[#080B12] px-4 py-3">
            <p className="mb-1 text-[10px] font-medium text-slate-500">
              المنشأة
            </p>

            <p className="text-sm font-medium truncate text-slate-200">
              {selectFacility?.name || "المنشأة الطبية"}
            </p>

            {selectFacility?.city && (
              <p className="mt-1 text-[11px] text-slate-500">
                {selectFacility.city}
                {selectFacility?.governorate
                  ? `، ${selectFacility.governorate}`
                  : ""}
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 border-t border-slate-800 bg-[#0A0E15] px-5 py-4">
          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="flex-1 rounded-xl border border-slate-700 bg-slate-800/40 px-4 py-2.5 text-xs font-medium text-slate-300 transition-all hover:border-slate-600 hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            إلغاء
          </button>

          <button
            type="button"
            onClick={handleChangeStatus}
            disabled={loading}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold text-white shadow-lg transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${
              isActive
                ? "bg-red-500 shadow-red-500/10 hover:bg-red-600"
                : "bg-emerald-500 shadow-emerald-500/10 hover:bg-emerald-600"
            }`}
          >
            {loading ? (
              <>
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                جاري التحديث...
              </>
            ) : (
              <>
                <FaPowerOff className="text-[11px]" />
                {isActive ? "تعطيل المنشأة" : "تفعيل المنشأة"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeStatus;
