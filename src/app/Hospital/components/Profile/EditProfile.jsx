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
  FaXmark,
  FaFloppyDisk,
  FaUser,
  FaEnvelope,
} from "react-icons/fa6";

import { authContext } from "../../../providers/Auth.jsx";

const EditProfile = () => {
  const {
    profile,
        setOpenUpdateProfile,
    handleUpdateProfileSubmit,
  } = useContext(authContext);
  const user = profile?.data?.user;

  const initialValues = {
    name: user?.name || "",
    email: user?.email || "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("الاسم مطلوب")
      .min(2, "الاسم يجب أن يكون حرفين على الأقل"),

    email: Yup.string()
      .email("البريد الإلكتروني غير صحيح")
      .required("البريد الإلكتروني مطلوب"),
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="w-full max-w-lg overflow-hidden bg-white shadow-2xl rounded-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              تعديل البيانات
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              تعديل بيانات الحساب
            </p>
          </div>

          <button
            type="button"
            onClick={() => setOpenUpdateProfile(false)}
            className="flex items-center justify-center transition rounded-lg w-9 h-9 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
          >
            <FaXmark size={18} />
          </button>
        </div>

        {/* Form */}
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleUpdateProfileSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="p-5 space-y-5">

              {/* Name */}
              <div>
                <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-slate-700">
                  <FaUser size={13} />
                  الاسم
                </label>

                <Field
                  type="text"
                  name="name"
                  placeholder="أدخل الاسم"
                  className="w-full px-4 py-3 text-sm transition bg-white border outline-none rounded-xl border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <ErrorMessage
                  name="name"
                  component="p"
                  className="mt-1.5 text-xs text-red-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-slate-700">
                  <FaEnvelope size={13} />
                  البريد الإلكتروني
                </label>

                <Field
                  type="email"
                  name="email"
                  placeholder="أدخل البريد الإلكتروني"
                  className="w-full px-4 py-3 text-sm transition bg-white border outline-none rounded-xl border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <ErrorMessage
                  name="email"
                  component="p"
                  className="mt-1.5 text-xs text-red-500"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">

                <button
                  type="button"
                  onClick={() => setOpenUpdateProfile(false)}
                  className="px-5 py-2.5 text-sm font-semibold transition border rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white transition bg-blue-600 rounded-xl hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <FaFloppyDisk size={14} />
                  حفظ التعديلات
                </button>

              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditProfile;
