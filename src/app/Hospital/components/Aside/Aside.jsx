"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  FaBedPulse,
  FaHouse,
  FaBaby,
  FaHeartPulse,
  FaGear,
  FaHospital,
  FaArrowRightFromBracket,
  FaXmark,
  FaUser,
} from "react-icons/fa6";

import { authContext } from "../../../providers/Auth.jsx";

const Aside = ({ sidebarOpen, setSidebarOpen }) => {
  const { profile,handleLogoutSubmit } = useContext(authContext);

  const pathname = usePathname();

  // خدمات المستشفى
  const services = profile?.data?.facility?.services || [];

  // هل المستشفى عندها حضّانات؟
  const hasNICU = services.includes("NICU");

  // هل المستشفى عندها عناية مركزة؟
  const hasICU = services.includes("ICU");

  const navItems = [
    {
      label: "الرئيسية",
      href: "/Hospital",
      icon: FaHouse,
      show: true,
    },

    {
      label: "الحضّانات",
      href: "/Hospital/Incubators",
      icon: FaBaby,
      show: hasNICU,
    },

    {
      label: "العناية المركزة",
      href: "/Hospital/Icu",
      icon: FaHeartPulse,
      show: hasICU,
    },

    {
      label: "الملف الشخصي",
      href: "/Hospital/Profile",
      icon: FaUser,
      badge: 3,
      show: true,
    },

    
  ];

  return (
    <aside
      className={`fixed inset-y-0 right-0 z-50 flex w-64 flex-col border-l border-slate-200 bg-white transition-transform duration-300 ${
        sidebarOpen
          ? "translate-x-0"
          : "translate-x-full lg:translate-x-0"
      }`}
    >
      {/* Logo */}
      <div className="px-5 py-5 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <Link
            href="/Hospital"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3"
          >
            <div className="grid text-white bg-blue-600 shadow-sm h-11 w-11 place-items-center rounded-xl">
              <FaBedPulse size={22} />
            </div>

            <div>
              <p className="text-xl font-bold leading-tight">
                سرير
              </p>

              <p className="mt-1 text-[11px] text-slate-500">
                أقرب رعاية ليك
              </p>
            </div>
          </Link>

          {/* Close Button - Mobile */}
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            aria-label="إغلاق القائمة"
            className="grid transition rounded-lg h-9 w-9 place-items-center text-slate-400 hover:bg-slate-100 hover:text-slate-700 lg:hidden"
          >
            <FaXmark size={18} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems
          .filter((item) => item.show)
          .map((item) => {
            const Icon = item.icon;

            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                  isActive
                    ? "bg-blue-50 font-semibold text-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon
                  size={17}
                  className={
                    isActive
                      ? "text-blue-600"
                      : "text-slate-400"
                  }
                />

                <span>{item.label}</span>

                {item.badge && (
                  <span className="ms-auto rounded-full bg-red-50 px-2 py-0.5 text-[11px] font-bold text-red-600">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
      </nav>

      {/* Hospital Info */}
      <div className="p-4 space-y-3 border-t border-slate-100">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
          <div className="grid w-10 h-10 text-blue-600 bg-white border rounded-lg shrink-0 place-items-center border-slate-200">
            <FaHospital size={18} />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">
              {profile?.data?.facility?.name || "المستشفى"}
            </p>

            <p className="mt-0.5 text-[11px] text-slate-500">
              مدير المستشفى
            </p>
          </div>
        </div>

        <button
          type="button"onClick={handleLogoutSubmit}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
        >
          <FaArrowRightFromBracket size={15} />
          تسجيل الخروج
        </button>
      </div>
    </aside>
  );
};

export default Aside;

