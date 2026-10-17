
"use client";

import React, { useContext, useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { IoWarningSharp } from "react-icons/io5";

import {
  FaBedPulse,
  FaLocationDot,
  FaLocationCrosshairs,
  FaPhone,
  FaRoute,
  FaHospital,
  FaTriangleExclamation,
} from "react-icons/fa6";
import LocationPermissionModal from "../LocationPermissionModal/LocationPermissionModal.jsx";
import { Patient } from "../../../providers/PatientContext.jsx";


const ResultsClient = () => {
  const params = useParams();
  const type = params?.type;

  const {
    location,
    setPatientLocation,
    getNearbyHospitals,
  } = useContext(Patient);

  const [showLocationModal, setShowLocationModal] =
    useState(false);
  const [isLoadingLocation, setIsLoadingLocation] =
    useState(false);
  const [locationError, setLocationError] = useState("");

  const hasLocation =
    Number.isFinite(location?.lat) &&
    Number.isFinite(location?.lng);

  const {
    data,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: [
      "hospitals",
      type,
      location?.lat,
      location?.lng,
    ],
    queryFn: () =>
      getNearbyHospitals(type, location.lat, location.lng),
    enabled: Boolean(type) && hasLocation,
  });

  const hospitals = data?.data || [];
  const isNICU = type === "NICU";
console.log(hospitals)
  const pageTitle = isNICU
    ? "الحضّانات المتاحة"
    : "العناية المركزة المتاحة";

  const pageDescription = isNICU
    ? "أقرب حضانات الأطفال المتاحة بناءً على موقعك الحالي"
    : "أقرب أماكن العناية المركزة المتاحة بناءً على موقعك الحالي";

  const unitLabel = isNICU
    ? "حضّانة أطفال"
    : "عناية مركزة";

  // تحديد الموقع من نفس الصفحة بدون الانتقال إلى Home
  const handleAllowLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("المتصفح بتاعك مش بيدعم تحديد الموقع.");
      return;
    }

    setIsLoadingLocation(true);
    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setPatientLocation(latitude, longitude);
        setIsLoadingLocation(false);
        setShowLocationModal(false);
      },
      (error) => {
        setIsLoadingLocation(false);

        if (error.code === error.PERMISSION_DENIED) {
          setLocationError(
            "لازم تسمح بالوصول لموقعك من إعدادات المتصفح."
          );
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setLocationError(
            "مش قادرين نحدد موقعك حاليًا. حاول مرة تانية."
          );
        } else if (error.code === error.TIMEOUT) {
          setLocationError(
            "تحديد الموقع استغرق وقت طويل. حاول مرة تانية."
          );
        } else {
          setLocationError(
            "حصل خطأ أثناء تحديد موقعك. حاول مرة تانية."
          );
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  const handleDirections = (hospital) => {
    const coordinates = hospital?.location?.coordinates;

    if (!Array.isArray(coordinates) || coordinates.length !== 2) {
      return;
    }

    const [lng, lat] = coordinates;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };


const getBedsUpdateText = (date) => {
  if (!date) return "وقت التحديث غير متاح";

  const updatedAt = new Date(date);

  if (Number.isNaN(updatedAt.getTime())) {
    return "وقت التحديث غير متاح";
  }

  const diff = Math.max(0, Date.now() - updatedAt.getTime());

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "آخر تحديث لعدد السراير المتاحه منذ لحظات";

  if (minutes < 60) {
    return `آخر تحديث لعدد السراير المتاحه منذ ${minutes} ${minutes === 1 ? "دقيقة" : "دقيقة"}`;
  }

  if (hours < 24) {
    return `آخر تحديث لعدد السراير المتاحه منذ ${hours} ${hours === 1 ? "ساعة" : "ساعة"}`;
  }

  if (days < 30) {
    return `آخر تحديث لعدد السراير المتاحه منذ ${days} ${days === 1 ? "يوم" : "يوم"}`;
  }

  return `آخر تحديث لعدد السراير المتاحه بتاريخ ${updatedAt.toLocaleDateString("ar-EG")}`;
};


  const handleCall = (phone) => {
    if (!phone) return;
    window.location.href = `tel:${phone}`;
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-6xl px-4 py-8 mx-auto md:px-6 md:py-10">
        {/* Header */}
        <section className="mb-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-2 mb-4 text-xs font-semibold text-blue-700 border border-blue-100 rounded-full bg-blue-50">
                <FaLocationDot />
                <span>{pageDescription}</span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                {pageTitle}
              </h1>
            </div>
          </div>
        </section>

        {/* الموقع غير موجود */}
        {!hasLocation && (
          <div className="flex min-h-[350px] items-center justify-center">
            <div className="w-full max-w-lg p-8 text-center bg-white border shadow-sm rounded-3xl border-amber-200">
              <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-2xl bg-amber-50 text-amber-600">
                <FaLocationCrosshairs size={28} />
              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-900">
                محتاجين نحدد موقعك الأول
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                عشان نعرضلك أقرب المستشفيات المتاحة، لازم نحدد موقعك الجغرافي الأول.
                اضغط على الزرار وحدد موقعك، والنتائج هتظهر هنا.
              </p>

              <button
                type="button"
                onClick={() => {
                  setLocationError("");
                  setShowLocationModal(true);
                }}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <FaLocationDot />
                تحديد موقعي
              </button>
            </div>
          </div>
        )}

        {/* نافذة تحديد الموقع */}
        <LocationPermissionModal
          isOpen={showLocationModal}
          onAllow={handleAllowLocation}
          isLoading={isLoadingLocation}
          error={locationError}
        />

        {/* Loading */}
        {hasLocation && isLoading && (
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

        {/* خطأ في جلب البيانات */}
        {hasLocation && isError && (
          <div className="flex min-h-[350px] items-center justify-center">
            <div className="w-full max-w-md p-8 text-center bg-white border border-red-100 shadow-sm rounded-3xl">
              <div className="flex items-center justify-center w-16 h-16 mx-auto text-red-500 rounded-2xl bg-red-50">
                <FaTriangleExclamation size={26} />
              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-900">
                مقدرناش نجيب النتائج
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                حصلت مشكلة أثناء جلب المستشفيات المتاحة.
                اتأكد من اتصال الإنترنت وحاول مرة تانية.
              </p>

              <button
                type="button"
                disabled={isFetching}
                onClick={() => refetch()}
                className="px-6 py-3 mt-6 text-sm font-semibold text-white transition bg-blue-600 rounded-xl hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isFetching ? "جاري المحاولة..." : "حاول مرة تانية"}
              </button>
            </div>
          </div>
        )}

        {/* لا توجد نتائج */}
        {hasLocation &&
          !isLoading &&
          !isError &&
          hospitals.length === 0 && (
            <div className="flex min-h-[350px] items-center justify-center">
              <div className="w-full max-w-md p-8 text-center bg-white border shadow-sm rounded-3xl border-slate-200">
                <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-2xl bg-slate-100 text-slate-400">
                  <FaHospital size={27} />
                </div>

                <h2 className="mt-5 text-xl font-bold text-slate-900">
                  مفيش نتائج متاحة حاليًا
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  ملقيناش {unitLabel} متاحة بالقرب منك في الوقت الحالي.
                  تقدر تحاول البحث مرة تانية.
                </p>

                <button
                  type="button"
                  disabled={isFetching}
                  onClick={() => refetch()}
                  className="px-6 py-3 mt-6 text-sm font-semibold text-white transition bg-blue-600 rounded-xl hover:bg-blue-700 disabled:opacity-60"
                >
                  {isFetching ? "جاري البحث..." : "إعادة البحث"}
                </button>
              </div>
            </div>
          )}

        {/* نتائج المستشفيات */}
        {hasLocation &&
          !isLoading &&
          !isError &&
          hospitals.length > 0 && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {hospitals.map((hospital) => {
                const availableBeds =
                  hospital?.unit?.availableBeds ?? 0;

                const distance =
                  hospital?.distance != null &&
                  Number.isFinite(Number(hospital.distance))
                    ? Number(hospital.distance).toFixed(1)
                    : "--";

                const coordinates =
                  hospital?.location?.coordinates;

                const hasCoordinates =
                  Array.isArray(coordinates) &&
                  coordinates.length === 2;

                return (
                  <article
                    key={hospital._id}
                    className="group overflow-hidden rounded-3xl border-4 border-blue-600 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                  >
                    <div className="p-5 md:p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex items-center justify-center w-10 h-10 text-blue-600 transition-colors shrink-0 rounded-2xl bg-blue-50 group-hover:bg-blue-600 group-hover:text-white md:h-14 md:w-14">
                          <FaHospital className="text-lg" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                              <h2 className="text-lg font-bold text-slate-900 md:text-xl">
                                {hospital.name}
                              </h2>

                              <div className="flex items-start gap-2 mt-2 text-sm text-slate-500">
                                <FaLocationDot className="mt-1 text-blue-500 shrink-0" />
                                <span className="leading-6">
                                  {hospital.address || "العنوان غير متوفر"}
                                </span>
                              </div>
                            </div>

                            <div className="flex w-fit shrink-0 items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                              <FaLocationDot className="text-blue-500" />
                              {distance} كم
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-3 mt-4 sm:grid-cols-2">
                    
<div className="flex flex-col items-center p-3 border-2 rounded-2xl border-emerald-100 bg-emerald-50/70">
  <div className="flex items-center justify-center mx-auto text-center gap-0.5">
    <div className="flex items-center justify-center w-8 h-8 bg-white rounded-lg shadow-sm text-emerald-600 md:h-11 md:w-11">
      <FaBedPulse size={19} />
    </div>

    <p className="text-2xl font-bold text-emerald-600">
      {availableBeds}
    </p>

    <p className="text-[11px] font-medium text-emerald-600">
      سرير متاح
    </p>
  </div>

<p className="mt-2 text-[10px] text-emerald-500">
  {
  hospital?.unit?.bedsUpdatedAt &&
  getBedsUpdateText(hospital?.unit?.bedsUpdatedAt)
  }
</p>
</div>

                      </div>
<div className="flex items-center justify-center gap-2 p-2 mt-3 text-xs font-medium text-red-600 border border-red-100 rounded-xl bg-red-50">
  <IoWarningSharp className="text-base shrink-0" />
  <p>يُرجى الاتصال قبل التوجه للتأكد من توافر السرير.</p>
</div>
                      <div className="flex flex-col gap-3 mt-4 sm:flex-row">
                        <button
                          type="button"
                          disabled={!hospital.phone}
                          onClick={() => handleCall(hospital.phone)}
                          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <FaPhone />
                          اتصال بالمستشفى
                        </button>

                        <button
                          type="button"
                          disabled={!hasCoordinates}
                          onClick={() => handleDirections(hospital)}
                          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <FaRoute />
                          الاتجاهات
                        </button>
                      </div>
                    </div>

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
