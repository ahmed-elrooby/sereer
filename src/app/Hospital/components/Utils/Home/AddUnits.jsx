"use client";

import React, { useContext, useMemo } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  FaXmark,
  FaBed,
  FaPlus,
} from "react-icons/fa6";

import { Hospital } from "../../../../providers/HospitalContext.jsx";
import { authContext } from "../../../../providers/Auth.jsx";

const AddUnits = () => {
  const {
    handleAddIncuUnitSubmit,
    openAddIncu,
    setOpenAddIncu,
    loadding,
  } = useContext(Hospital);

  const { profile } = useContext(authContext);

  const services = profile?.data?.facility?.services || [];

  /*
    لو المستشفى عندها:
    NICU فقط  -> NICU
    ICU فقط   -> ICU
    الاتنين   -> NICU + ICU
  */

  const availableTypes = useMemo(() => {
    return services.filter(
      (service) => service === "NICU" || service === "ICU"
    );
  }, [services]);

  // النوع الافتراضي
  const defaultType = availableTypes[0] || "";

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required("اسم الوحدة مطلوب"),

    type: Yup.string()
      .oneOf(availableTypes, "نوع الوحدة غير متاح لهذه المستشفى")
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden bg-white shadow-2xl rounded-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              إضافة وحدة
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              أضف وحدة جديدة وحدد عدد الأسرة المتاحة.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setOpenAddIncu(false)}
            className="grid transition rounded-lg w-9 h-9 place-items-center text-slate-500 hover:bg-slate-100 hover:text-slate-800"
          >
            <FaXmark />
          </button>
        </div>

        {/* Form */}
        <Formik
          enableReinitialize
          initialValues={{
            name:
              defaultType === "NICU"
                ? "حضّانة الأطفال"
                : defaultType === "ICU"
                ? "العناية المركزة"
                : "",

            type: defaultType,

            availableBeds: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            await handleAddIncuUnitSubmit(values);
            resetForm();
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className="p-5 space-y-5">
              {/* Name */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-slate-700">
                  اسم الوحدة
                </label>

                <Field
                  name="name"
                  type="text"
                  placeholder="مثال: حضّانة الأطفال"
                  className="w-full px-4 py-3 text-sm transition bg-white border outline-none rounded-xl border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <ErrorMessage
                  name="name"
                  component="p"
                  className="mt-1 text-xs text-red-500"
                />
              </div>

              {/* Type */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-slate-700">
                  نوع الوحدة
                </label>

                {availableTypes.length === 1 ? (
                  <>
                    <div className="flex items-center gap-3 px-4 py-3 border rounded-xl border-slate-200 bg-slate-50">
                      <div className="grid text-blue-600 bg-blue-100 rounded-lg w-9 h-9 place-items-center">
                        <FaBed />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {availableTypes[0] === "NICU"
                            ? "حضّانة أطفال"
                            : "عناية مركزة"}
                        </p>

                        <p className="text-xs text-slate-500">
                          النوع المتاح لهذه المستشفى
                        </p>
                      </div>
                    </div>

                    {/* Hidden field so Formik keeps type */}
                    <Field
                      type="hidden"
                      name="type"
                    />
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {availableTypes.includes("NICU") && (
                      <button
                        type="button"
                        onClick={() => {
                          setFieldValue("type", "NICU");

                          if (!values.name || values.name === "العناية المركزة") {
                            setFieldValue(
                              "name",
                              "حضّانة الأطفال"
                            );
                          }
                        }}
                        className={`p-4 text-right border rounded-xl transition ${
                          values.type === "NICU"
                            ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                            : "border-slate-200 hover:border-blue-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="grid w-10 h-10 text-blue-600 bg-blue-100 rounded-lg place-items-center">
                            <FaBed />
                          </div>

                          <div>
                            <p className="text-sm font-bold text-slate-800">
                              حضّانة أطفال
                            </p>

                            <p className="mt-0.5 text-xs text-slate-500">
                              NICU
                            </p>
                          </div>
                        </div>
                      </button>
                    )}

                    {availableTypes.includes("ICU") && (
                      <button
                        type="button"
                        onClick={() => {
                          setFieldValue("type", "ICU");

                          if (!values.name || values.name === "حضّانة الأطفال") {
                            setFieldValue(
                              "name",
                              "العناية المركزة"
                            );
                          }
                        }}
                        className={`p-4 text-right border rounded-xl transition ${
                          values.type === "ICU"
                            ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                            : "border-slate-200 hover:border-blue-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="grid w-10 h-10 text-blue-600 bg-blue-100 rounded-lg place-items-center">
                            <FaBed />
                          </div>

                          <div>
                            <p className="text-sm font-bold text-slate-800">
                              عناية مركزة
                            </p>

                            <p className="mt-0.5 text-xs text-slate-500">
                              ICU
                            </p>
                          </div>
                        </div>
                      </button>
                    )}
                  </div>
                )}

                <ErrorMessage
                  name="type"
                  component="p"
                  className="mt-1 text-xs text-red-500"
                />
              </div>

              {/* Available Beds */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-slate-700">
                  عدد الأسرة المتاحة
                </label>

                <Field
                  name="availableBeds"
                  type="number"
                  min="0"
                  placeholder="مثال: 5"
                  className="w-full px-4 py-3 text-sm transition bg-white border outline-none rounded-xl border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <ErrorMessage
                  name="availableBeds"
                  component="p"
                  className="mt-1 text-xs text-red-500"
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
                  disabled={loadding || availableTypes.length === 0}
                  className="flex items-center justify-center flex-1 gap-2 px-4 py-3 text-sm font-semibold text-white transition bg-blue-600 rounded-xl hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <FaPlus size={13} />

                  {loadding ? "جاري الإضافة..." : "إضافة الوحدة"}
                </button>
              </div>

              {/* No Service */}
              {availableTypes.length === 0 && (
                <p className="p-3 text-xs text-center text-red-500 rounded-xl bg-red-50">
                  لا توجد خدمة حضّانات أو عناية مركزة مفعلة لهذه المستشفى.
                </p>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddUnits;

