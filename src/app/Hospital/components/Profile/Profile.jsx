"use client";

import React, { useContext } from "react";
import {
  FaUser,
  FaHospital,
  FaEnvelope,
  FaPhone,
  FaLocationDot,
  FaStethoscope,
  FaPen,
} from "react-icons/fa6";

import { authContext } from "../../../providers/Auth.jsx";
import { FaEdit } from "react-icons/fa";
import EditProfile from "./EditProfile.jsx";

const Profile = () => {
  const { profile,openUpdateProfile, setOpenUpdateProfile } = useContext(authContext);

  const user = profile?.data?.user;
  const facility = profile?.data?.facility;

  const services = facility?.services || [];

  const hasNICU = services.includes("NICU");
  const hasICU = services.includes("ICU");

  return <>
  {
    openUpdateProfile && <EditProfile />
  }
  
  
    <section className="p-4 md:p-7">
      <div className="max-w-5xl mx-auto space-y-5">

        {/* Header */}
       <div className="flex flex-col items-center justify-between gap-2 md:flex-row md:gap-0">
         <div>
          <h1 className="text-xl font-bold text-slate-900">
            الملف الشخصي
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            إدارة بيانات حساب المستشفى والبيانات الأساسية.
          </p>
        </div>
        <button type="button" onClick={()=>{setOpenUpdateProfile(true)}} className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white transition bg-blue-600 rounded-xl hover:bg-blue-700" > <FaPen size={13} /> تعديل البيانات </button>
       </div>

        {/* User Information */}
        <div className="overflow-hidden bg-white border shadow-sm rounded-2xl border-slate-200">

          <div className="px-5 py-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="grid text-blue-600 w-11 h-11 rounded-xl bg-blue-50 place-items-center">
                <FaUser size={18} />
              </div>

              <div>
                <h2 className="text-base font-bold text-slate-900">
                  بيانات مدير المستشفى
                </h2>

                <p className="mt-0.5 text-xs text-slate-500">
                  بيانات الحساب المسؤول عن إدارة المستشفى
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 p-5 md:grid-cols-2">

            {/* Name */}
            <div className="p-4 rounded-xl bg-slate-50">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <FaUser size={12} />
                الاسم
              </div>

              <p className="mt-2 text-sm font-semibold text-slate-900">
                {user?.name || "غير متوفر"}
              </p>
            </div>

            {/* Email */}
            <div className="p-4 rounded-xl bg-slate-50">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <FaEnvelope size={12} />
                البريد الإلكتروني
              </div>

              <p className="mt-2 text-sm font-semibold break-all text-slate-900">
                {user?.email || "غير متوفر"}
              </p>
            </div>

          </div>
        </div>

        {/* Facility Information */}
        <div className="overflow-hidden bg-white border shadow-sm rounded-2xl border-slate-200">

          <div className="px-5 py-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="grid text-blue-600 w-11 h-11 rounded-xl bg-blue-50 place-items-center">
                <FaHospital size={18} />
              </div>

              <div>
                <h2 className="text-base font-bold text-slate-900">
                  بيانات المستشفى
                </h2>

                <p className="mt-0.5 text-xs text-slate-500">
                  البيانات الأساسية الخاصة بالمستشفى
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 p-5 md:grid-cols-2">

            {/* Hospital Name */}
            <div className="p-4 rounded-xl bg-slate-50">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <FaHospital size={12} />
                اسم المستشفى
              </div>

              <p className="mt-2 text-sm font-semibold text-slate-900">
                {facility?.name || "غير متوفر"}
              </p>
            </div>

            {/* Phone */}
            <div className="p-4 rounded-xl bg-slate-50">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <FaPhone size={12} />
                رقم الهاتف
              </div>

              <p className="mt-2 text-sm font-semibold text-slate-900">
                {facility?.phone || "غير متوفر"}
              </p>
            </div>

            {/* Governorate */}
            <div className="p-4 rounded-xl bg-slate-50">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <FaLocationDot size={12} />
                المحافظة
              </div>

              <p className="mt-2 text-sm font-semibold text-slate-900">
                {facility?.governorate || "غير متوفر"}
              </p>
            </div>

            {/* City */}
            <div className="p-4 rounded-xl bg-slate-50">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <FaLocationDot size={12} />
                المدينة
              </div>

              <p className="mt-2 text-sm font-semibold text-slate-900">
                {facility?.city || "غير متوفر"}
              </p>
            </div>

            {/* Address */}
            <div className="p-4 rounded-xl bg-slate-50 md:col-span-2">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <FaLocationDot size={12} />
                العنوان
              </div>

              <p className="mt-2 text-sm font-semibold text-slate-900">
                {facility?.address || "غير متوفر"}
              </p>
            </div>

          </div>
        </div>

        {/* Services */}
        <div className="overflow-hidden bg-white border shadow-sm rounded-2xl border-slate-200">

          <div className="px-5 py-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="grid text-blue-600 w-11 h-11 rounded-xl bg-blue-50 place-items-center">
                <FaStethoscope size={18} />
              </div>

              <div>
                <h2 className="text-base font-bold text-slate-900">
                  الخدمات المتاحة
                </h2>

                <p className="mt-0.5 text-xs text-slate-500">
                  خدمات الرعاية المتاحة داخل المستشفى
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 p-5">

            {hasNICU && (
              <div className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-blue-700 rounded-xl bg-blue-50">
                حضّانات الأطفال
              </div>
            )}

            {hasICU && (
              <div className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-blue-700 rounded-xl bg-blue-50">
                العناية المركزة
              </div>
            )}

            {!hasNICU && !hasICU && (
              <p className="text-sm text-slate-500">
                لا توجد خدمات مسجلة.
              </p>
            )}

          </div>
        </div>

        {/* Account Status */}
        <div className="flex flex-col justify-between gap-4 p-5 bg-white border shadow-sm rounded-2xl border-slate-200 sm:flex-row sm:items-center">

          <div>
            <p className="text-sm font-bold text-slate-900">
              حالة الحساب
            </p>

            <p className="mt-1 text-xs text-slate-500">
              حالة المستشفى على المنصة
            </p>
          </div>

          <span
            className={`w-fit rounded-full px-3 py-1.5 text-xs font-semibold ${
              facility?.isActive
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {facility?.isActive ? "الحساب نشط" : "الحساب غير نشط"}
          </span>

        </div>

      </div>
    </section>
 </>
};

export default Profile;

