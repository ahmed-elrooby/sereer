"use client";

import React, { useContext, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  FaLock,
  FaEye,
  FaEyeSlash,
  FaKey,
  FaCheckCircle,
} from "react-icons/fa";

import { authContext } from "../../providers/Auth.jsx";

const ResetPassword = () => {
  const { handleResetPasswordSubmit, loadding } =
    useContext(authContext);

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .required("كلمة المرور مطلوبة")
      .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
      .matches(
        /[A-Z]/,
        "يجب أن تحتوي على حرف إنجليزي كبير واحد على الأقل"
      )
      .matches(
        /[a-z]/,
        "يجب أن تحتوي على حرف إنجليزي صغير واحد على الأقل"
      )
      .matches(
        /[0-9]/,
        "يجب أن تحتوي على رقم واحد على الأقل"
      ),

    confirmPassword: Yup.string()
      .required("تأكيد كلمة المرور مطلوب")
      .oneOf(
        [Yup.ref("password")],
        "تأكيد كلمة المرور غير مطابق لكلمة المرور"
      ),
  });

  const handleSubmit = (values) => {
    if (!token) {
      return;
    }

    handleResetPasswordSubmit({
      token,
      values,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-10 bg-slate-50">
      <div className="w-full max-w-md">

        <div className="mb-6 text-center">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-blue-600 bg-blue-100 rounded-2xl">
            <FaKey className="text-2xl" />
          </div>

          <h1 className="text-2xl font-bold text-slate-800">
            إعادة تعيين كلمة المرور
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            قم بإنشاء كلمة مرور جديدة وآمنة لحسابك
          </p>
        </div>

        <div className="p-6 bg-white border shadow-sm border-slate-100 rounded-2xl sm:p-8">

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form className="space-y-5">

                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-semibold text-slate-700"
                  >
                    كلمة المرور الجديدة
                  </label>

                  <div className="relative">
                    <FaLock className="absolute text-sm -translate-y-1/2 right-4 top-1/2 text-slate-400" />

                    <Field
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="أدخل كلمة المرور الجديدة"
                      className="w-full py-3 pl-12 text-sm transition bg-white border outline-none pr-11 text-slate-700 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => !prev)
                      }
                      className="absolute -translate-y-1/2 left-4 top-1/2 text-slate-400 hover:text-blue-600"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  <ErrorMessage
                    name="password"
                    component="p"
                    className="mt-1.5 text-xs font-medium text-red-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-2 text-sm font-semibold text-slate-700"
                  >
                    تأكيد كلمة المرور
                  </label>

                  <div className="relative">
                    <FaLock className="absolute text-sm -translate-y-1/2 right-4 top-1/2 text-slate-400" />

                    <Field
                      id="confirmPassword"
                      name="confirmPassword"
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="أعد كتابة كلمة المرور"
                      className="w-full py-3 pl-12 text-sm transition bg-white border outline-none pr-11 text-slate-700 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          (prev) => !prev
                        )
                      }
                      className="absolute -translate-y-1/2 left-4 top-1/2 text-slate-400 hover:text-blue-600"
                    >
                      {showConfirmPassword ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}
                    </button>
                  </div>

                  <ErrorMessage
                    name="confirmPassword"
                    component="p"
                    className="mt-1.5 text-xs font-medium text-red-500"
                  />
                </div>

                <div className="p-4 border rounded-xl bg-slate-50 border-slate-100">
                  <p className="mb-3 text-xs font-bold text-slate-700">
                    كلمة المرور يجب أن تحتوي على:
                  </p>

                  <div className="space-y-2 text-xs text-slate-500">

                    <div className="flex items-center gap-2">
                      <FaCheckCircle
                        className={
                          values.password.length >= 8
                            ? "text-emerald-500"
                            : "text-slate-300"
                        }
                      />
                      <span>8 أحرف على الأقل</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <FaCheckCircle
                        className={
                          /[A-Z]/.test(values.password)
                            ? "text-emerald-500"
                            : "text-slate-300"
                        }
                      />
                      <span>حرف إنجليزي كبير</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <FaCheckCircle
                        className={
                          /[a-z]/.test(values.password)
                            ? "text-emerald-500"
                            : "text-slate-300"
                        }
                      />
                      <span>حرف إنجليزي صغير</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <FaCheckCircle
                        className={
                          /[0-9]/.test(values.password)
                            ? "text-emerald-500"
                            : "text-slate-300"
                        }
                      />
                      <span>رقم واحد على الأقل</span>
                    </div>

                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loadding}
                  className="flex items-center justify-center w-full gap-2 py-3.5 text-sm font-bold text-white transition bg-blue-600 rounded-xl hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loadding ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin" />
                      جاري تحديث كلمة المرور...
                    </>
                  ) : (
                    <>
                      <FaKey />
                      تحديث كلمة المرور
                    </>
                  )}
                </button>

              </Form>
            )}
          </Formik>
        </div>

        <p className="mt-6 text-xs text-center text-slate-400">
          تأكد من اختيار كلمة مرور قوية وعدم مشاركتها مع أي شخص.
        </p>

      </div>
    </div>
  );
};

export default ResetPassword;