"use client";

import React, { useContext, useEffect, useState } from "react";

import {
  FaUser,
  FaEnvelope,
  FaShieldHalved,
  FaPenToSquare,
  FaCheck,
  FaXmark,
} from "react-icons/fa6";

import { authContext } from "../../../providers/Auth.jsx";

const Profile = () => {
  const {
    profile,
    loadding,
    handleUpdateProfileSubmit,
  } = useContext(authContext);

  const user = profile?.data?.user;

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  // تحميل بيانات المستخدم الحقيقية
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  // تغيير البيانات
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // فتح التعديل
  const handleEdit = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
    });

    setIsEditing(true);
  };

  // إلغاء التعديل
  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
    });

    setIsEditing(false);
  };

  // حفظ البيانات
const handleSave = async () => {
  const values = {
    name: formData.name.trim(),
    email: formData.email.trim(),
  };

  if (!values.name || !values.email) {
    return;
  }

  const result = await handleUpdateProfileSubmit(values);

  if (result?.success !== false) {
    setIsEditing(false);
  }
};
  // اسم الـ Role بالعربي
  const getRoleLabel = (role) => {
    switch (role) {
      case "platform_admin":
        return "مسؤول المنصة";

      case "hospital_admin":
        return "مسؤول المركز";

      default:
        return "مستخدم";
    }
  };

  // اسم الـ Role بالإنجليزي
  const getRoleEnglish = (role) => {
    switch (role) {
      case "platform_admin":
        return "Platform Admin";

      case "hospital_admin":
        return "Hospital Admin";

      default:
        return "User";
    }
  };

  // استخراج الـ initials
  const getInitials = (name) => {
    if (!name) return "م";

    return (
      name
        .trim()
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase() || "م"
    );
  };

  const userName = user?.name || "المستخدم";
  const userEmail = user?.email || "";

  const userRole = getRoleLabel(user?.role);
  const userRoleEnglish = getRoleEnglish(user?.role);

  const initials = getInitials(userName);

  const isActive = user?.isActive !== false;

  return (
    <section
      className="py-8 md:py-10"
      dir="rtl"
    >
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 text-[10px] tracking-[0.3em] text-[#94A3B8]">
          <span className="h-px w-8 bg-[#263244]" />

          <span>04 / PROFILE</span>
        </div>

        <div className="flex flex-col justify-between gap-5 mt-6 md:flex-row md:items-end">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-[#F8FAFC] sm:text-4xl">
              البروفايل
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#94A3B8]">
              إدارة بيانات حسابك ومعلومات الوصول إلى المنصة.
            </p>
          </div>

          {!isEditing && (
            <button
              type="button"
              onClick={handleEdit}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#263244] bg-[#111827] px-5 text-sm text-[#F8FAFC] transition-all duration-200 hover:border-[#38BDF8]/40 hover:text-[#38BDF8]"
            >
              <FaPenToSquare className="text-xs" />

              تعديل البيانات
            </button>
          )}
        </div>
      </div>

      {/* Profile Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">

        {/* Profile Identity */}
        <div className="relative overflow-hidden rounded-2xl border border-[#263244] bg-[#151D2B] p-7 lg:col-span-4">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.25]"
            style={{
              backgroundImage: `
                linear-gradient(
                  rgba(148,163,184,0.05) 1px,
                  transparent 1px
                ),
                linear-gradient(
                  90deg,
                  rgba(148,163,184,0.05) 1px,
                  transparent 1px
                )
              `,
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative">

            {/* Avatar */}
            <div className="flex items-center justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#38BDF8]/30 bg-[#38BDF8]/10">
                <span className="text-2xl font-semibold text-[#38BDF8]">
                  {initials}
                </span>
              </div>
            </div>

            {/* Name */}
            <div className="mt-6 text-center">
              <h2 className="text-xl font-semibold text-[#F8FAFC]">
                {userName}
              </h2>

              <p className="mt-2 text-sm text-[#94A3B8]">
                {userRole}
              </p>

              {userEmail && (
                <p className="mt-2 truncate text-xs text-[#64748B]">
                  {userEmail}
                </p>
              )}
            </div>

            {/* Status */}
            <div className="mt-7 flex items-center justify-center gap-2 border-t border-[#263244] pt-5">
              <span
                className={`h-2 w-2 rounded-full ${
                  isActive
                    ? "bg-[#22C55E]"
                    : "bg-[#EF4444]"
                }`}
              />

              <span className="text-xs text-[#94A3B8]">
                {isActive
                  ? "الحساب نشط"
                  : "الحساب غير نشط"}
              </span>
            </div>

            {/* Role */}
            <div className="mt-5 flex items-center justify-between rounded-xl border border-[#263244] bg-[#111827] px-4 py-3">
              <div className="flex items-center gap-3">
                <FaShieldHalved className="text-xs text-[#38BDF8]" />

                <span className="text-xs text-[#94A3B8]">
                  الصلاحية
                </span>
              </div>

              <span className="text-xs font-medium text-[#F8FAFC]">
                {userRoleEnglish}
              </span>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="rounded-2xl border border-[#263244] bg-[#151D2B] p-7 lg:col-span-8">

          {/* Section Header */}
          <div className="flex items-center justify-between border-b border-[#263244] pb-5">
            <div>
              <span className="text-[10px] tracking-[0.25em] text-[#94A3B8]">
                ACCOUNT INFORMATION
              </span>

              <h2 className="mt-2 text-lg font-semibold text-[#F8FAFC]">
                البيانات الأساسية
              </h2>
            </div>

            <FaUser className="text-sm text-[#38BDF8]" />
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-1 gap-5 mt-7 md:grid-cols-2">

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-xs text-[#94A3B8]"
              >
                الاسم
              </label>

              <div className="relative">
                <FaUser className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#94A3B8]/60" />

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing || loadding}
                  className="h-12 w-full rounded-xl border border-[#263244] bg-[#111827] pr-11 pl-4 text-sm text-[#F8FAFC] outline-none transition-all placeholder:text-[#94A3B8]/50 focus:border-[#38BDF8]/50 disabled:cursor-default disabled:opacity-70"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs text-[#94A3B8]"
              >
                البريد الإلكتروني
              </label>

              <div className="relative">
                <FaEnvelope className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#94A3B8]/60" />

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing || loadding}
                  className="h-12 w-full rounded-xl border border-[#263244] bg-[#111827] pr-11 pl-4 text-sm text-[#F8FAFC] outline-none transition-all placeholder:text-[#94A3B8]/50 focus:border-[#38BDF8]/50 disabled:cursor-default disabled:opacity-70"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          {isEditing && (
            <div className="mt-7 flex items-center justify-end gap-3 border-t border-[#263244] pt-6">

              {/* Cancel */}
              <button
                type="button"
                onClick={handleCancel}
                disabled={loadding}
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-[#263244] px-5 text-sm text-[#94A3B8] transition-all hover:border-[#94A3B8]/40 hover:text-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FaXmark className="text-xs" />

                إلغاء
              </button>

              {/* Save */}
              <button
                type="button"
                onClick={handleSave}
                disabled={
                  loadding ||
                  !formData.name.trim() ||
                  !formData.email.trim()
                }
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#38BDF8] px-6 text-sm font-medium text-[#080B12] transition-all hover:bg-[#38BDF8]/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loadding ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#080B12]/30 border-t-[#080B12]" />

                    جاري الحفظ...
                  </>
                ) : (
                  <>
                    <FaCheck className="text-xs" />

                    حفظ التغييرات
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;