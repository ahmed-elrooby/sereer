"use client";

import React, { useContext } from "react";
import { admin } from "../../../../providers/AdminContext.jsx";
import Link from "next/link.js";
const Table = () => {
  const { facility } = useContext(admin);

  const facilities = facility?.facilities || [];

  // آخر 4 منشآت
  const recentFacilities = [...facilities]
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    )
    .slice(0, 4);

  return (
    <div className="md:col-span-2 overflow-hidden rounded-2xl border border-[#263244] bg-[#151D2B]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pb-5 pt-7 sm:px-8">
        <div>
          <p className="text-[10px] tracking-[0.3em] text-[#94A3B8]">
            RECENT
          </p>

          <h2 className="mt-3 text-lg font-medium text-[#F8FAFC]">
            آخر المنشآت الطبية
          </h2>
        </div>

        <Link href="/Admin/Facility" className="text-[11px] text-[#94A3B8] transition-colors duration-200 hover:text-[#38BDF8]">
          عرض الكل ←
        </Link>
      </div>

      {/* Rows */}
      <div className="divide-y divide-[#263244]/70">
        {recentFacilities.length > 0 ? (
          recentFacilities.map((item) => {
            const isActive = item.isActive === true;

            return (
              <div
                key={item._id}
                className="group grid grid-cols-12 items-center gap-3 px-6 py-4 transition-all duration-200 hover:bg-[#111827] sm:px-8"
              >
                {/* Facility */}
                <div className="flex items-center min-w-0 col-span-12 gap-3 sm:col-span-5">
                  <span
                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                      isActive
                        ? "bg-[#22C55E]"
                        : "bg-[#EF4444]"
                    }`}
                  />

                  <div className="min-w-0">
                    <p className="truncate text-sm text-[#F8FAFC]">
                      {item.name}
                    </p>

                    <p className="mt-0.5 text-[11px] text-[#94A3B8]">
                      {item.city}
                    </p>
                  </div>
                </div>

                {/* Services */}
                <div className="col-span-6 flex flex-wrap gap-1.5 sm:col-span-3">
                  {item.services?.length > 0 ? (
                    item.services.map((service) => (
                      <span
                        key={service}
                        className="rounded-md border border-[#263244] px-2 py-0.5 text-[10px] text-[#94A3B8]"
                      >
                        {service}
                      </span>
                    ))
                  ) : (
                    <span className="text-[10px] text-[#64748B]">
                      لا توجد خدمات
                    </span>
                  )}
                </div>

                {/* Status */}
                <div
                  className={`col-span-6 flex items-center gap-1.5 text-[11px] sm:col-span-2 ${
                    isActive
                      ? "text-[#22C55E]"
                      : "text-[#EF4444]"
                  }`}
                >
                  <span
                    className={`h-1 w-1 rounded-full ${
                      isActive
                        ? "bg-[#22C55E]"
                        : "bg-[#EF4444]"
                    }`}
                  />

                  {isActive ? "نشطة" : "متوقفة"}
                </div>

                {/* Action */}
                <div className="flex col-span-12 sm:col-span-2 sm:justify-end">
                <span>{item.phone}</span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="px-6 py-12 text-center text-sm text-[#94A3B8]">
            لا توجد منشآت طبية
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;