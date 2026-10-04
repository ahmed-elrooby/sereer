"use client";

import React, { useContext, useState } from "react";
import {
  FaHeartPulse,
  FaPen,
  FaTrash,
} from "react-icons/fa6";

import { Hospital } from "../../../../providers/HospitalContext.jsx";
import EditUnit from "../Home/EditUnit.jsx";
import DeleteUnit from "../Home/DeleteUnit.jsx";

const Units = () => {
  const {
    units,
    openEditUnit,
    setOpenEditUnit,
    openDeleteUnit,
    setOpenDeleteUnit,
  } = useContext(Hospital);

  const [selectedUnit, setSelectedUnit] = useState(null);

  const icuUnits = (units?.data || []).filter(
    (unit) =>
      unit.type === "ICU" &&
      unit.isActive !== false
  );

  return (
    <>
      {openEditUnit && (
        <EditUnit selectedUnit={selectedUnit} />
      )}

      {openDeleteUnit && (
        <DeleteUnit selectedUnit={selectedUnit} />
      )}

      <section className="my-4 space-y-5 md:my-7">

        {/* Header */}
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              إدارة وحدات العناية المركزة
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              تابع وحدات العناية المركزة وعدد الأسرة المتاحة بها.
            </p>
          </div>
        </div>

        {/* Units */}
        {icuUnits.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {icuUnits.map((unit) => (
              <div
                key={unit._id}
                className="p-5 transition bg-white border shadow-sm rounded-2xl border-slate-200 hover:border-blue-200 hover:shadow-md"
              >

                {/* Top */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center min-w-0 gap-3">

                    <div className="grid text-blue-600 w-11 h-11 rounded-xl bg-blue-50 shrink-0 place-items-center">
                      <FaHeartPulse size={19} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-bold truncate text-slate-900">
                        {unit.name}
                      </p>

                      <p className="mt-1 text-[11px] text-slate-500">
                        العناية المركزة - ICU
                      </p>
                    </div>

                  </div>

                  <span className="whitespace-nowrap rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                    نشطة
                  </span>
                </div>

                {/* Available Beds */}
                <div className="p-4 mt-5 rounded-xl bg-slate-50">
                  <p className="text-xs text-slate-500">
                    الأسرة المتاحة
                  </p>

                  <div className="flex items-end gap-2 mt-1">
                    <span className="text-3xl font-bold text-slate-900">
                      {unit.availableBeds}
                    </span>

                    <span className="pb-1 text-xs text-slate-500">
                      سرير متاح
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2 mt-4">

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedUnit(unit);
                      setOpenEditUnit(true);
                    }}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-blue-600 transition border border-blue-200 rounded-xl hover:bg-blue-50"
                  >
                    <FaPen size={12} />
                    تعديل
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedUnit(unit);
                      setOpenDeleteUnit(true);
                    }}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-red-600 transition border border-red-200 rounded-xl hover:bg-red-50"
                  >
                    <FaTrash size={12} />
                    حذف
                  </button>

                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-5 text-center bg-white border border-dashed rounded-2xl border-slate-300 py-14">

            <div className="grid mx-auto text-blue-500 h-14 w-14 place-items-center rounded-2xl bg-blue-50">
              <FaHeartPulse size={24} />
            </div>

            <h3 className="mt-4 text-base font-bold text-slate-800">
              لا توجد وحدة عناية مركزة
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              لم يتم إضافة وحدة عناية مركزة حتى الآن.
            </p>

          </div>
        )}
      </section>
    </>
  );
};

export default Units;

