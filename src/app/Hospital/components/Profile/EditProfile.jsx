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
  FaHospital,
  FaPhone,
  FaLocationDot,
} from "react-icons/fa6";

import { authContext } from "../../../providers/Auth.jsx";

const EditProfile = () => {
  const {
    profile,
    setOpenUpdateProfile,
    handleUpdateProfileSubmit,
  } = useContext(authContext);

  const user = profile?.data?.user;
  const facility = profile?.data?.facility;

  const isHospitalAdmin = user?.role === "hospital_admin";

  const initialValues = {
    name: user?.name || "",
    email: user?.email || "",
    facilityName: facility?.name || "",
    facilityPhone: facility?.phone || "",
    facilityAddress: facility?.address || "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required("الاسم مطلوب")
      .min(2, "الاسم يجب أن يكون حرفين على الأقل"),

    email: Yup.string()
      .trim()
      .email("البريد الإلكتروني غير صحيح")
      .required("البريد الإلكتروني مطلوب"),

    ...(isHospitalAdmin
      ? {
          facilityName: Yup.string()
            .trim()
            .required("اسم المنشأة مطلوب"),

          facilityPhone: Yup.string()
            .trim()
            .required("رقم الهاتف مطلوب"),

          facilityAddress: Yup.string()
            .trim()
            .required("العنوان مطلوب"),
        }
      : {}),
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="w-full max-w-lg overflow-hidden bg-white shadow-2xl rounded-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b shrink-0 border-slate-200">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              تعديل البيانات
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              تعديل بيانات الحساب
              {isHospitalAdmin && " والمنشأة الطبية"}
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

        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleUpdateProfileSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="p-5 space-y-5 overflow-y-auto">
              {/* Account Section */}
              <div>
                <h3 className="mb-4 text-sm font-bold text-slate-800">
                  بيانات الحساب
                </h3>

                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-slate-700">
                      <FaUser size={13} />
                      اسم المسؤول
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
                </div>
              </div>

              {/* Facility Section */}
              {isHospitalAdmin && (
                <div className="pt-5 border-t border-slate-200">
                  <h3 className="flex items-center gap-2 mb-4 text-sm font-bold text-slate-800">
                    <FaHospital className="text-blue-600" size={15} />
                    بيانات المنشأة الطبية
                  </h3>

                  <div className="space-y-4">
                    {/* Facility Name */}
                    <div>
                      <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-slate-700">
                        <FaHospital size={13} />
                        اسم المستشفى أو الحضانة
                      </label>

                      <Field
                        type="text"
                        name="facilityName"
                        placeholder="أدخل اسم المنشأة"
                        className="w-full px-4 py-3 text-sm transition bg-white border outline-none rounded-xl border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />

                      <ErrorMessage
                        name="facilityName"
                        component="p"
                        className="mt-1.5 text-xs text-red-500"
                      />
                    </div>

                    {/* Facility Phone */}
                    <div>
                      <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-slate-700">
                        <FaPhone size={13} />
                        رقم الهاتف
                      </label>

                      <Field
                        type="tel"
                        name="facilityPhone"
                        placeholder="أدخل رقم الهاتف"
                        className="w-full px-4 py-3 text-sm transition bg-white border outline-none rounded-xl border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />

                      <ErrorMessage
                        name="facilityPhone"
                        component="p"
                        className="mt-1.5 text-xs text-red-500"
                      />
                    </div>

                    {/* Facility Address */}
                    <div>
                      <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-slate-700">
                        <FaLocationDot size={13} />
                        عنوان المنشأة
                      </label>

                      <Field
                        type="text"
                        name="facilityAddress"
                        placeholder="أدخل عنوان المنشأة"
                        className="w-full px-4 py-3 text-sm transition bg-white border outline-none rounded-xl border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />

                      <ErrorMessage
                        name="facilityAddress"
                        component="p"
                        className="mt-1.5 text-xs text-red-500"
                      />
                    </div>
                  </div>
                </div>
              )}

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
                  {isSubmitting ? "جارٍ الحفظ..." : "حفظ التعديلات"}
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
