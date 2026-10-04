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
  FaBaby,
  FaBed,
  FaXmark,
} from "react-icons/fa6";

import { Hospital } from "../../../../providers/HospitalContext.jsx";

const AddIncu = () => {
  const {
    handleAddIncuUnitSubmit,
    openAddIncu,
    setOpenAddIncu,
    loadding,
  } = useContext(Hospital);

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required("اسم الحضانة مطلوب")
      .min(2, "اسم الحضانة يجب أن يكون حرفين على الأقل"),

    type: Yup.string()
      .oneOf(["NICU"], "نوع الوحدة غير صحيح")
      .required("نوع الوحدة مطلوب"),

    availableBeds: Yup.number()
      .typeError("عدد الأسرة يجب أن يكون رقمًا")
      .integer("عدد الأسرة يجب أن يكون رقمًا صحيحًا")
      .min(0, "عدد الأسرة لا يمكن أن يكون أقل من 0")
      .required("عدد الأسرة مطلوب"),
  });

  if (!openAddIncu) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden bg-white shadow-2xl rounded-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="grid w-10 h-10 text-blue-600 rounded-xl place-items-center bg-blue-50">
              <FaBaby size={18} />
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900">
                إضافة حضّانة
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                أضف وحدة حضّانة جديدة للمستشفى
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpenAddIncu(false)}
            className="grid transition rounded-lg w-9 h-9 place-items-center text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <FaXmark size={16} />
          </button>
        </div>

        {/* Form */}
        <Formik
          initialValues={{
            name: "",
            type: "NICU",
            availableBeds: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleAddIncuUnitSubmit}
        >
          {({ errors, touched }) => (
            <Form className="p-5 space-y-5" dir="rtl">
              {/* Name */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-slate-700">
                  اسم الوحدة
                </label>

                <Field
                  name="name"
                  type="text"
                  placeholder="مثال: حضّانة الأطفال"
                  className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                    errors.name && touched.name
                      ? "border-red-400 focus:ring-4 focus:ring-red-50"
                      : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  }`}
                />

                <ErrorMessage
                  name="name"
                  component="p"
                  className="mt-1.5 text-xs font-medium text-red-500"
                />
              </div>

          

              {/* Available Beds */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-slate-700">
                  عدد الأسرة المتاحة
                </label>

                <div className="relative">
                  <Field
                    name="availableBeds"
                    type="number"
                    min="0"
                    placeholder="مثال: 5"
                    className={`w-full rounded-xl border px-4 py-3 pr-11 text-sm outline-none transition ${
                      errors.availableBeds && touched.availableBeds
                        ? "border-red-400 focus:ring-4 focus:ring-red-50"
                        : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    }`}
                  />

                  <FaBed
                    size={15}
                    className="absolute text-slate-400 right-4 top-3.5"
                  />
                </div>

                <ErrorMessage
                  name="availableBeds"
                  component="p"
                  className="mt-1.5 text-xs font-medium text-red-500"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpenAddIncu(false)}
                  className="flex-1 px-4 py-3 text-sm font-semibold transition border rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  disabled={loadding}
                  className="flex-1 px-4 py-3 text-sm font-semibold text-white transition bg-blue-600 rounded-xl hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loadding ? "جاري الإضافة..." : "إضافة الوحدة"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddIncu;
