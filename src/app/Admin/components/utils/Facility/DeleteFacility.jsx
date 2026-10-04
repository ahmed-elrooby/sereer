
"use client";

import React, { useContext } from "react";
import { admin } from "../../../../providers/AdminContext.jsx";

import {
  FaTrash,
  FaTriangleExclamation,
  FaXmark,
} from "react-icons/fa6";

const DeleteFacility = ({ selectFacility }) => {
  const {
    setOpenDeleteFacility,
    openDeteFacility,
    handleDeleteFacilitySubmit,
    loading,
  } = useContext(admin);

  if (!openDeteFacility) {
    return null;
  }

  const handleClose = () => {
    if (loading) return;
    setOpenDeleteFacility(false);
  };

  const handleDelete = async () => {
    if (!selectFacility?._id || loading) return;

    await handleDeleteFacilitySubmit(selectFacility._id);
  };

  return (
    <div
      className="
        fixed inset-0 z-[999]
        flex items-center justify-center
        bg-black/70
        px-4
        backdrop-blur-sm
      "
      onMouseDown={handleClose}
    >
      <div
        className="
          w-full max-w-md
          overflow-hidden
          rounded-2xl
          border border-slate-800
          bg-[#0D1118]
          shadow-2xl shadow-black/40
        "
        onMouseDown={(e) => e.stopPropagation()}
        dir="rtl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 text-red-400 rounded-xl bg-red-500/10">
              <FaTrash className="text-sm" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-slate-100">
                حذف المنشأة
              </h2>

              <p className="mt-0.5 text-[11px] text-slate-500">
                تأكيد عملية الحذف
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
          {/* Warning */}
          <div className="mb-5 rounded-xl border border-red-500/10 bg-red-500/[0.06] p-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-red-400">
                <FaTriangleExclamation className="text-sm" />
              </div>

              <div>
                <p className="text-xs font-medium text-red-300">
                  انتبه، هذا الإجراء لا يمكن التراجع عنه
                </p>

                <p className="mt-1.5 text-[11px] leading-5 text-slate-400">
                  سيتم حذف المنشأة وحساب المسؤول والوحدات التابعة
                  لها نهائيًا.
                </p>
              </div>
            </div>
          </div>

          {/* Facility */}
          <div className="rounded-xl border border-slate-800 bg-[#080B12] px-4 py-3">
            <p className="mb-1 text-[10px] font-medium text-slate-500">
              المنشأة المراد حذفها
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
            className="
              flex-1
              rounded-xl
              border border-slate-700
              bg-slate-800/40
              px-4 py-2.5
              text-xs font-medium
              text-slate-300
              transition-all
              hover:border-slate-600
              hover:bg-slate-800
              hover:text-white
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            إلغاء
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="
              flex flex-1
              items-center justify-center
              gap-2
              rounded-xl
              bg-red-500
              px-4 py-2.5
              text-xs font-semibold
              text-white
              shadow-lg shadow-red-500/10
              transition-all duration-200
              hover:bg-red-600
              active:scale-[0.98]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {loading ? (
              <>
                <span
                  className="
                    h-3.5 w-3.5
                    animate-spin
                    rounded-full
                    border-2
                    border-white/30
                    border-t-white
                  "
                />
                جاري الحذف...
              </>
            ) : (
              <>
                <FaTrash className="text-[11px]" />
                حذف المنشأة
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteFacility;
