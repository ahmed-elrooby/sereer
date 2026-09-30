"use client";

import React, { useMemo, useState } from "react";
import {
  FaHeartPulse,
  FaClock,
  FaMagnifyingGlass,
  FaArrowsRotate,
  FaUser,
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa6";

const icuBedsData = [
  {
    id: "icu-1",
    number: "01",
    status: "available",
    updated: "منذ 3 دقيقة",
  },
  {
    id: "icu-2",
    number: "02",
    status: "occupied",
    patientName: "أحمد م.",
    caseType: "حالة حرجة",
    updated: "منذ 8 دقيقة",
  },
  {
    id: "icu-3",
    number: "03",
    status: "maintenance",
    updated: "منذ ساعة",
  },
  {
    id: "icu-4",
    number: "04",
    status: "available",
    updated: "منذ 12 دقيقة",
  },
  {
    id: "icu-5",
    number: "05",
    status: "occupied",
    patientName: "محمد ع.",
    caseType: "رعاية تنفسية",
    updated: "منذ 5 دقيقة",
  },
  {
    id: "icu-6",
    number: "06",
    status: "occupied",
    patientName: "خالد س.",
    caseType: "حالة حرجة",
    updated: "منذ ساعة",
  },
  {
    id: "icu-7",
    number: "07",
    status: "available",
    updated: "منذ 25 دقيقة",
  },
  {
    id: "icu-8",
    number: "08",
    status: "occupied",
    patientName: "محمود ر.",
    caseType: "رعاية مركزة",
    updated: "منذ 2 دقيقة",
  },
  {
    id: "icu-9",
    number: "09",
    status: "occupied",
    patientName: "حسن ب.",
    caseType: "حالة حرجة",
    updated: "منذ 47 دقيقة",
  },
  {
    id: "icu-10",
    number: "10",
    status: "available",
    updated: "منذ 15 دقيقة",
  },
  {
    id: "icu-11",
    number: "11",
    status: "occupied",
    patientName: "عمر س.",
    caseType: "رعاية تنفسية",
    updated: "منذ 7 دقيقة",
  },
  {
    id: "icu-12",
    number: "12",
    status: "occupied",
    patientName: "إبراهيم م.",
    caseType: "رعاية مركزة",
    updated: "منذ ساعتين",
  },
];

const statusConfig = {
  available: {
    label: "متاح",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    badge: "bg-emerald-50 text-emerald-700",
  },
  occupied: {
    label: "مشغول",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    badge: "bg-orange-50 text-orange-700",
  },
  maintenance: {
    label: "تحت الصيانة",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    badge: "bg-amber-50 text-amber-700",
  },
};

const Table = ({ onChangeStatus }) => {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  const filterItems = [
    {
      value: "all",
      label: "الكل",
    },
    {
      value: "available",
      label: "متاح",
    },
    {
      value: "occupied",
      label: "مشغول",
    },
    {
      value: "maintenance",
      label: "تحت الصيانة",
    },
  ];

  const filteredBeds = useMemo(() => {
    const value = search.trim();

    return icuBedsData.filter((bed) => {
      const matchesFilter =
        filter === "all" || bed.status === filter;

      const matchesSearch =
        value === "" || bed.number.includes(value);

      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  const totalPages = Math.ceil(
    filteredBeds.length / itemsPerPage
  );

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentBeds = filteredBeds.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleFilterChange = (value) => {
    setFilter(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);
  };

  return (
    <section
      className="my-4 space-y-5 scroll-mt-24 md:my-7"
    >
      {/* Header */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            إدارة العناية المركزة
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            تابع حالة كل سرير وقم بتحديثها بسهولة.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col justify-between gap-3 p-4 bg-white border shadow-sm rounded-2xl border-slate-200 lg:flex-row lg:items-center">
        {/* Filter Chips */}
        <div className="flex flex-wrap gap-2">
          {filterItems.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => handleFilterChange(item.value)}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                filter === item.value
                  ? "bg-blue-600 text-white shadow-sm"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full lg:w-72">
          <FaMagnifyingGlass
            size={14}
            className="absolute -translate-y-1/2 right-3 top-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              handleSearchChange(e.target.value)
            }
            placeholder="بحث برقم السرير"
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pe-9 ps-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* Count */}
      <p className="mb-3 text-xs text-slate-500">
        عرض{" "}
        <span className="font-semibold text-slate-700">
          {currentBeds.length}
        </span>{" "}
        من{" "}
        <span className="font-semibold text-slate-700">
          {filteredBeds.length}
        </span>{" "}
        سرير
      </p>

      {/* Grid */}
      {currentBeds.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {currentBeds.map((bed) => {
            const config = statusConfig[bed.status];

            return (
              <div
                key={bed.id}
                className="flex flex-col p-4 transition bg-white border shadow-sm rounded-2xl border-slate-200 hover:border-slate-300 hover:shadow-md"
              >
                {/* Top */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center min-w-0 gap-3">
                    <div
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${config.iconBg} ${config.iconColor}`}
                    >
                      <FaHeartPulse size={17} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-bold truncate text-slate-900">
                        سرير ICU #{bed.number}
                      </p>

                      <p className="mt-0.5 truncate text-[11px] text-slate-500">
                        العناية المركزة
                      </p>
                    </div>
                  </div>

                  <span
                    className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold ${config.badge}`}
                  >
                    {config.label}
                  </span>
                </div>

                {/* Patient Info */}
                {bed.status === "occupied" && (
                  <div className="mt-3 flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5 text-[11px]">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <FaUser size={11} />
                      {bed.patientName}
                    </span>

                    <span className="text-slate-500">
                      {bed.caseType}
                    </span>
                  </div>
                )}

                {/* Updated */}
                <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
                  <FaClock size={12} />

                  <span>
                    آخر تحديث: {bed.updated}
                  </span>
                </div>

                {/* Change Status */}
                <button
                  type="button"
                  onClick={() => onChangeStatus?.(bed)}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                >
                  <FaArrowsRotate size={12} />
                  تغيير الحالة
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="px-5 text-center bg-white border border-dashed rounded-2xl border-slate-300 py-14">
          <div className="grid mx-auto h-14 w-14 place-items-center rounded-2xl bg-slate-50 text-slate-400">
            <FaHeartPulse size={24} />
          </div>

          <h3 className="mt-4 text-base font-bold text-slate-800">
            لا توجد أسرة
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            لم نجد أي سرير يطابق البحث أو الفلتر المحدد.
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center justify-between gap-3 pt-5 border-t border-slate-200 sm:flex-row">
          {/* Page Info */}
          <p className="text-xs text-slate-500">
            صفحة{" "}
            <span className="font-semibold text-slate-700">
              {currentPage}
            </span>{" "}
            من{" "}
            <span className="font-semibold text-slate-700">
              {totalPages}
            </span>
          </p>

          {/* Pagination Buttons */}
          <div className="flex items-center gap-1.5">
            {/* Previous */}
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => goToPage(currentPage - 1)}
              className="grid transition bg-white border rounded-lg h-9 w-9 place-items-center border-slate-200 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="الصفحة السابقة"
            >
              <FaChevronRight size={12} />
            </button>

            {/* Pages */}
            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => goToPage(page)}
                className={`grid h-9 min-w-9 place-items-center rounded-lg px-2 text-sm font-medium transition ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {page}
              </button>
            ))}

            {/* Next */}
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => goToPage(currentPage + 1)}
              className="grid transition bg-white border rounded-lg h-9 w-9 place-items-center border-slate-200 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="الصفحة التالية"
            >
              <FaChevronLeft size={12} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Table;