"use client";

import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaBed, FaXmark } from "react-icons/fa6";

import { Hospital } from "../../../../providers/HospitalContext.jsx";

const EditUnit = ({ selectedUnit }) => {
  const {
    handleEditUnitSubmit,
    openEditUnit,
    setOpenEditUnit,
    units,
  } = useContext(Hospital);


 



  const validationSchema = Yup.object({
    availableBeds: Yup.number()
      .required("عدد الأسرة مطلوب")
      .min(0, "عدد الأسرة لا يمكن أن يكون أقل من 0")
      .integer("عدد الأسرة يجب أن يكون رقمًا صحيحًا"),
  });

 

  const getUnitTypeName = (type) => {
    if (type === "NICU") return "حضّانات الأطفال";
    if (type === "ICU") return "العناية المركزة";

    return "وحدة";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden bg-white shadow-2xl rounded-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              تعديل الوحدة
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              قم بتحديث عدد الأسرة المتاحة فقط
            </p>
          </div>

          <button
            type="button"
            onClick={() => setOpenEditUnit(false)}
            className="grid transition rounded-lg w-9 h-9 place-items-center text-slate-500 bg-slate-50 hover:bg-slate-100 hover:text-slate-700"
          >
            <FaXmark size={16} />
          </button>
        </div>

        <Formik
          initialValues={{
            availableBeds: selectedUnit.availableBeds ?? 0,
          }}
          validationSchema={validationSchema}
          onSubmit={(values)=>{
            handleEditUnitSubmit({id:selectedUnit._id,values})
          }}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="p-5 space-y-5">
                {/* Unit Info */}
                <div className="flex items-center gap-3 p-4 border rounded-xl bg-slate-50 border-slate-200">
                  <div className="grid text-blue-600 bg-blue-100 w-11 h-11 rounded-xl shrink-0 place-items-center">
                    <FaBed size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {selectedUnit.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {getUnitTypeName(selectedUnit.type)}
                    </p>
                  </div>
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
                    className="w-full px-4 py-3 text-sm font-semibold transition bg-white border outline-none rounded-xl border-slate-300 text-slate-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
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
                  onClick={() => setOpenEditUnit(false)}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2.5 text-sm font-semibold transition bg-white border rounded-xl border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-50"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2.5 text-sm font-semibold text-white transition bg-blue-600 rounded-xl hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "جاري الحفظ..." : "حفظ التعديل"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditUnit;