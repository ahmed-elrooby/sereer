"use client";

import React, { useMemo, useState } from "react";
import {
  FaMagnifyingGlass,
  FaChevronDown,
  FaPenToSquare,
  FaArrowLeft,
  FaBan,
  FaCheck,
  FaUser,
  FaRotateLeft,
} from "react-icons/fa6";

const accountsData = [
  {
    id: "user-1",
    name: "محمد عبد الرحمن",
    email: "m.abdelrahman@seerer.io",
    facility: "مستشفى بني سويف العام",
    facilityId: "SEC-1024",
    role: "مسؤول منشأة",
    status: "active",
    lastLogin: "اليوم · 08:42",
  },
  {
    id: "user-2",
    name: "سارة حسن",
    email: "s.hassan@seerer.io",
    facility: "مستشفى النور",
    facilityId: "SEC-1025",
    role: "مسؤول منشأة",
    status: "active",
    lastLogin: "اليوم · 07:15",
  },
  {
    id: "user-3",
    name: "خالد مصطفى",
    email: "k.mostafa@seerer.io",
    facility: "مستشفى السلام",
    facilityId: "SEC-1026",
    role: "مسؤول منشأة",
    status: "suspended",
    lastLogin: "12 سبتمبر · 14:08",
  },
  {
    id: "user-4",
    name: "نورهان إبراهيم",
    email: "n.ibrahim@seerer.io",
    facility: "مركز الشفاء التخصصي",
    facilityId: "SEC-1027",
    role: "مسؤول منشأة",
    status: "active",
    lastLogin: "أمس · 19:33",
  },
  {
    id: "user-5",
    name: "عمر سيد",
    email: "o.sayed@seerer.io",
    facility: "مستشفى المستقبل",
    facilityId: "SEC-1029",
    role: "مسؤول منشأة",
    status: "active",
    lastLogin: "اليوم · 06:58",
  },
  {
    id: "user-6",
    name: "منى فؤاد",
    email: "m.fouad@seerer.io",
    facility: "مستشفى الشروق",
    facilityId: "SEC-1030",
    role: "مسؤول منشأة",
    status: "active",
    lastLogin: "أمس · 22:01",
  },
  {
    id: "user-7",
    name: "حسن محمود",
    email: "h.mahmoud@seerer.io",
    facility: "مستشفى الرحمة",
    facilityId: "SEC-1031",
    role: "مسؤول منشأة",
    status: "active",
    lastLogin: "اليوم · 09:11",
  },
];

const Table = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [accounts, setAccounts] = useState(accountsData);

  const filteredAccounts = useMemo(() => {
    let result = [...accounts];

    // Search
    if (search.trim()) {
      const value = search.trim().toLowerCase();

      result = result.filter(
        (account) =>
          account.name.toLowerCase().includes(value) ||
          account.email.toLowerCase().includes(value) ||
          account.facility.toLowerCase().includes(value)
      );
    }

    // Status
    if (statusFilter !== "all") {
      result = result.filter(
        (account) => account.status === statusFilter
      );
    }

    // Sort
    if (sortBy === "name") {
      result.sort((a, b) =>
        a.name.localeCompare(b.name, "ar")
      );
    }

    if (sortBy === "facility") {
      result.sort((a, b) =>
        a.facility.localeCompare(b.facility, "ar")
      );
    }

    return result;
  }, [accounts, search, statusFilter, sortBy]);

  const toggleAccountStatus = (id) => {
    setAccounts((prev) =>
      prev.map((account) =>
        account.id === id
          ? {
              ...account,
              status:
                account.status === "active"
                  ? "suspended"
                  : "active",
            }
          : account
      )
    );
  };

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setSortBy("recent");
  };

  const getInitials = (name) => {
    const parts = name.trim().split(" ");

    if (parts.length >= 2) {
      return `${parts[0][0]} ${parts[1][0]}`;
    }

    return parts[0]?.[0] || "";
  };

  return (
    <div>
      {/* Search + Filters */}
      <div className="flex flex-col gap-3 mt-10 lg:flex-row">
        {/* Search */}
        <div className="relative flex-1 min-w-0">
          <FaMagnifyingGlass className="absolute right-4 top-1/2 -translate-y-1/2 text-[12px] text-[#94A3B8]" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث بالاسم، البريد الإلكتروني، أو المنشأة..."
            className="w-full rounded-xl border border-[#263244] bg-[#111827] py-3.5 pl-4 pr-11 text-sm text-[#F8FAFC] outline-none transition-all duration-200 placeholder:text-[#94A3B8]/60 focus:border-[#38BDF8]/50"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 pb-1 overflow-x-auto lg:pb-0">
          <button
            onClick={() => setStatusFilter("all")}
            className={`shrink-0 rounded-xl border px-4 py-3.5 text-[12px] transition-all duration-200 ${
              statusFilter === "all"
                ? "border-[#263244] bg-[#111827] text-[#F8FAFC]"
                : "border-[#263244] text-[#94A3B8] hover:text-[#F8FAFC]"
            }`}
          >
            الكل
          </button>

          <button
            onClick={() => setStatusFilter("active")}
            className={`shrink-0 rounded-xl border px-4 py-3.5 text-[12px] transition-all duration-200 ${
              statusFilter === "active"
                ? "border-[#22C55E]/30 bg-[#22C55E]/[0.06] text-[#22C55E]"
                : "border-[#263244] text-[#94A3B8] hover:text-[#F8FAFC]"
            }`}
          >
            نشط
          </button>

          <button
            onClick={() => setStatusFilter("suspended")}
            className={`shrink-0 rounded-xl border px-4 py-3.5 text-[12px] transition-all duration-200 ${
              statusFilter === "suspended"
                ? "border-[#EF4444]/30 bg-[#EF4444]/[0.06] text-[#EF4444]"
                : "border-[#263244] text-[#94A3B8] hover:text-[#F8FAFC]"
            }`}
          >
            متوقف
          </button>
        </div>

        {/* Sort */}
        <div className="relative shrink-0">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="cursor-pointer appearance-none rounded-xl border border-[#263244] bg-[#111827] px-4 py-3.5 pr-10 text-[12px] text-[#F8FAFC] outline-none transition-all duration-200 focus:border-[#38BDF8]/50"
          >
            <option value="recent">الأحدث</option>
            <option value="name">الاسم (أ-ي)</option>
            <option value="facility">المنشأة</option>
          </select>

          <FaChevronDown className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[10px] text-[#94A3B8]" />
        </div>
      </div>

      {/* Result Count */}
      <div className="mt-6 flex items-center justify-between text-[11px] text-[#94A3B8]">
        <p>
          <span className="tabular-nums text-[#F8FAFC]">
            {filteredAccounts.length}
          </span>

          <span className="mx-1.5">/</span>

          <span>24 حساب</span>
        </p>

        <p className="hidden tracking-[0.2em] text-[#94A3B8]/50 sm:block">
          SORTED BY —{" "}
          {sortBy === "recent"
            ? "RECENT"
            : sortBy.toUpperCase()}
        </p>
      </div>

      {/* Table */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-[#263244] bg-[#151D2B]">
        {/* Column Labels */}
        <div className="hidden grid-cols-12 gap-4 border-b border-[#263244] px-6 py-4 text-[10px] tracking-[0.22em] text-[#94A3B8]/70 lg:grid">
          <span className="col-span-4">المسؤول</span>
          <span className="col-span-3">المنشأة</span>
          <span className="col-span-1">الدور</span>
          <span className="col-span-2">آخر دخول</span>
          <span className="col-span-2 text-left">
            إجراءات
          </span>
        </div>

        {/* Rows */}
        {filteredAccounts.length > 0 && (
          <div className="divide-y divide-[#263244]/70">
            {filteredAccounts.map((account) => {
              const isActive = account.status === "active";

              return (
                <article
                  key={account.id}
                  className="grid cursor-pointer grid-cols-12 items-center gap-4 px-6 py-5 transition-all duration-200 hover:bg-[#111827]"
                >
                  {/* Admin */}
                  <div className="flex items-center min-w-0 col-span-12 gap-3 lg:col-span-4">
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#263244] bg-[#111827] text-[11px] ${
                        isActive
                          ? "text-[#38BDF8]"
                          : "text-[#EF4444]"
                      }`}
                    >
                      {getInitials(account.name)}
                    </span>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm text-[#F8FAFC]">
                          {account.name}
                        </p>

                        <span
                          className={`hidden items-center gap-1.5 rounded-md border px-2 py-0.5 text-[9px] sm:inline-flex ${
                            isActive
                              ? "border-[#22C55E]/25 bg-[#22C55E]/[0.06] text-[#22C55E]"
                              : "border-[#EF4444]/25 bg-[#EF4444]/[0.06] text-[#EF4444]"
                          }`}
                        >
                          <span
                            className={`h-1 w-1 rounded-full ${
                              isActive
                                ? "bg-[#22C55E]"
                                : "bg-[#EF4444]"
                            }`}
                          />

                          {isActive ? "نشط" : "متوقف"}
                        </span>
                      </div>

                      <p className="mt-1 truncate text-[11px] text-[#94A3B8]">
                        {account.email}
                      </p>
                    </div>
                  </div>

                  {/* Facility */}
                  <div className="min-w-0 col-span-12 lg:col-span-3">
                    <p className="truncate text-[12px] text-[#F8FAFC]">
                      {account.facility}
                    </p>

                    <p className="mt-1 text-[10px] text-[#94A3B8] tabular-nums">
                      {account.facilityId}
                    </p>
                  </div>

                  {/* Role */}
                  <div className="col-span-6 lg:col-span-1">
                    <span className="inline-flex whitespace-nowrap rounded-md border border-[#38BDF8]/25 bg-[#38BDF8]/[0.06] px-2 py-0.5 text-[10px] text-[#38BDF8]">
                      رئيسي
                    </span>
                  </div>

                  {/* Last Login */}
                  <div className="col-span-6 text-[11px] text-[#94A3B8] tabular-nums lg:col-span-2">
                    {account.lastLogin}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center col-span-12 gap-1 lg:col-span-2 lg:justify-end">
                    {/* Edit */}
                    <button
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-[#94A3B8] transition-all duration-200 hover:bg-[#080B12] hover:text-[#38BDF8]"
                      aria-label="تعديل"
                      title="تعديل"
                    >
                      <FaPenToSquare className="text-[13px]" />
                    </button>

                    {/* View */}
                    <button
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-[#94A3B8] transition-all duration-200 hover:bg-[#080B12] hover:text-[#38BDF8]"
                      aria-label="عرض"
                      title="عرض"
                    >
                      <FaArrowLeft className="text-[12px]" />
                    </button>

                    {/* Suspend / Activate */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleAccountStatus(account.id);
                      }}
                      className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200 ${
                        isActive
                          ? "text-[#94A3B8] hover:bg-[#080B12] hover:text-[#EF4444]"
                          : "text-[#22C55E] hover:bg-[#080B12] hover:text-[#22C55E]"
                      }`}
                      aria-label={
                        isActive
                          ? "تعطيل الحساب"
                          : "تفعيل الحساب"
                      }
                      title={
                        isActive
                          ? "تعطيل الحساب"
                          : "تفعيل الحساب"
                      }
                    >
                      {isActive ? (
                        <FaBan className="text-[12px]" />
                      ) : (
                        <FaCheck className="text-[12px]" />
                      )}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {filteredAccounts.length === 0 && (
          <div className="px-6 py-20 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#263244] bg-[#111827]">
              <FaUser className="text-sm text-[#94A3B8]" />
            </div>

            <p className="mt-5 text-sm text-[#F8FAFC]">
              لا توجد حسابات مطابقة
            </p>

            <p className="mt-2 text-[12px] text-[#94A3B8]">
              جرّب تعديل معايير البحث أو الفلاتر.
            </p>

            <button
              onClick={resetFilters}
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-[#263244] px-5 py-2.5 text-[12px] text-[#94A3B8] transition-all duration-200 hover:border-[#38BDF8]/40 hover:text-[#F8FAFC]"
            >
              <FaRotateLeft className="text-[10px]" />
              إعادة تعيين الفلاتر
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
