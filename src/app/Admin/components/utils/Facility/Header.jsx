"use client";
import React, { useContext } from "react";
import { FaFileExport, FaPlus } from "react-icons/fa6";
import { admin } from "../../../../providers/AdminContext.jsx";
import AddFacility from "./AddFacility.jsx";

const Header = () => {
  const {openAddFacility, setOpenAddFacility}=useContext(admin)
  return <>
  {
    openAddFacility && <AddFacility/>
  }
  <div className="flex flex-col mt-8 md:mt-14 gap-7 lg:flex-row lg:items-end lg:justify-between">
      {/* Title */}
      <div className="min-w-0">
        <div className="flex items-center gap-3 text-[10px] tracking-[0.3em] text-[#94A3B8]">
          <span className="h-px w-8 bg-[#263244]" />

          <span>02 / FACILITIES</span>

          <span className="text-[#94A3B8]/40">—</span>

          <span>HEALTHCARE NETWORK</span>
        </div>

        <h1 className="mt-5 text-3xl font-semibold leading-[1.3] tracking-tight text-[#F8FAFC] sm:text-4xl lg:text-[42px]">
          المنشآت الطبية
        </h1>

        <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#94A3B8] sm:text-base">
          إدارة كاملة للمنشآت المسجّلة، خدماتها، وسعة أسرّتها في الوقت الفعلي.
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center self-start gap-3 lg:self-auto">
        {/* Export */}
        <button
          className="
            hidden items-center gap-2
            rounded-xl border border-[#263244]
            bg-[#111827]
            px-4 py-3
            text-[12px] text-[#94A3B8]
            transition-all duration-200
            hover:border-[#38BDF8]/40
            hover:text-[#F8FAFC]
            sm:inline-flex
          "
        >
          <FaFileExport className="text-[11px]" />
          تصدير
        </button>

        {/* Add Facility */}
        <button
                onClick={()=>setOpenAddFacility(true)}

          className="
            inline-flex items-center gap-2
            rounded-xl
            bg-[#38BDF8]
            px-5 py-3
            text-[13px] font-medium
            text-[#080B12]
            transition-all duration-200
            hover:bg-[#38BDF8]/90
          "
        >
          <FaPlus className="text-[11px]" />
          إضافة منشأة
        </button>
      </div>
    </div> 
  </>
   
  
};

export default Header;