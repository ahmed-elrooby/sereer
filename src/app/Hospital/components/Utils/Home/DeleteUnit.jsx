"use client";

import React, { useContext } from "react";
import { FaTrash, FaXmark, FaBed } from "react-icons/fa6";

import { Hospital } from "../../../../providers/HospitalContext.jsx";

const DeleteUnit = ({ selectedUnit }) => {
  const {
    handleDeleteUnitSubmit,
    openDeleteUnit,
    setOpenDeleteUnit,
  } = useContext(Hospital);

  if (!openDeleteUnit || !selectedUnit) return null;

  const getUnitTypeName = (type) => {
    if (type === "NICU") return "حضّانات الأطفال";
    if (type === "ICU") return "العناية المركزة";
    return "وحدة";
  };

  const handleDelete = async () => {
    await handleDeleteUnitSubmit(selectedUnit._id);
    setOpenDeleteUnit(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden bg-white shadow-2xl rounded-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              حذف الوحدة
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              تأكيد حذف الوحدة من لوحة التحكم
            </p>
          </div>

          <button
            type="button"
            onClick={() => setOpenDeleteUnit(false)}
            className="grid transition rounded-lg w-9 h-9 place-items-center text-slate-500 bg-slate-50 hover:bg-slate-100 hover:text-slate-700"
          >
            <FaXmark size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Warning */}
          <div className="flex items-start gap-3 p-4 border border-red-100 rounded-xl bg-red-50">
            <div className="grid w-10 h-10 text-red-600 bg-white rounded-xl shrink-0 place-items-center">
              <FaTrash size={16} />
            </div>

            <div>
              <p className="text-sm font-bold text-red-700">
                هل أنت متأكد من حذف هذه الوحدة؟
              </p>

              <p className="mt-1 text-xs leading-5 text-red-600/80">
                سيتم حذف الوحدة من قائمة الوحدات ولن تظهر ضمن الأسرة
                المتاحة.
              </p>
            </div>
          </div>

          {/* Unit Info */}
          <div className="flex items-center gap-3 p-4 mt-4 border rounded-xl border-slate-200 bg-slate-50">
            <div className="grid text-blue-600 bg-blue-100 w-11 h-11 rounded-xl shrink-0 place-items-center">
              <FaBed size={18} />
            </div>

            <div>
              <p className="text-sm font-bold text-slate-900">
                {selectedUnit.name}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {getUnitTypeName(selectedUnit.type)}
              </p>
            </div>

            <div className="mr-auto text-left">
              <p className="text-xs text-slate-500">
                الأسرة المتاحة
              </p>

              <p className="text-lg font-bold text-slate-900">
                {selectedUnit.availableBeds}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-5 py-4 border-t bg-slate-50 border-slate-200">
          <button
            type="button"
            onClick={() => setOpenDeleteUnit(false)}
            className="flex-1 px-4 py-2.5 text-sm font-semibold transition bg-white border rounded-xl border-slate-300 text-slate-700 hover:bg-slate-100"
          >
            إلغاء
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white transition bg-red-600 rounded-xl hover:bg-red-700"
          >
            <FaTrash size={13} />
            تأكيد الحذف
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUnit;