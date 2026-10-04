"use client";

import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import Link from "next/link";

import {
  FaBars,
  FaChevronDown,
  FaUser,
  FaRightFromBracket,
} from "react-icons/fa6";

import { authContext } from "../../../providers/Auth.jsx";

const Header = ({ toggleSidebar }) => {
  const { profile, handleLogoutSubmit } = useContext(authContext);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [currentDate, setCurrentDate] = useState(null);

  const dropdownRef = useRef(null);

  const user = profile?.data?.user;

  const userName = user?.name || "المستخدم";
  const userEmail = user?.email || "";

  const userRole =
    user?.role === "platform_admin"
      ? "مسؤول المنصة"
      : user?.role === "hospital_admin"
      ? "مسؤول المركز"
      : "المستخدم";

  const initials =
    userName
      ?.trim()
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase() || "م";

  // التاريخ الحقيقي
  useEffect(() => {
    const updateDate = () => {
      setCurrentDate(new Date());
    };

    updateDate();

    const timer = setInterval(updateDate, 60 * 1000);

    return () => clearInterval(timer);
  }, []);

  // إغلاق الـ dropdown عند الضغط خارجه
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleLogout = async () => {
    setOpenDropdown(false);

    try {
      await logout?.();
    } catch (error) {
      console.error(error);
    }
  };

  const formattedDate = currentDate
    ? new Intl.DateTimeFormat("ar-EG", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(currentDate)
    : "";

  const formattedDateEnglish = currentDate
    ? new Intl.DateTimeFormat("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
        .format(currentDate)
        .toUpperCase()
    : "";

  return (
    <header className="sticky top-0 z-30 border-b border-[#263244] bg-[#080B12]">
      <div className="flex h-[78px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">

        {/* يمين: القائمة + التاريخ */}
        <div className="flex items-center min-w-0 gap-4">

          <button
            onClick={toggleSidebar}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#263244] text-[#94A3B8] transition-all duration-200 hover:border-[#38BDF8]/40 hover:text-[#F8FAFC] lg:hidden"
            aria-label="القائمة"
          >
            <FaBars className="text-sm" />
          </button>

          <div className="min-w-0">
            <p className="text-[10px] tracking-[0.3em] text-[#94A3B8]">
              {formattedDateEnglish}
            </p>

            <p className="mt-1 truncate text-[13px] text-[#F8FAFC]/90">
              {formattedDate}
            </p>
          </div>
        </div>

        {/* وسط: حالة المنصة */}
        <div className="hidden items-center gap-3 rounded-full border border-[#263244] bg-[#111827]/60 px-4 py-2 md:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />

          <span className="text-[11px] text-[#94A3B8]">
            حالة المنصة
          </span>

          <span className="h-3 w-px bg-[#263244]" />

          <span className="text-[11px] text-[#F8FAFC]">
            تعمل بشكل طبيعي
          </span>
        </div>

        {/* يسار: المستخدم */}
        <div
          ref={dropdownRef}
          className="relative shrink-0"
        >
          <button
            type="button"
            onClick={() =>
              setOpenDropdown((prev) => !prev)
            }
            className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition-all duration-200 hover:bg-[#111827]"
          >
            {/* بيانات المستخدم */}
            <div className="hidden text-left sm:block">
              <p className="max-w-[160px] truncate text-[13px] leading-tight text-[#F8FAFC]">
                {userName}
              </p>

              <p className="mt-1 text-[10px] text-[#94A3B8]">
                {userRole}
              </p>
            </div>

            {/* Avatar */}
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#263244] bg-[#111827] text-[11px] font-medium tracking-wide text-[#38BDF8]">
              {initials}
            </div>

            <FaChevronDown
              className={`hidden text-[9px] text-[#64748B] transition-transform duration-200 sm:block ${
                openDropdown ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown */}
          {openDropdown && (
            <div className="absolute left-0 top-[calc(100%+12px)] z-50 w-[280px] overflow-hidden rounded-2xl border border-[#263244] bg-[#0D111A] shadow-2xl shadow-black/40">

              {/* User information */}
              <div className="border-b border-[#263244] p-4">
                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#263244] bg-[#111827] text-sm font-medium text-[#38BDF8]">
                    {initials}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-medium text-[#F8FAFC]">
                      {userName}
                    </p>

                    <p className="mt-1 truncate text-[10px] text-[#64748B]">
                      {userEmail}
                    </p>

                    <span className="mt-2 inline-flex rounded-md border border-[#38BDF8]/15 bg-[#38BDF8]/5 px-2 py-1 text-[9px] text-[#38BDF8]">
                      {userRole}
                    </span>
                  </div>

                </div>
              </div>

              {/* Actions */}
              <div className="p-2">

                <Link
                  href="/Admin/Profile"
                  onClick={() => setOpenDropdown(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-[12px] text-[#CBD5E1] transition-colors hover:bg-[#111827] hover:text-[#F8FAFC]"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#111827] text-[#38BDF8]">
                    <FaUser className="text-[12px]" />
                  </span>

                  <span>
                    الملف الشخصي
                  </span>
                </Link>

                <div className="my-1 h-px bg-[#263244]" />

                <button
                  type="button"
                  onClick={handleLogoutSubmit}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-[12px] text-[#F87171] transition-colors hover:bg-[#EF4444]/5"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EF4444]/5 text-[#F87171]">
                    <FaRightFromBracket className="text-[12px]" />
                  </span>

                  <span>
                    تسجيل الخروج
                  </span>
                </button>

              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;