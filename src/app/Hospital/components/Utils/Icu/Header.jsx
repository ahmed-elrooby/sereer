"use client";

import React, { useContext } from "react";
import { FaHeartPulse, FaPlus, FaRotate } from "react-icons/fa6";
import { Hospital } from "../../../../providers/HospitalContext.jsx";
import AddIcu from "./AddIcu.jsx";

const Header = () => {
  const {openAddIncu,setOpenAddIncu}=useContext(Hospital);
  return <>
  {
    openAddIncu && <AddIcu />
  }
  
  
    <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      {/* Title */}
      <div>
        <div className="flex items-center gap-3">
          <div className="grid w-12 h-12 text-xl text-blue-600 shrink-0 place-items-center rounded-2xl bg-blue-50">
            <FaHeartPulse />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
              العناية المركزة
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              إدارة أسرة العناية المركزة في المستشفى
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          type="button"
        
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:text-blue-600"
        >
          <FaRotate size={14} />
          <span className="hidden sm:inline">تحديث</span>
        </button>

        <button
          type="button"
          onClick={()=>{setOpenAddIncu(true)}}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          <FaPlus size={14} />
          إضافة عنايه
        </button>
      </div>
    </section>
 </>
};

export default Header;