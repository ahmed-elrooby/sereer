"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";

const Aside = ({ sidebarOpen, closeSidebar }) => {
  const pathname = usePathname();

  const mainLinks = [
    {
      number: "01",
      label: "الرئيسية",
      href: "/Admin",
    },
    {
      number: "02",
      label: "المنشآت الطبية",
      href: "/Admin/Facility",
    },
    {
      number: "03",
      label: "حسابات المنشآت",
      href: "/Admin/Accounts",
    },
  ];

  const accountLinks = [
    {
      number: "04",
      label: "البروفايل",
      href: "/Admin/Profile",
    },
  ];

  const isActive = (href) => {
    return pathname === href;
  };

  return (
    <>
      {/* Overlay */}
      {sidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      <aside
        id="sidebar"
        className={`
          fixed inset-y-0 right-0 z-50
          flex h-screen w-[250px] shrink-0 flex-col
          border-l border-[#263244]
          bg-[#0B0F16]
          transition-transform duration-300 ease-out

          ${sidebarOpen ? "translate-x-0" : "translate-x-full"}

          lg:sticky lg:right-auto lg:top-0
          lg:translate-x-0
        `}
        dir="rtl"
      >
        {/* Brand */}
        <div className="border-b border-[#263244] px-7 pb-7 pt-8">
          <div className="flex items-center gap-3">
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#263244] bg-[#111827]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8]" />

              <span className="absolute right-[7px] top-[7px] h-[3px] w-[3px] rounded-full bg-[#94A3B8]/50" />

              <span className="absolute bottom-[7px] left-[7px] h-[3px] w-[3px] rounded-full bg-[#94A3B8]/50" />
            </span>

            <span className="text-xl font-semibold tracking-[0.22em] text-[#F8FAFC]">
              SEERER
            </span>
          </div>

          <p className="mt-3 text-[11px] leading-relaxed text-[#94A3B8]">
            منصة إدارة الرعاية الصحية
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 overflow-y-auto py-7">
          {/* Main */}
          <p className="px-3 pb-3 text-[10px] tracking-[0.32em] text-[#94A3B8]/60">
            MAIN
          </p>

          <ul className="space-y-1">
            {mainLinks.map((link) => {
              const active = isActive(link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeSidebar}
                    className={`
                      group relative flex w-full items-center gap-4
                      rounded-xl px-3.5 py-3.5
                      text-sm transition-all duration-200

                      ${
                        active
                          ? "bg-[#111827] text-[#F8FAFC]"
                          : "text-[#94A3B8] hover:bg-[#111827] hover:text-[#F8FAFC]"
                      }
                    `}
                  >
                    {/* Active Accent */}
                    <span
                      className={`
                        absolute right-0 top-1/2
                        h-6 w-[2px]
                        -translate-y-1/2
                        rounded-full
                        bg-[#38BDF8]
                        transition-opacity duration-200

                        ${
                          active
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                        }
                      `}
                    />

                    {/* Number */}
                    <span
                      className={`
                        text-[11px] tabular-nums
                        transition-colors duration-200

                        ${
                          active
                            ? "text-[#38BDF8]"
                            : "text-[#94A3B8]/70 group-hover:text-[#38BDF8]"
                        }
                      `}
                    >
                      {link.number}
                    </span>

                    {/* Label */}
                    <span>{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Account */}
          <p className="px-3 pb-3 pt-8 text-[10px] tracking-[0.32em] text-[#94A3B8]/60">
            الحساب
          </p>

          <ul className="space-y-1">
            {accountLinks.map((link) => {
              const active = isActive(link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeSidebar}
                    className={`
                      group relative flex w-full items-center gap-4
                      rounded-xl px-3.5 py-3.5
                      text-sm transition-all duration-200

                      ${
                        active
                          ? "bg-[#111827] text-[#F8FAFC]"
                          : "text-[#94A3B8] hover:bg-[#111827] hover:text-[#F8FAFC]"
                      }
                    `}
                  >
                    {/* Active Accent */}
                    <span
                      className={`
                        absolute right-0 top-1/2
                        h-6 w-[2px]
                        -translate-y-1/2
                        rounded-full
                        bg-[#38BDF8]
                        transition-opacity duration-200

                        ${
                          active
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                        }
                      `}
                    />

                    {/* Number */}
                    <span
                      className={`
                        text-[11px] tabular-nums
                        transition-colors duration-200

                        ${
                          active
                            ? "text-[#38BDF8]"
                            : "text-[#94A3B8]/70 group-hover:text-[#38BDF8]"
                        }
                      `}
                    >
                      {link.number}
                    </span>

                    {/* Label */}
                    <span>{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-[#263244] px-4 pb-6 pt-5">
          <button
            className="
              flex w-full items-center justify-between
              rounded-xl px-3.5 py-3
              text-sm text-[#94A3B8]
              transition-all duration-200
              hover:bg-[#111827]
              hover:text-[#EF4444]
            "
          >
            <span>تسجيل الخروج</span>

            <FaArrowLeft className="text-[10px]" />
          </button>

          <p className="mt-4 px-3.5 text-[10px] tracking-[0.2em] text-[#94A3B8]/40">
            V 2.4.0 — SEERER
          </p>
        </div>
      </aside>
    </>
  );
};

export default Aside;