"use client";

import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaHeartPulse, FaXmark } from "react-icons/fa6";

import { Hospital } from "../../../../providers/HospitalContext.jsx";

const AddIcu = () => {
  const {
    handleAddIncuUnitSubmit,
    openAddIncu,
    setOpenAddIncu,
    loadding,
  } = useContext(Hospital);

  const initialValues = {
    name: "",
    type: "ICU",
    availableBeds: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required("اسم الوحدة مطلوب"),

    availableBeds: Yup.number()
      .typeError("عدد الأسرة يجب أن يكون رقمًا")
      .required("عدد الأسرة مطلوب")
      .min(0, "عدد الأسرة لا يمكن أن يكون أقل من 0")
      .integer("عدد الأسرة يجب أن يكون رقمًا صحيحًا"),
  });

  if (!openAddIncu) return null;

  const handleSubmit = async (values, { resetForm }) => {
    await handleAddIncuUnitSubmit({
      ...values,
      availableBeds: Number(values.availableBeds),
      type: "ICU",
    });

    resetForm();
    setOpenAddIncu(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden bg-white shadow-2xl rounded-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              إضافة وحدة عناية مركزة
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              أضف وحدة العناية وعدد الأسرة المتاحة بها
            </p>
          </div>

          <button
            type="button"
            onClick={() => setOpenAddIncu(false)}
            className="grid transition rounded-lg w-9 h-9 place-items-center text-slate-500 bg-slate-50 hover:bg-slate-100 hover:text-slate-700"
          >
            <FaXmark size={16} />
          </button>
        </div>

        {/* Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="p-5 space-y-5">
              {/* Unit Type */}
              <div className="flex items-center gap-3 p-4 border border-blue-100 rounded-xl bg-blue-50">
                <div className="grid text-blue-600 bg-white w-11 h-11 rounded-xl shrink-0 place-items-center">
                  <FaHeartPulse size={19} />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    العناية المركزة
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    ICU
                  </p>
                </div>
              </div>

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-semibold text-slate-700"
                >
                  اسم الوحدة
                </label>

                <Field
                  id="name"
                  name="name"
                  type="text"
                  placeholder="مثال: وحدة العناية المركزة"
                  className="w-full px-4 py-3 text-sm transition bg-white border outline-none rounded-xl border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

                <ErrorMessage
                  name="name"
                  component="p"
                  className="mt-1.5 text-xs font-medium text-red-500"
                />
              </div>

              {/* Available Beds */}
              <div>
                <label
                  htmlFor="availableBeds"
                  className="block mb-2 text-sm font-semibold text-slate-700"
                >
                  عدد الأسرة المتاحة
                </label>

                <Field
                  id="availableBeds"
                  name="availableBeds"
                  type="number"
                  min="0"
                  placeholder="مثال: 5"
                  className="w-full px-4 py-3 text-sm font-semibold transition bg-white border outline-none rounded-xl border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

                <ErrorMessage
                  name="availableBeds"
                  component="p"
                  className="mt-1.5 text-xs font-medium text-red-500"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-3 px-5 py-4 border-t bg-slate-50 border-slate-200">
              <button
                type="button"
                onClick={() => setOpenAddIncu(false)}
                disabled={loadding}
                className="flex-1 px-4 py-2.5 text-sm font-semibold transition bg-white border rounded-xl border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-50"
              >
                إلغاء
              </button>

              <button
                type="submit"
                disabled={loadding}
                className="flex-1 px-4 py-2.5 text-sm font-semibold text-white transition bg-blue-600 rounded-xl hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loadding ? "جاري الإضافة..." : "إضافة الوحدة"}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AddIcu;