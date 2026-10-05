"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import {
  FaEnvelope,
  FaLock,
  FaArrowLeft,
  FaShieldHeart,
  FaBedPulse,
  FaHeartPulse,
  FaCheck,
} from "react-icons/fa6";

import { authContext } from "../../providers/Auth.jsx";

import logo from "../../../images/logo.png";
import Image from "next/image.js";

const loginSchema = Yup.object({
  email: Yup.string()
    .email("من فضلك أدخل بريد إلكتروني صحيح")
    .required("البريد الإلكتروني مطلوب"),

  password: Yup.string()
    .required("كلمة المرور مطلوبة")
    .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
});

const Login = () => {
  const { handleLoginSubmit, loadding } = useContext(authContext);

  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <main className="min-h-screen bg-[#080B12] text-[#F8FAFC]">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* =====================================================
            BRANDING SIDE
        ====================================================== */}
        <section className="relative hidden overflow-hidden border-l border-[#1E293B] bg-[#0B1019] lg:flex">

          {/* Background Grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(148,163,184,0.07) 1px, transparent 1px),
                linear-gradient(90deg, rgba(148,163,184,0.07) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />

          {/* Glow */}
          <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-[#38BDF8]/10 blur-3xl" />

          <div className="pointer-events-none absolute -left-32 bottom-10 h-96 w-96 rounded-full bg-[#38BDF8]/10 blur-3xl" />

          <div className="relative z-10 flex flex-col justify-between w-full p-10 xl:p-16">

            {/* Logo */}
            <div>
              <div className="flex items-center gap-4">

  <div className="flex items-center justify-center w-20 h-20 overflow-visible">
  <Image
    src={logo}
    alt="سرير"
    width={110}
    height={110}
    priority
    className="h-20 w-20 scale-[1.7] object-contain"
  />
</div>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">
                    سرير
                  </h1>

                  <p className="mt-1 text-xs text-[#64748B]">
                    Seerer Healthcare Platform
                  </p>
                </div>

              </div>
            </div>

            {/* Main Branding */}
            <div className="max-w-xl">

              {/* Small Label */}
              <div className="mb-6 flex items-center gap-3 text-xs font-medium tracking-[0.18em] text-[#38BDF8]">
                <span className="h-px w-8 bg-[#38BDF8]" />
                HEALTHCARE PLATFORM
              </div>

              <h2 className="text-4xl gap-1 font-bold leading-[1.25] xl:text-5xl">
                أقرب رعاية
              
                <span className="text-[#38BDF8]">
                  ليك
                </span>
              </h2>

              <p className="mt-6 max-w-md text-sm leading-8 text-[#94A3B8]">
                منصة تساعد المرضى على الوصول إلى أقرب المستشفيات
                ومعرفة مدى توفر الأسرة في الحضانات والعناية المركزة
                بشكل أسرع وأسهل.
              </p>

              {/* Features */}
              <div className="mt-10 space-y-4">

                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#263244] bg-[#111827] text-[#38BDF8]">
                    <FaBedPulse />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-[#E2E8F0]">
                      متابعة توفر الأسرة
                    </p>

                    <p className="mt-1 text-xs text-[#64748B]">
                      معرفة الأسرة المتاحة في أقرب منشأة
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#263244] bg-[#111827] text-[#38BDF8]">
                    <FaHeartPulse />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-[#E2E8F0]">
                      رعاية أسرع
                    </p>

                    <p className="mt-1 text-xs text-[#64748B]">
                      الوصول للمكان المناسب في الوقت المناسب
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#263244] bg-[#111827] text-[#38BDF8]">
                    <FaShieldHeart />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-[#E2E8F0]">
                      منصة موثوقة
                    </p>

                    <p className="mt-1 text-xs text-[#64748B]">
                      إدارة آمنة ومركزية للبيانات الصحية
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom */}
            <div className="flex items-center justify-between border-t border-[#1E293B] pt-6">

              <p className="text-[11px] text-[#475569]">
                © {new Date().getFullYear()} Seerer
              </p>

              <div className="flex items-center gap-2 text-[10px] text-[#64748B]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                النظام يعمل بشكل طبيعي
              </div>

            </div>

          </div>
        </section>

        {/* =====================================================
            LOGIN SIDE
        ====================================================== */}
      <section className="flex items-center justify-center min-h-screen px-5 py-10 sm:px-8 lg:px-12 xl:px-20">
  <div className="w-full max-w-[440px]">

    {/* Mobile Logo */}
    <div className="mb-10 text-center lg:hidden">
      <div className="flex items-center justify-center w-20 h-20 mx-auto">
        <Image
          src={logo}
          alt="سرير"
          width={100}
          height={100}
          priority
          className="h-20 w-20 scale-[1.35] object-contain"
        />
      </div>

      <h1 className="mt-3 text-xl font-bold text-[#F8FAFC]">
        سرير
      </h1>

      <p className="mt-1 text-xs text-[#64748B]">
        مركز إدارة الخدمات الصحية
      </p>
    </div>

    {/* Form Header */}
    <div className="mb-9">

      <div className="mb-5 flex items-center gap-3 text-[10px] font-medium tracking-[0.25em] text-[#64748B]">
        <span className="h-px w-8 bg-[#263244]" />
        <span>SECURE ACCESS</span>
      </div>

      <h2 className="text-3xl font-bold tracking-tight text-[#F8FAFC]">
        تسجيل الدخول
      </h2>

      <p className="mt-3 text-sm leading-7 text-[#64748B]">
        أدخل بيانات حسابك للوصول إلى لوحة التحكم.
      </p>
    </div>

    {/* Form */}
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
      onSubmit={handleLoginSubmit}
    >
      <Form className="space-y-6">

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2.5 block text-sm font-medium text-[#CBD5E1]"
          >
            البريد الإلكتروني
          </label>

          <div className="relative group">

            {/* Icon */}
            <div className="pointer-events-none absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg bg-[#161D2A] text-[#64748B] transition-colors duration-200 group-focus-within:text-[#38BDF8]">
              <FaEnvelope className="text-sm" />
            </div>

            <Field
              id="email"
              name="email"
              type="email"
              placeholder="example@seerer.io"
              autoComplete="email"
              className="h-12 w-full rounded-xl border border-[#263244] bg-[#0D131D] pr-14 pl-4 text-sm text-[#F8FAFC] outline-none transition-all duration-200 placeholder:text-[#475569] hover:border-[#334155] focus:border-[#38BDF8]/60 focus:bg-[#0F1621] focus:ring-4 focus:ring-[#38BDF8]/5"
            />
          </div>

          <ErrorMessage
            name="email"
            component="p"
            className="mt-2 text-xs text-[#EF4444]"
          />
        </div>

        {/* Password */}
        <div>

          <div className="mb-2.5 flex items-center justify-between">

            <label
              htmlFor="password"
              className="text-sm font-medium text-[#CBD5E1]"
            >
              كلمة المرور
            </label>

            <Link
              href="/ForgetPassword"
              className="text-xs font-medium text-[#38BDF8] transition-colors duration-200 hover:text-[#7DD3FC]"
            >
              نسيت كلمة المرور؟
            </Link>
          </div>

          <div className="relative group">

            {/* Icon */}
            <div className="pointer-events-none absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg bg-[#161D2A] text-[#64748B] transition-colors duration-200 group-focus-within:text-[#38BDF8]">
              <FaLock className="text-sm" />
            </div>

            <Field
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              className="h-12 w-full rounded-xl border border-[#263244] bg-[#0D131D] pr-14 pl-4 text-sm tracking-[0.2em] text-[#F8FAFC] outline-none transition-all duration-200 placeholder:text-[#475569] hover:border-[#334155] focus:border-[#38BDF8]/60 focus:bg-[#0F1621] focus:ring-4 focus:ring-[#38BDF8]/5"
            />
          </div>

          <ErrorMessage
            name="password"
            component="p"
            className="mt-2 text-xs text-[#EF4444]"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loadding}
          className="group mt-2 flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-[#38BDF8] text-sm font-bold text-[#080B12] shadow-sm transition-all duration-200 hover:bg-[#7DD3FC] hover:shadow-lg hover:shadow-[#38BDF8]/10 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span>
            {loadding
              ? "جاري تسجيل الدخول..."
              : "تسجيل الدخول"}
          </span>

          {!loadding && (
            <FaArrowLeft className="text-xs transition-transform duration-200 group-hover:-translate-x-1" />
          )}
        </button>

      </Form>
    </Formik>

    {/* Security Info */}
    <div className="mt-8 flex items-center justify-center gap-2 text-[11px] text-[#475569]">
      <FaCheck className="text-[#22C55E]" />

      <span>
        بياناتك محمية ويتم التعامل معها بأمان
      </span>
    </div>

    {/* Footer */}
    <div className="mt-8 border-t border-[#1E293B] pt-5 text-center">
      <p className="text-[11px] text-[#475569]">
        Seerer Healthcare Platform
      </p>
    </div>

  </div>
</section>

      </div>
    </main>
  );
};

export default Login;

