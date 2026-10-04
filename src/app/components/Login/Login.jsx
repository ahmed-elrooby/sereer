"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  FaEnvelope,
  FaLock,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa6";
import { authContext } from "../../providers/Auth.jsx";

const loginSchema = Yup.object({
  email: Yup.string()
    .email("من فضلك أدخل بريد إلكتروني صحيح")
    .required("البريد الإلكتروني مطلوب"),

  password: Yup.string()
    .required("كلمة المرور مطلوبة")
    .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
});

const Login = () => {
    const {handleLoginSubmit,loadding}=useContext(authContext)
  const initialValues = {
    email: "",
    password: "",
  };



  return (
    <main
     
      className="flex  items-center min-h-full justify-center bg-[#080B12] px-4 py-8 md:py-4 text-[#F8FAFC]"
    >
      <div className="w-full max-w-[460px]">
        {/* Logo / Brand */}
        <div className="mb-5 text-center">
          

          <h1 className="mt-2 text-2xl font-semibold tracking-tight">
            Seerer
          </h1>

          <p className="mt-2 text-sm text-[#94A3B8]">
            مركز إدارة الخدمات الصحية
          </p>
        </div>

        {/* Card */}
        <div className="relative overflow-hidden rounded-2xl border border-[#263244] bg-[#111827] p-4 shadow-2xl md:p-6">
          {/* Grid Background */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.2]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(148,163,184,0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(148,163,184,0.05) 1px, transparent 1px)
              `,
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative">
            {/* Heading */}
            <div className="mb-8">
              <div className="flex items-center gap-3 text-[10px] tracking-[0.25em] text-[#94A3B8]">
                <span className="h-px w-7 bg-[#263244]" />
                <span>SECURE ACCESS</span>
              </div>

              <h2 className="mt-5 text-2xl font-semibold text-[#F8FAFC]">
                تسجيل الدخول
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">
                أدخل بيانات حسابك للوصول إلى لوحة التحكم.
              </p>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={loginSchema}
              onSubmit={handleLoginSubmit}
            >
                <Form className="space-y-5">
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-xs font-medium text-[#CBD5E1]"
                    >
                      البريد الإلكتروني
                    </label>

                    <div className="relative">
                      <FaEnvelope className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#94A3B8]/60" />

                      <Field
                        id="email"
                        name="email"
                        type="email"
                        placeholder="example@seerer.io"
                        autoComplete="email"
                        className="h-12 w-full rounded-xl border border-[#263244] bg-[#080B12] pr-11 pl-4 text-sm text-[#F8FAFC] outline-none transition-all placeholder:text-[#94A3B8]/40 focus:border-[#38BDF8]/50 focus:ring-1 focus:ring-[#38BDF8]/10"
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
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="password"
                        className="text-xs font-medium text-[#CBD5E1]"
                      >
                        كلمة المرور
                      </label>

                      <Link
                        href="/ForgetPassword"
                        className="text-xs text-[#38BDF8] transition-colors hover:text-[#7DD3FC]"
                      >
                        نسيت كلمة المرور؟
                      </Link>
                    </div>

                    <div className="relative">
                      <FaLock className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#94A3B8]/60" />

                      <Field
                        id="password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        autoComplete="current-password"
                        className="h-12 w-full rounded-xl border border-[#263244] bg-[#080B12] pr-11 pl-4 text-sm tracking-wider text-[#F8FAFC] outline-none transition-all placeholder:text-[#94A3B8]/40 focus:border-[#38BDF8]/50 focus:ring-1 focus:ring-[#38BDF8]/10"
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
                    className="group mt-2 flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-[#38BDF8] text-sm font-semibold text-[#080B12] transition-all duration-200 hover:bg-[#7DD3FC] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <span>
                      {loadding ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                    </span>

                    <FaArrowLeft className="text-xs transition-transform duration-200 group-hover:-translate-x-1" />
                  </button>
                </Form>
           
            </Formik>

            {/* Footer */}
            <div className="mt-7 border-t border-[#263244] pt-5 text-center">
              <p className="text-[11px] text-[#64748B]">
                Seerer Healthcare Platform
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-[#475569]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
          <span>النظام يعمل بشكل طبيعي</span>
        </div>
      </div>
    </main>
  );
};

export default Login;