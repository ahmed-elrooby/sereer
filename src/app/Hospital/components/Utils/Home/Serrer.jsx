"use client";

import React, { useContext, useState } from "react";
import {
  FaBed,
  FaPen,
  FaTrash,
} from "react-icons/fa6";

import { Hospital } from "../../../../providers/HospitalContext.jsx";
import EditUnit from "./EditUnit.jsx";
import DeleteUnit from "./DeleteUnit.jsx";

const Serrer = () => {
  const {
    units,openDeleteUnit,setOpenDeleteUnit,openEditUnit,setOpenEditUnit
  } = useContext(Hospital);
const [selectedUnit, setSelectedUnit] = useState(null);
  const unitsData = units?.data || [];

  const activeUnits = unitsData.filter(
    (unit) => unit.isActive !== false
  );

  const getUnitTypeName = (type) => {
    if (type === "NICU") return "حضّانات الأطفال";
    if (type === "ICU") return "العناية المركزة";

    return "وحدة";
  };

  

  if (activeUnits.length === 0) {
    return (
      <div className="px-5 mt-6 text-center bg-white border border-dashed py-14 rounded-2xl border-slate-300">
        <div className="grid mx-auto h-14 w-14 place-items-center rounded-2xl bg-slate-50 text-slate-400">
          <FaBed size={24} />
        </div>

        <h3 className="mt-4 text-base font-bold text-slate-800">
          لا توجد وحدات مضافة
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          لم يتم إضافة أي وحدة حضّانات أو عناية مركزة حتى الآن.
        </p>
      </div>
    );
  }

  return <>
  {
    openEditUnit && <EditUnit selectedUnit={selectedUnit} />
  }
  {
    openDeleteUnit && <DeleteUnit selectedUnit={selectedUnit} />
  }
  
 
    <div className="mt-6 space-y-4">
      {activeUnits.map((unit) => (
        <div
          key={unit._id}
          className="flex flex-col justify-between gap-4 p-5 transition bg-white border shadow-sm rounded-2xl border-slate-200 sm:flex-row sm:items-center hover:shadow-md"
        >
          {/* Unit Info */}
          <div className="flex items-center gap-4">
            <div className="grid w-12 h-12 text-blue-600 rounded-xl bg-blue-50 shrink-0 place-items-center">
              <FaBed size={20} />
            </div>

            <div>
              <p className="text-base font-bold text-slate-900">
                {unit.name}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {getUnitTypeName(unit.type)}
              </p>
            </div>
          </div>

          {/* Available Beds + Actions */}
          <div className="flex items-center justify-between gap-5 sm:justify-end sm:gap-8">
            <div>
              <p className="text-xs text-slate-500">
                الأسرة المتاحة
              </p>

              <p className="mt-1 text-2xl font-bold text-slate-900">
                {unit.availableBeds}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* Edit */}
              <button
              onClick={()=>{
                setSelectedUnit(unit)
                setOpenEditUnit(true)
              }}
                type="button"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-blue-600 transition border border-blue-200 rounded-xl hover:bg-blue-50"
              >
                <FaPen size={12} />
                تعديل
              </button>

              {/* Delete */}
              <button
                type="button"
                onClick={()=>{
                  setSelectedUnit(unit)
                  setOpenDeleteUnit(true)
                }}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-red-600 transition border border-red-200 rounded-xl hover:bg-red-50"
              >
                <FaTrash size={12} />
                حذف
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </>;
};

export default Serrer;
