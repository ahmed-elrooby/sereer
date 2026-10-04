"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import {
  FaBars,
  FaHospital,
  FaUser,
  FaRightFromBracket,
  FaChevronDown,
} from "react-icons/fa6";

import { authContext } from "../../../providers/Auth.jsx";
import { useRouter } from "next/navigation.js";

const Header = ({ onMenuClick }) => {
  const { profile,handleLogoutSubmit } = useContext(authContext);
const router = useRouter()
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const userName = profile?.data?.user?.name || "مدير المستشفى";
  const facilityName =
    profile?.data?.facility?.name || "المستشفى";

  const userInitial = userName?.charAt(0) || "م";

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/85 backdrop-blur">
      <div className="flex h-[73px] items-center gap-3 px-4 sm:px-6 lg:px-8">
        {/* Mobile Menu */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="فتح القائمة"
          className="grid w-10 h-10 transition bg-white border shrink-0 place-items-center rounded-xl border-slate-200 text-slate-600 hover:border-blue-200 hover:text-blue-600 lg:hidden"
        >
          <FaBars size={16} />
        </button>

        {/* Hospital Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <FaHospital
              size={16}
              className="hidden text-blue-600 shrink-0 sm:block"
            />

            <h1 className="text-base font-bold truncate text-slate-900 sm:text-xl">
              مرحبًا، {facilityName}
            </h1>
          </div>

          <p className="mt-0.5 truncate text-[11px] text-slate-500 sm:text-sm">
            تابع حالة الأسرة والخدمات المتاحة في المستشفى
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0 sm:gap-3">
          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-expanded={isOpen}
              className={`flex items-center gap-2 py-1 transition bg-white border rounded-xl pe-1 ps-2 ${
                isOpen
                  ? "border-blue-300 ring-4 ring-blue-50"
                  : "border-slate-200 hover:border-blue-200"
              }`}
            >
              {/* Avatar */}
              <div className="grid w-8 h-8 text-sm font-bold text-blue-600 rounded-lg place-items-center bg-blue-50">
                {userInitial}
              </div>

              {/* User Info */}
              <div className="hidden leading-tight text-right pe-1 sm:block">
                <p className="text-xs font-semibold text-slate-800">
                  د. {userName}
                </p>

                <p className="mt-0.5 text-[10px] text-slate-500">
                  مدير المستشفى
                </p>
              </div>

              <FaChevronDown
                size={10}
                className={`hidden text-slate-400 transition-transform sm:block ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown */}
            {isOpen && (
              <div className="absolute left-0 z-50 w-[260px] mt-3 overflow-hidden bg-white border shadow-xl top-full rounded-2xl border-slate-200">
                {/* User Header */}
                <div className="p-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="grid font-bold text-blue-600 w-11 h-11 rounded-xl place-items-center bg-blue-50">
                      {userInitial}
                    </div>

                    <div className="min-w-0">
                      <p className="font-bold truncate text-slate-900">
                        د. {userName}
                      </p>

                      <p className="mt-0.5 text-xs truncate text-slate-500">
                        {facilityName}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Menu */}
                <div className="p-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      router.push("/Hospital/Profile");
                    }}
                    className="flex items-center w-full gap-3 px-3 py-2.5 text-sm font-medium transition rounded-xl text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <span className="grid rounded-lg w-9 h-9 place-items-center bg-slate-50 text-slate-500">
                      <FaUser size={14} />
                    </span>

                    <span>الملف الشخصي</span>
                  </button>

                  <div className="h-px my-1 bg-slate-100" />

                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
handleLogoutSubmit()
                      // ضع هنا دالة تسجيل الخروج الموجودة عندك
                    }}
                    className="flex items-center w-full gap-3 px-3 py-2.5 text-sm font-medium text-red-600 transition rounded-xl hover:bg-red-50"
                  >
                    <span className="grid text-red-500 rounded-lg w-9 h-9 place-items-center bg-red-50">
                      <FaRightFromBracket size={14} />
                    </span>

                    <span>تسجيل الخروج</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

