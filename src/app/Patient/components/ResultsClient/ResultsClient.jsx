"use client";

import React, { useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import {
  FaArrowRight,
  FaBedPulse,
  FaLocationDot,
  FaPhone,
  FaRoute,
  FaHospital,
  FaCircleCheck,
  FaTriangleExclamation,
} from "react-icons/fa6";

import { Patient } from "../../../providers/PatientContext.jsx";

const ResultsClient = () => {
  const router = useRouter();
  const params = useParams();

  const type = params?.type;

  const { location, getNearbyHospitals } = useContext(Patient);

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "hospitals",
      type,
      location?.lat,
      location?.lng,
    ],

    queryFn: () =>
      getNearbyHospitals(
        type,
        location.lat,
        location.lng
      ),

    enabled:
      Boolean(type) &&
      location?.lat != null &&
      location?.lng != null,
  });

  const hospitals = data?.data || [];

  const isNICU = type === "NICU";

  const pageTitle = isNICU
    ? "الحضّانات المتاحة"
    : "العناية المركزة المتاحة";

 
  const unitLabel = isNICU
    ? "حضّانة أطفال"
    : "عناية مركزة";

  const handleDirections = (hospital) => {
    const [lng, lat] = hospital.location.coordinates;

    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

    window.open(url, "_blank");
  };

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50"
    >
      {/* =========================
          Header
      ========================== */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-4 md:px-6">

          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium transition rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          >
            <FaArrowRight className="text-sm" />
            رجوع
          </button>

          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 text-white bg-blue-600 shadow-sm rounded-xl">
              <FaBedPulse size={20} />
            </div>

            <div className="hidden text-right sm:block">
              <p className="text-sm font-bold text-slate-900">
                سرير
              </p>

              <p className="text-[11px] text-slate-400">
                أقرب رعاية ليك
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl px-4 py-8 mx-auto md:px-6 md:py-10">

        {/* =========================
            Page Intro
        ========================== */}
        <section className="mb-8">

          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                <FaLocationDot />
               أقرب أماكن العناية المركزة المتاحة بناءً على موقعك الحالي
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                {pageTitle}
              </h1>

            
            </div>

          

          </div>
        </section>

        {/* =========================
            Loading
        ========================== */}
        {isLoading && (
          <div className="space-y-4">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="p-5 bg-white border shadow-sm animate-pulse rounded-3xl border-slate-200 md:p-6"
              >
                <div className="flex gap-4">

                  <div className="h-14 w-14 shrink-0 rounded-2xl bg-slate-200" />

                  <div className="flex-1">
                    <div className="w-48 h-5 rounded bg-slate-200" />

                    <div className="h-4 max-w-full mt-3 rounded w-72 bg-slate-100" />

                    <div className="w-full h-10 mt-5 rounded-xl bg-slate-100" />
                  </div>

                </div>
              </div>
            ))}

          </div>
        )}

        {/* =========================
            Error
        ========================== */}
        {isError && (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="w-full max-w-md p-8 text-center bg-white border border-red-100 shadow-sm rounded-3xl">

              <div className="flex items-center justify-center w-16 h-16 mx-auto text-red-500 rounded-2xl bg-red-50">
                <FaTriangleExclamation size={25} />
              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-900">
                حصل خطأ
              </h2>

              <p className="mt-2 text-sm leading-7 text-slate-500">
                مقدرناش نجيب الأماكن المتاحة حاليًا.
                حاول مرة تانية.
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="px-6 py-3 mt-6 text-sm font-semibold text-white transition bg-blue-600 rounded-xl hover:bg-blue-700"
              >
                حاول مرة تانية
              </button>

            </div>
          </div>
        )}

        {/* =========================
            Empty
        ========================== */}
        {!isLoading &&
          !isError &&
          hospitals.length === 0 && (
            <div className="flex min-h-[400px] items-center justify-center">

              <div className="w-full max-w-md p-8 text-center bg-white border shadow-sm rounded-3xl border-slate-200">

                <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-2xl bg-slate-100 text-slate-400">
                  <FaHospital size={25} />
                </div>

                <h2 className="mt-5 text-xl font-bold text-slate-900">
                  مفيش أماكن متاحة حاليًا
                </h2>

                <p className="mt-2 text-sm leading-7 text-slate-500">
                  ملقيناش {unitLabel} متاحة بالقرب منك في الوقت الحالي.
                  حاول البحث مرة تانية لاحقًا.
                </p>

                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-6 py-3 mt-6 text-sm font-semibold text-white transition bg-blue-600 rounded-xl hover:bg-blue-700"
                >
                  اختيار نوع رعاية آخر
                </button>

              </div>

            </div>
          )}

        {/* =========================
            Hospitals
        ========================== */}
        {!isLoading &&
          !isError &&
          hospitals.length > 0 && (
            <div className="space-y-4">

              {hospitals.map((hospital, index) => {

                const availableBeds =
                  hospital?.unit?.availableBeds ?? 0;

                const distance =
                  hospital?.distance != null
                    ? hospital.distance.toFixed(1)
                    : "--";

                return (
                  <article
                    key={hospital._id}
                    className="group overflow-hidden rounded-3xl border-4 border-blue-600 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                  >
                    <div className="p-5 md:p-6">

                      {/* Top */}
                      <div className="flex items-start gap-4">

                        {/* Icon */}
                        <div className="flex items-center justify-center w-10 h-10 text-blue-600 transition-colors md:h-14 md:w-14 shrink-0 rounded-2xl bg-blue-50 group-hover:bg-blue-600 group-hover:text-white">
                          <FaHospital className="text-[17px] md:text-lg" />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">

                          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

                            <div>
                              <h2 className="text-lg font-bold text-slate-900 md:text-xl">
                                {hospital.name}
                              </h2>

                              <div className="flex items-start gap-2 mt-2 text-sm text-slate-500">
                                <FaLocationDot className="mt-1 text-blue-500 shrink-0" />

                                <span className="leading-6">
                                  {hospital.address}
                                </span>
                              </div>
                            </div>

                            {/* Distance */}
                            <div className="flex w-fit shrink-0 items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                              <FaLocationDot className="text-blue-500" />
                              {distance} كم
                            </div>

                          </div>

                        </div>

                      </div>

                      {/* Details */}
                      <div className="grid gap-3 mt-3 sm:grid-cols-2">

                        {/* Available beds */}
                        <div className="flex items-center justify-between p-2 border-2 border-emerald-100 rounded-2xl bg-emerald-50/70">

                          <div className="flex items-center gap-3">

                            <div className="flex items-center justify-center w-8 h-8 bg-white shadow-sm md:h-11 md:w-11 rounded-xl text-emerald-600">
                              <FaBedPulse size={19} />
                            </div>

                            <div>
                              <p className="text-xs text-slate-500">
                                الأسرة المتاحة
                              </p>

                              <p className="mt-0.5 text-sm font-bold text-slate-900">
                                {hospital?.unit?.name || unitLabel}
                              </p>
                            </div>

                          </div>

                          <div className="text-left">
                            <p className="text-2xl font-bold text-emerald-600">
                              {availableBeds}
                            </p>

                            <p className="text-[11px] font-medium text-emerald-600">
                              سرير متاح
                            </p>
                          </div>

                        </div>

                        {/* Status */}
                        {/* <div className="flex items-center justify-between p-4 border rounded-2xl border-slate-100 bg-slate-50">

                          <div className="flex items-center gap-3">

                            <div className="flex items-center justify-center bg-white shadow-sm h-11 w-11 rounded-xl text-emerald-500">
                              <FaCircleCheck size={18} />
                            </div>

                            <div>
                              <p className="text-xs text-slate-500">
                                الحالة الحالية
                              </p>

                              <p className="mt-0.5 text-sm font-bold text-slate-900">
                                متاح الآن
                              </p>
                            </div>

                          </div>

                          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-200" />

                        </div> */}

                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-3 mt-3 sm:flex-row">

                        <button
                          type="button"
                          onClick={() =>
                            handleCall(hospital.phone)
                          }
                          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.99]"
                        >
                          <FaPhone />
                          اتصال بالمستشفى
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDirections(hospital)
                          }
                          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 active:scale-[0.99]"
                        >
                          <FaRoute />
                          الاتجاهات
                        </button>

                      </div>

                    </div>

                    {/* Bottom accent */}
                    <div className="h-1 transition-opacity bg-blue-600 opacity-0 group-hover:opacity-100" />

                  </article>
                );
              })}

            </div>
          )}

      </div>
    </main>
  );
};

export default ResultsClient;