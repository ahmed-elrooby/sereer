"use client";

import React, { useContext } from "react";

import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from "formik";

import * as Yup from "yup";

import {
  FaEnvelope,
  FaArrowRight,
  FaShieldHeart,
} from "react-icons/fa6";
import { authContext } from "../../providers/Auth.jsx";


const Forget = () => {
const {handleForgetPasswordSubmit,loadding} = useContext(authContext);
  const initialValues = {
    email: "",
  };


  const validationSchema = Yup.object({
    email: Yup.string()
      .email("البريد الإلكتروني غير صحيح")
      .required("البريد الإلكتروني مطلوب"),
  });


 


  return (
    <div
    
      className="min-h-screen px-4 py-8 text-white bg-slate-950 sm:px-6"
    >

      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">

        <div className="w-full max-w-md">

          {/* Logo / Icon */}

          <div className="flex justify-center mb-8">

            <div className="flex items-center justify-center w-16 h-16 text-blue-500 rounded-2xl bg-blue-600/10 ring-1 ring-blue-500/20">

              <FaShieldHeart size={28} />

            </div>

          </div>


          {/* Card */}

          <div className="p-6 border shadow-2xl rounded-2xl border-slate-800 bg-slate-900/70 backdrop-blur-sm sm:p-8">

            {/* Header */}

            <div className="mb-8 text-center">

              <h1 className="text-2xl font-bold tracking-tight text-white">

                نسيت كلمة المرور؟

              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-400">

                أدخل بريدك الإلكتروني وسنرسل لك رابطًا
                لإعادة تعيين كلمة المرور.

              </p>

            </div>


            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleForgetPasswordSubmit}
            >

              {({ isSubmitting }) => (

                <Form className="space-y-6">

                  {/* Email */}

                  <div>

                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-slate-300"
                    >

                      البريد الإلكتروني

                    </label>


                    <div className="relative">

                      <FaEnvelope
                        className="absolute -translate-y-1/2 right-4 top-1/2 text-slate-500"
                        size={16}
                      />


                      <Field
                        id="email"
                        type="email"
                        name="email"
                        placeholder="أدخل البريد الإلكتروني"
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3.5 pr-11 pl-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />

                    </div>


                    <ErrorMessage
                      name="email"
                      component="p"
                      className="mt-2 text-xs text-red-400"
                    />

                  </div>


                  {/* Submit */}

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                  >

                    {loadding ? (
                      "جاري الإرسال..."
                    ) : (
                      <>
                        إرسال رابط الاستعادة

                        <FaArrowRight
                          size={14}
                          className="rotate-180"
                        />
                      </>
                    )}

                  </button>

                </Form>

              )}

            </Formik>


            {/* Footer */}

            <div className="pt-6 mt-6 text-center border-t border-slate-800">

              <button
                type="button"
                className="text-sm font-medium text-blue-500 transition hover:text-blue-400"
                onClick={() => window.history.back()}
              >

                العودة لتسجيل الدخول

              </button>

            </div>

          </div>


          {/* Bottom Text */}

          <p className="mt-6 text-xs text-center text-slate-600">

            سرير — أقرب رعاية ليك

          </p>

        </div>

      </div>

    </div>
  );
};


export default Forget;