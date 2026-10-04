
"use client";

import React, { useContext } from "react";
import { FaPlus } from "react-icons/fa6";

import { Hospital } from "../../../../providers/HospitalContext.jsx";
import { authContext } from "../../../../providers/Auth.jsx";
import AddUnits from "./AddUnits.jsx";

const Header = ({ onAddBed }) => {
  const { openAddIncu, setOpenAddIncu } = useContext(Hospital);
  const { profile } = useContext(authContext);

  const services = profile?.data?.facility?.services || [];

  const hasNICU = services.includes("NICU");
  const hasICU = services.includes("ICU");

  return <>
  {openAddIncu && <AddUnits />}
 
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
        onClick={()=>{
          setOpenAddIncu(true)
        }}
        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white transition bg-blue-600 shadow-sm rounded-xl hover:bg-blue-700"
      >
        <FaPlus size={14} />
        إضافة سرير
      </button>
    </div>
</>
};

export default Header;
