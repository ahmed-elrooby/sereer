"use client";

import React, { useContext, useMemo } from "react";
import { admin } from "../../../../providers/AdminContext.jsx";

const StatusPlatform = () => {
  const { facility } = useContext(admin);

  const facilities = facility?.facilities || [];

  const stats = useMemo(() => {
    const total = facilities.length;

    const active = facilities.filter(
      (item) => item.isActive === true
    ).length;

    const inactive = facilities.filter(
      (item) => item.isActive === false
    ).length;

    const activePercentage =
      total > 0 ? Math.round((active / total) * 100) : 0;

    return {
      total,
      active,
      inactive,
      activePercentage,
    };
  }, [facilities]);

  return (
    <div className="flex flex-col rounded-2xl border border-[#263244] bg-[#151D2B] p-7">
      <p className="text-[10px] tracking-[0.3em] text-[#94A3B8]">
        SYSTEM STATUS
      </p>

      <h2 className="mt-3 text-lg font-medium text-[#F8FAFC]">
        حالة المنصة
      </h2>

      {/* System Status */}
      <div className="mt-7 flex items-center gap-3 rounded-xl border border-[#22C55E]/25 bg-[#22C55E]/[0.06] px-4 py-3.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />

        <span className="text-[13px] text-[#F8FAFC]">
          تعمل بشكل طبيعي
        </span>

        <span className="ms-auto text-[10px] tabular-nums text-[#22C55E]/80">
          99.98%
        </span>
      </div>

      {/* Stats */}
      <div className="mt-8 space-y-7">
        {/* Active Facilities */}
        <div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#94A3B8]">
              المنشآت النشطة
            </span>

            <span className="text-[#F8FAFC] tabular-nums">
              {stats.active} / {stats.total}
            </span>
          </div>

          <div className="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-[#263244]/70">
            <div
              className="h-full rounded-full bg-[#38BDF8] transition-all duration-500"
              style={{
                width: `${stats.activePercentage}%`,
              }}
            />
          </div>
        </div>

        {/* Inactive Facilities */}
        <div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#94A3B8]">
              المنشآت المتوقفة
            </span>

            <span className="text-[#F8FAFC] tabular-nums">
              {stats.inactive} / {stats.total}
            </span>
          </div>

          <div className="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-[#263244]/70">
            <div
              className="h-full rounded-full bg-[#EF4444] transition-all duration-500"
              style={{
                width:
                  stats.total > 0
                    ? `${(stats.inactive / stats.total) * 100}%`
                    : "0%",
              }}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between pt-8 text-[10px] text-[#94A3B8]/60">
        <span>آخر تحديث: الآن</span>

        <span className="tracking-widest tabular-nums">
          SEERER / SYSTEM
        </span>
      </div>
    </div>
  );
};

export default StatusPlatform;