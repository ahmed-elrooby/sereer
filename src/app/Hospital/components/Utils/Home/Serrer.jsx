"use client";

import React, { useMemo, useState } from "react";
import {
  FaBed,
  FaClock,
  FaArrowsRotate,
  FaMagnifyingGlass,
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa6";

const bedsData = [
  { id: 1, number: "01", type: "حضّانة أطفال", status: "available", updated: "منذ 3 دقيقة" },
  { id: 2, number: "02", type: "حضّانة أطفال", status: "occupied", updated: "منذ 8 دقيقة" },
  { id: 3, number: "03", type: "حضّانة أطفال", status: "maintenance", updated: "منذ ساعة" },
  { id: 4, number: "04", type: "حضّانة أطفال", status: "available", updated: "منذ 12 دقيقة" },
  { id: 5, number: "05", type: "حضّانة أطفال", status: "occupied", updated: "منذ 5 دقيقة" },
  { id: 6, number: "06", type: "حضّانة أطفال", status: "occupied", updated: "منذ ساعة" },
  { id: 7, number: "07", type: "حضّانة أطفال", status: "available", updated: "منذ 25 دقيقة" },
  { id: 8, number: "08", type: "حضّانة أطفال", status: "occupied", updated: "منذ 2 دقيقة" },
  { id: 9, number: "09", type: "حضّانة أطفال", status: "occupied", updated: "منذ 47 دقيقة" },
  { id: 10, number: "10", type: "حضّانة أطفال", status: "available", updated: "منذ 15 دقيقة" },
  { id: 11, number: "11", type: "حضّانة أطفال", status: "occupied", updated: "منذ 7 دقيقة" },
  { id: 12, number: "12", type: "حضّانة أطفال", status: "occupied", updated: "منذ ساعتين" },
  { id: 13, number: "13", type: "عناية مركزة", status: "available", updated: "منذ 4 دقيقة" },
  { id: 14, number: "14", type: "عناية مركزة", status: "occupied", updated: "منذ 18 دقيقة" },
  { id: 15, number: "15", type: "عناية مركزة", status: "occupied", updated: "منذ 33 دقيقة" },
  { id: 16, number: "16", type: "عناية مركزة", status: "available", updated: "منذ 9 دقيقة" },
  { id: 17, number: "17", type: "عناية مركزة", status: "occupied", updated: "منذ 55 دقيقة" },
  { id: 18, number: "18", type: "عناية مركزة", status: "maintenance", updated: "منذ ساعة" },
  { id: 19, number: "19", type: "عناية مركزة", status: "occupied", updated: "منذ 21 دقيقة" },
  { id: 20, number: "20", type: "عناية مركزة", status: "occupied", updated: "منذ 14 دقيقة" },
  { id: 21, number: "21", type: "عناية مركزة", status: "available", updated: "منذ 6 دقيقة" },
];

const statusConfig = {
  available: {
    label: "متاح",
    icon: "text-emerald-600",
    iconBg: "bg-emerald-50",
    badge: "bg-emerald-50 text-emerald-700",
  },
  occupied: {
    label: "مشغول",
    icon: "text-orange-600",
    iconBg: "bg-orange-50",
    badge: "bg-orange-50 text-orange-700",
  },
  maintenance: {
    label: "تحت الصيانة",
    icon: "text-red-600",
    iconBg: "bg-red-50",
    badge: "bg-red-50 text-red-700",
  },
};

const Serrer = ({ onChangeStatus }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 9;

  // Filtering + Search
  const filteredBeds = useMemo(() => {
    return bedsData.filter((bed) => {
      const matchesStatus =
        filter === "all" || bed.status === filter;

      const matchesSearch =
        bed.number.includes(search.trim()) ||
        bed.type.includes(search.trim());

      return matchesStatus && matchesSearch;
    });
  }, [search, filter]);

  // Pagination
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

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  return (
    <div className="mt-4 space-y-5 md:mt-6">
      {/* Filters */}
      <div className="flex flex-col gap-3 p-4 bg-white border shadow-sm rounded-2xl border-slate-200 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <div className="relative w-full lg:max-w-xs">
          <FaMagnifyingGlass
            size={14}
            className="absolute -translate-y-1/2 right-3 top-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="ابحث برقم السرير..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pe-9 ps-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Status Filters */}
        <div className="flex w-full gap-2 overflow-x-auto lg:w-auto">
          {[
            { value: "all", label: "الكل" },
            { value: "available", label: "متاح" },
            { value: "occupied", label: "مشغول" },
            { value: "maintenance", label: "الصيانة" },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => handleFilterChange(item.value)}
              className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                filter === item.value
                  ? "bg-blue-600 text-white shadow-sm"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          عرض{" "}
          <span className="font-semibold text-slate-700">
            {filteredBeds.length}
          </span>{" "}
          سرير
        </p>

        {search && (
          <button
            type="button"
            onClick={() => handleSearch("")}
            className="text-xs font-medium text-blue-600 hover:text-blue-700"
          >
            مسح البحث
          </button>
        )}
      </div>

      {/* Beds Grid */}
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
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${config.iconBg} ${config.icon}`}
                    >
                      <FaBed size={17} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-bold truncate text-slate-900">
                        سرير #{bed.number}
                      </p>

                      <p className="mt-0.5 truncate text-[11px] text-slate-500">
                        {bed.type}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold ${config.badge}`}
                  >
                    {config.label}
                  </span>
                </div>

                {/* Updated */}
                <div className="mt-4 flex items-center gap-2 text-[11px] text-slate-500">
                  <FaClock size={12} />
                  <span>آخر تحديث: {bed.updated}</span>
                </div>

                {/* Action */}
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
            <FaBed size={24} />
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

          <div className="flex items-center gap-1.5">
            {/* Previous */}
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((prev) => prev - 1)
              }
              className="grid transition bg-white border rounded-lg h-9 w-9 place-items-center border-slate-200 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
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
                onClick={() => setCurrentPage(page)}
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
              onClick={() =>
                setCurrentPage((prev) => prev + 1)
              }
              className="grid transition bg-white border rounded-lg h-9 w-9 place-items-center border-slate-200 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FaChevronLeft size={12} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Serrer;