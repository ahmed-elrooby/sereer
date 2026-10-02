"use client";

import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaMagnifyingGlass,
  FaChevronDown,
  FaList,
  FaGrip,
  FaPenToSquare,
  FaArrowLeft,
  FaPowerOff,
  FaFolderOpen,
  FaRotateLeft,
} from "react-icons/fa6";

import { admin } from "../../../../providers/AdminContext.jsx";

const Table = () => {
  const { facility } = useContext(admin);

  /*
   * API response:
   *
   * {
   *   success: true,
   *   facilities: [...]
   * }
   */

  const facilities = facility?.facilities || [];

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [view, setView] = useState("list");

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  // ----------------------------------------
  // Get beds from facility units
  // ----------------------------------------

  const getAvailableBeds = (facility) => {
    return (facility.units || [])
      .filter((unit) => unit.isActive === true)
      .reduce(
        (sum, unit) =>
          sum + Number(unit.availableBeds || 0),
        0
      );
  };

  const getTotalBeds = (facility) => {
    return (facility.units || []).reduce(
      (sum, unit) =>
        sum + Number(unit.availableBeds || 0),
      0
    );
  };

  // ----------------------------------------
  // Filter + Search + Sort
  // ----------------------------------------

  const filteredFacilities = useMemo(() => {
    let result = [...facilities];

    // Search
    if (search.trim()) {
      const value = search.trim().toLowerCase();

      result = result.filter((facility) => {
        return (
          facility.name
            ?.toLowerCase()
            .includes(value) ||
          facility.city
            ?.toLowerCase()
            .includes(value) ||
          facility._id
            ?.toLowerCase()
            .includes(value)
        );
      });
    }

    // Status
    if (statusFilter !== "all") {
      result = result.filter((facility) => {
        const status = facility.isActive
          ? "active"
          : "suspended";

        return status === statusFilter;
      });
    }

    // Recent
    if (sortBy === "recent") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt || 0) -
          new Date(a.createdAt || 0)
      );
    }

    // Name
    if (sortBy === "name") {
      result.sort((a, b) =>
        (a.name || "").localeCompare(
          b.name || "",
          "ar"
        )
      );
    }

    // Beds
    if (sortBy === "beds") {
      result.sort(
        (a, b) =>
          getAvailableBeds(b) -
          getAvailableBeds(a)
      );
    }

    return result;
  }, [
    facilities,
    search,
    statusFilter,
    sortBy,
  ]);

  // ----------------------------------------
  // Pagination
  // ----------------------------------------

  const totalPages = Math.ceil(
    filteredFacilities.length / itemsPerPage
  );

  const paginatedFacilities = useMemo(() => {
    const startIndex =
      (currentPage - 1) * itemsPerPage;

    return filteredFacilities.slice(
      startIndex,
      startIndex + itemsPerPage
    );
  }, [
    filteredFacilities,
    currentPage,
  ]);

  // ----------------------------------------
  // Reset page when filters change
  // ----------------------------------------

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    statusFilter,
    sortBy,
  ]);

  // ----------------------------------------
  // Reset filters
  // ----------------------------------------

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setSortBy("recent");
    setCurrentPage(1);
  };

  // ----------------------------------------
  // Pagination handlers
  // ----------------------------------------

  const goToNextPage = () => {
    setCurrentPage((prev) =>
      Math.min(prev + 1, totalPages)
    );
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) =>
      Math.max(prev - 1, 1)
    );
  };

  return (
    <>
      {/* ================================
          Search + Filters
      ================================= */}

      <div className="flex flex-col gap-3 mt-10 lg:flex-row">
        {/* Search */}

        <div className="relative flex-1 min-w-0">
          <FaMagnifyingGlass className="absolute right-4 top-1/2 -translate-y-1/2 text-[12px] text-[#94A3B8]" />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="ابحث باسم المنشأة، المدينة، أو رقم التعريف..."
            className="w-full rounded-xl border border-[#263244] bg-[#111827] py-3.5 pl-4 pr-11 text-sm text-[#F8FAFC] outline-none transition-all duration-200 placeholder:text-[#94A3B8]/60 focus:border-[#38BDF8]/50"
          />
        </div>

        {/* Status Filter */}

        <div className="flex items-center gap-2 pb-1 overflow-x-auto lg:pb-0">
          {/* All */}

          <button
            onClick={() =>
              setStatusFilter("all")
            }
            className={`shrink-0 rounded-xl border px-4 py-3.5 text-[12px] transition-all duration-200 ${
              statusFilter === "all"
                ? "border-[#263244] bg-[#111827] text-[#F8FAFC]"
                : "border-[#263244] text-[#94A3B8] hover:text-[#F8FAFC]"
            }`}
          >
            الكل
          </button>

          {/* Active */}

          <button
            onClick={() =>
              setStatusFilter("active")
            }
            className={`shrink-0 rounded-xl border px-4 py-3.5 text-[12px] transition-all duration-200 ${
              statusFilter === "active"
                ? "border-[#22C55E]/30 bg-[#22C55E]/[0.06] text-[#22C55E]"
                : "border-[#263244] text-[#94A3B8] hover:text-[#F8FAFC]"
            }`}
          >
            نشطة
          </button>

          {/* Suspended */}

          <button
            onClick={() =>
              setStatusFilter("suspended")
            }
            className={`shrink-0 rounded-xl border px-4 py-3.5 text-[12px] transition-all duration-200 ${
              statusFilter === "suspended"
                ? "border-[#EF4444]/30 bg-[#EF4444]/[0.06] text-[#EF4444]"
                : "border-[#263244] text-[#94A3B8] hover:text-[#F8FAFC]"
            }`}
          >
            متوقفة
          </button>
        </div>

        {/* Sort */}

        <div className="relative shrink-0">
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
            className="cursor-pointer appearance-none rounded-xl border border-[#263244] bg-[#111827] px-4 py-3.5 pr-10 text-[12px] text-[#F8FAFC] outline-none transition-all duration-200 focus:border-[#38BDF8]/50"
          >
            <option value="recent">
              الأحدث
            </option>

            <option value="name">
              الاسم (أ-ي)
            </option>

            <option value="beds">
              الأسرّة
            </option>
          </select>

          <FaChevronDown className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[10px] text-[#94A3B8]" />
        </div>

        {/* View Toggle */}

        <div className="flex shrink-0 items-center gap-1 rounded-xl border border-[#263244] bg-[#111827] p-1">
          <button
            onClick={() => setView("list")}
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200 ${
              view === "list"
                ? "bg-[#151D2B] text-[#F8FAFC]"
                : "text-[#94A3B8] hover:text-[#F8FAFC]"
            }`}
            aria-label="قائمة"
          >
            <FaList className="text-[12px]" />
          </button>

          <button
            onClick={() => setView("grid")}
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200 ${
              view === "grid"
                ? "bg-[#151D2B] text-[#F8FAFC]"
                : "text-[#94A3B8] hover:text-[#F8FAFC]"
            }`}
            aria-label="شبكة"
          >
            <FaGrip className="text-[12px]" />
          </button>
        </div>
      </div>

      {/* ================================
          Result Count
      ================================= */}

      <div className="mt-6 flex items-center justify-between text-[11px] text-[#94A3B8]">
        <p>
          <span className="tabular-nums text-[#F8FAFC]">
            {filteredFacilities.length}
          </span>

          <span className="mx-1.5">
            /
          </span>

          <span>
            {facilities.length} منشأة
          </span>
        </p>

        <p className="hidden tracking-[0.2em] text-[#94A3B8]/50 sm:block">
          SORTED BY —{" "}
          {sortBy === "recent"
            ? "RECENT"
            : sortBy.toUpperCase()}
        </p>
      </div>

      {/* ================================
          LIST VIEW
      ================================= */}

      {view === "list" && (
        <div className="mt-4 overflow-hidden rounded-2xl border border-[#263244] bg-[#151D2B]">
          {/* Column Labels */}

          <div className="hidden grid-cols-12 gap-4 border-b border-[#263244] px-6 py-4 text-[10px] tracking-[0.22em] text-[#94A3B8]/70 lg:grid">
            <span className="col-span-4">
              المنشأة
            </span>

            <span className="col-span-2">
              الخدمات
            </span>

            <span className="col-span-2">
              الأسرّة
            </span>

            <span className="col-span-2">
              الحالة
            </span>

            <span className="col-span-2 text-left">
              إجراءات
            </span>
          </div>

          {/* Rows */}

          {paginatedFacilities.length > 0 && (
            <div className="divide-y divide-[#263244]/70">
              {paginatedFacilities.map(
                (facility, index) => {
                  const availableBeds =
                    getAvailableBeds(
                      facility
                    );

                  const totalBeds =
                    getTotalBeds(
                      facility
                    );

                  const occupancy =
                    totalBeds > 0
                      ? Math.round(
                          (availableBeds /
                            totalBeds) *
                            100
                        )
                      : 0;

                  const isActive =
                    facility.isActive === true;

                  const rowNumber =
                    (currentPage - 1) *
                      itemsPerPage +
                    index +
                    1;

                  return (
                    <article
                      key={facility._id}
                      className="group grid cursor-pointer grid-cols-12 items-center gap-4 px-6 py-5 transition-all duration-200 hover:bg-[#111827]"
                    >
                      {/* Facility */}

                      <div className="flex items-center min-w-0 col-span-12 gap-3 lg:col-span-4">
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#263244] bg-[#111827] text-[10px] tabular-nums ${
                            isActive
                              ? "text-[#38BDF8]"
                              : "text-[#EF4444]"
                          }`}
                        >
                          {String(
                            rowNumber
                          ).padStart(
                            2,
                            "0"
                          )}
                        </span>

                        <div className="min-w-0">
                          <p className="truncate text-sm text-[#F8FAFC]">
                            {facility.name}
                          </p>

                          <p className="mt-1 truncate text-[11px] text-[#94A3B8]">
                            {facility.city}

                            <span className="mx-1 text-[#94A3B8]/40">
                              ·
                            </span>

                            <span className="tabular-nums">
                              {facility._id}
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* Services */}

                      <div className="col-span-6 flex flex-wrap gap-1.5 lg:col-span-2">
                        {facility.services?.length >
                        0 ? (
                          facility.services.map(
                            (service) => (
                              <span
                                key={
                                  service
                                }
                                className="rounded-md border border-[#263244] px-2 py-0.5 text-[10px] text-[#94A3B8]"
                              >
                                {
                                  service
                                }
                              </span>
                            )
                          )
                        ) : (
                          <span className="text-[10px] text-[#64748B]">
                            لا توجد خدمات
                          </span>
                        )}
                      </div>

                      {/* Beds */}

                      <div className="col-span-6 lg:col-span-2">
                        <p className="text-[11px] text-[#F8FAFC] tabular-nums">
                          {
                            availableBeds
                          }

                          <span className="text-[#94A3B8]/60">
                            {" "}
                            /{" "}
                            {
                              totalBeds
                            }
                          </span>
                        </p>

                        <div className="mt-1.5 h-[2px] w-16 overflow-hidden rounded-full bg-[#263244]/70">
                          <div
                            className={`h-full rounded-full ${
                              isActive
                                ? "bg-[#38BDF8]"
                                : "bg-[#EF4444]"
                            }`}
                            style={{
                              width: `${occupancy}%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Status */}

                      <div
                        className={`col-span-6 flex items-center gap-1.5 text-[11px] lg:col-span-2 ${
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

                        {isActive
                          ? "نشطة"
                          : "متوقفة"}
                      </div>

                      {/* Actions */}

                      <div className="flex items-center col-span-6 gap-1 lg:col-span-2 lg:justify-end">
                        {/* Edit */}

                        <button
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-[#94A3B8] transition-all duration-200 hover:bg-[#080B12] hover:text-[#38BDF8]"
                          aria-label="تعديل"
                        >
                          <FaPenToSquare className="text-[13px]" />
                        </button>

                        {/* View */}

                        <button
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-[#94A3B8] transition-all duration-200 hover:bg-[#080B12] hover:text-[#38BDF8]"
                          aria-label="عرض"
                        >
                          <FaArrowLeft className="text-[12px]" />
                        </button>

                        {/* Disable / Enable */}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();

                            // هنا بعدين نربطها بالـ API
                          }}
                          className={`flex h-8 w-8 items-center justify-center rounded-lg text-[#94A3B8] transition-all duration-200 ${
                            isActive
                              ? "hover:bg-[#080B12] hover:text-[#EF4444]"
                              : "hover:bg-[#080B12] hover:text-[#22C55E]"
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
                          <FaPowerOff className="text-[13px]" />
                        </button>
                      </div>
                    </article>
                  );
                }
              )}
            </div>
          )}

          {/* Empty State */}

          {filteredFacilities.length ===
            0 && (
            <div className="px-6 py-20 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#263244] bg-[#111827]">
                <FaFolderOpen className="text-sm text-[#94A3B8]" />
              </div>

              <p className="mt-5 text-sm text-[#F8FAFC]">
                لا توجد نتائج مطابقة
              </p>

              <p className="mt-2 text-[12px] text-[#94A3B8]">
                جرّب تعديل معايير البحث أو
                الفلاتر.
              </p>

              <button
                onClick={
                  resetFilters
                }
                className="mt-6 inline-flex items-center gap-2 rounded-xl border border-[#263244] px-5 py-2.5 text-[12px] text-[#94A3B8] transition-all duration-200 hover:border-[#38BDF8]/40 hover:text-[#F8FAFC]"
              >
                <FaRotateLeft className="text-[10px]" />

                إعادة تعيين الفلاتر
              </button>
            </div>
          )}

          {/* ================================
              Pagination
          ================================= */}

          {totalPages > 1 && (
            <div className="flex flex-col gap-4 border-t border-[#263244] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              {/* Result Info */}

              <p className="text-[11px] text-[#94A3B8]">
                عرض{" "}
                <span className="text-[#F8FAFC] tabular-nums">
                  {(currentPage -
                    1) *
                    itemsPerPage +
                    1}
                </span>{" "}
                -{" "}
                <span className="text-[#F8FAFC] tabular-nums">
                  {Math.min(
                    currentPage *
                      itemsPerPage,
                    filteredFacilities.length
                  )}
                </span>{" "}
                من{" "}
                <span className="text-[#F8FAFC] tabular-nums">
                  {
                    filteredFacilities.length
                  }
                </span>
              </p>

              {/* Pagination */}

              <div className="flex items-center gap-1.5">
                {/* Previous */}

                <button
                  onClick={
                    goToPreviousPage
                  }
                  disabled={
                    currentPage ===
                    1
                  }
                  className="flex h-8 min-w-8 items-center justify-center rounded-lg border border-[#263244] text-[11px] text-[#94A3B8] transition-all hover:border-[#38BDF8]/40 hover:text-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-30"
                >
                  →
                </button>

                {/* Pages */}

                {Array.from(
                  {
                    length:
                      totalPages,
                  },
                  (_, index) =>
                    index + 1
                ).map(
                  (page) => (
                    <button
                      key={
                        page
                      }
                      onClick={() =>
                        setCurrentPage(
                          page
                        )
                      }
                      className={`flex h-8 min-w-8 items-center justify-center rounded-lg border text-[11px] tabular-nums transition-all ${
                        currentPage ===
                        page
                          ? "border-[#38BDF8]/40 bg-[#38BDF8]/[0.08] text-[#38BDF8]"
                          : "border-[#263244] text-[#94A3B8] hover:border-[#38BDF8]/30 hover:text-[#F8FAFC]"
                      }`}
                    >
                      {
                        page
                      }
                    </button>
                  )
                )}

                {/* Next */}

                <button
                  onClick={
                    goToNextPage
                  }
                  disabled={
                    currentPage ===
                    totalPages
                  }
                  className="flex h-8 min-w-8 items-center justify-center rounded-lg border border-[#263244] text-[11px] text-[#94A3B8] transition-all hover:border-[#38BDF8]/40 hover:text-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-30"
                >
                  ←
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================================
          GRID VIEW
      ================================= */}

      {view === "grid" && (
        <>
          <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 xl:grid-cols-3">
            {paginatedFacilities.map(
              (facility) => {
                const isActive =
                  facility.isActive === true;

                const availableBeds =
                  getAvailableBeds(
                    facility
                  );

                const totalBeds =
                  getTotalBeds(
                    facility
                  );

                return (
                  <article
                    key={
                      facility._id
                    }
                    className="rounded-2xl border border-[#263244] bg-[#151D2B] p-5 transition-all duration-200 hover:border-[#38BDF8]/30"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span
                          className={`text-[10px] ${
                            isActive
                              ? "text-[#22C55E]"
                              : "text-[#EF4444]"
                          }`}
                        >
                          {isActive
                            ? "● نشطة"
                            : "● متوقفة"}
                        </span>

                        <h3 className="mt-3 text-sm text-[#F8FAFC]">
                          {
                            facility.name
                          }
                        </h3>

                        <p className="mt-1 text-[11px] text-[#94A3B8]">
                          {
                            facility.city
                          }

                          <span className="mx-1">
                            ·
                          </span>

                          {
                            facility._id
                          }
                        </p>
                      </div>

                      <button
                        className={`flex h-8 w-8 items-center justify-center rounded-lg text-[#94A3B8] transition-all ${
                          isActive
                            ? "hover:bg-[#080B12] hover:text-[#EF4444]"
                            : "hover:bg-[#080B12] hover:text-[#22C55E]"
                        }`}
                        aria-label={
                          isActive
                            ? "تعطيل الحساب"
                            : "تفعيل الحساب"
                        }
                      >
                        <FaPowerOff className="text-[13px]" />
                      </button>
                    </div>

                    {/* Services */}

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {facility.services
                        ?.length >
                      0 ? (
                        facility.services.map(
                          (service) => (
                            <span
                              key={
                                service
                              }
                              className="rounded-md border border-[#263244] px-2 py-0.5 text-[10px] text-[#94A3B8]"
                            >
                              {
                                service
                              }
                            </span>
                          )
                        )
                      ) : (
                        <span className="text-[10px] text-[#64748B]">
                          لا توجد خدمات
                        </span>
                      )}
                    </div>

                    {/* Beds */}

                    <div className="flex items-end justify-between mt-6">
                      <div>
                        <p className="text-[10px] text-[#94A3B8]">
                          الأسرّة
                        </p>

                        <p className="mt-1 text-lg text-[#F8FAFC] tabular-nums">
                          {
                            availableBeds
                          }

                          <span className="text-sm text-[#94A3B8]">
                            {" "}
                            /{" "}
                            {
                              totalBeds
                            }
                          </span>
                        </p>
                      </div>

                      <button
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-[#94A3B8] transition-all hover:bg-[#080B12] hover:text-[#38BDF8]"
                        aria-label="عرض"
                      >
                        <FaArrowLeft className="text-[12px]" />
                      </button>
                    </div>
                  </article>
                );
              }
            )}
          </div>

          {/* Grid Pagination */}

          {totalPages > 1 && (
            <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-[#263244] bg-[#151D2B] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[11px] text-[#94A3B8]">
                عرض{" "}
                <span className="text-[#F8FAFC] tabular-nums">
                  {(currentPage -
                    1) *
                    itemsPerPage +
                    1}
                </span>{" "}
                -{" "}
                <span className="text-[#F8FAFC] tabular-nums">
                  {Math.min(
                    currentPage *
                      itemsPerPage,
                    filteredFacilities.length
                  )}
                </span>{" "}
                من{" "}
                <span className="text-[#F8FAFC] tabular-nums">
                  {
                    filteredFacilities.length
                  }
                </span>
              </p>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={
                    goToPreviousPage
                  }
                  disabled={
                    currentPage ===
                    1
                  }
                  className="flex h-8 min-w-8 items-center justify-center rounded-lg border border-[#263244] text-[11px] text-[#94A3B8] transition-all hover:border-[#38BDF8]/40 hover:text-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-30"
                >
                  →
                </button>

                {Array.from(
                  {
                    length:
                      totalPages,
                  },
                  (_, index) =>
                    index + 1
                ).map(
                  (page) => (
                    <button
                      key={
                        page
                      }
                      onClick={() =>
                        setCurrentPage(
                          page
                        )
                      }
                      className={`flex h-8 min-w-8 items-center justify-center rounded-lg border text-[11px] tabular-nums transition-all ${
                        currentPage ===
                        page
                          ? "border-[#38BDF8]/40 bg-[#38BDF8]/[0.08] text-[#38BDF8]"
                          : "border-[#263244] text-[#94A3B8] hover:border-[#38BDF8]/30 hover:text-[#F8FAFC]"
                      }`}
                    >
                      {
                        page
                      }
                    </button>
                  )
                )}

                <button
                  onClick={
                    goToNextPage
                  }
                  disabled={
                    currentPage ===
                    totalPages
                  }
                  className="flex h-8 min-w-8 items-center justify-center rounded-lg border border-[#263244] text-[11px] text-[#94A3B8] transition-all hover:border-[#38BDF8]/40 hover:text-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-30"
                >
                  ←
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Table;