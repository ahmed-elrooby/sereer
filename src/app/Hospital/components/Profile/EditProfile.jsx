"use client";

import React, { useContext, useState } from "react";

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
  FaMapLocationDot,
} from "react-icons/fa6";

import { authContext } from "../../../providers/Auth.jsx";

const EditProfile = () => {
  const {
    profile,
    setOpenUpdateProfile,
    handleUpdateProfileSubmit,
    loading,
  } = useContext(authContext);

  const [locationError, setLocationError] = useState("");
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const user = profile?.data?.user;
  const facility = profile?.data?.facility;

  const isHospitalAdmin = user?.role === "hospital_admin";

  const initialValues = {
    name: user?.name || "",
    email: user?.email || "",
    facilityName: facility?.name || "",
    facilityPhone: facility?.phone || "",
    latitude: facility?.location?.coordinates?.[1] ?? "",
    longitude: facility?.location?.coordinates?.[0] ?? "",
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

          latitude: Yup.number()
            .typeError("حدد خط العرض")
            .required("الموقع الجغرافي مطلوب")
            .min(-90, "خط العرض غير صحيح")
            .max(90, "خط العرض غير صحيح"),

          longitude: Yup.number()
            .typeError("حدد خط الطول")
            .required("الموقع الجغرافي مطلوب")
            .min(-180, "خط الطول غير صحيح")
            .max(180, "خط الطول غير صحيح"),
        }
      : {}),
  });

  const handleGetCurrentLocation = (setFieldValue) => {
    setLocationError("");

    if (!navigator.geolocation) {
      setLocationError(
        "المتصفح لا يدعم تحديد الموقع الجغرافي"
      );
      return;
    }

    setIsGettingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFieldValue(
          "latitude",
          position.coords.latitude
        );

        setFieldValue(
          "longitude",
          position.coords.longitude
        );

        setIsGettingLocation(false);
      },
      (error) => {
        let message = "تعذر تحديد الموقع الجغرافي";

        if (error.code === error.PERMISSION_DENIED) {
          message =
            "يرجى السماح للمتصفح بالوصول إلى الموقع الجغرافي";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          message = "الموقع الجغرافي غير متاح حاليًا";
        } else if (error.code === error.TIMEOUT) {
          message = "انتهت مهلة تحديد الموقع، حاول مرة أخرى";
        }

        setLocationError(message);
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="flex flex-col w-full max-w-lg overflow-hidden bg-white shadow-2xl rounded-2xl max-h-[90vh]">

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

        {/* Form */}
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleUpdateProfileSubmit}
        >
          {({ isSubmitting, setFieldValue, values }) => (
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
                    <FaHospital
                      className="text-blue-600"
                      size={15}
                    />
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

                    {/* Geographic Location */}
                    <div>
                      <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-slate-700">
                        <FaLocationDot size={13} />
                        الموقع الجغرافي للمنشأة
                      </label>

                      <p className="mb-3 text-xs leading-5 text-slate-500">
                        حدد موقع المنشأة من مكان وجودك، أو أدخل
                        إحداثيات المستشفى يدويًا.
                      </p>

                      {/* Get Current Location */}
                      <button
                        type="button"
                        disabled={isGettingLocation}
                        onClick={() =>
                          handleGetCurrentLocation(setFieldValue)
                        }
                        className="flex items-center justify-center w-full gap-2 px-4 py-3 text-sm font-semibold text-blue-700 transition border border-blue-200 bg-blue-50 rounded-xl hover:bg-blue-100 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        <FaMapLocationDot size={15} />

                        {isGettingLocation
                          ? "جارٍ تحديد الموقع..."
                          : "تحديد الموقع الحالي"}
                      </button>

                      {/* Location Error */}
                      {locationError && (
                        <p className="mt-2 text-xs text-red-500">
                          {locationError}
                        </p>
                      )}

                      {/* Latitude & Longitude */}
                      <div className="grid grid-cols-1 gap-3 mt-4 sm:grid-cols-2">

                        <div>
                          <label className="block mb-2 text-xs font-semibold text-slate-600">
                            خط العرض (Latitude)
                          </label>

                          <Field
                            type="number"
                            step="any"
                            name="latitude"
                            placeholder="29.0741"
                            readOnly
                            className="w-full px-3 py-3 text-sm border outline-none rounded-xl border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          />

                          <ErrorMessage
                            name="latitude"
                            component="p"
                            className="mt-1.5 text-xs text-red-500"
                          />
                        </div>

                        <div>
                          <label className="block mb-2 text-xs font-semibold text-slate-600">
                            خط الطول (Longitude)
                          </label>

                          <Field
                            type="number"
                            step="any"
                            readOnly
                            name="longitude"
                            placeholder="31.1150"
                            className="w-full px-3 py-3 text-sm border outline-none rounded-xl border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          />

                          <ErrorMessage
                            name="longitude"
                            component="p"
                            className="mt-1.5 text-xs text-red-500"
                          />
                        </div>

                      </div>

                      {/* Google Maps Link */}
                      {values.latitude !== "" &&
                        values.longitude !== "" &&
                        Number.isFinite(Number(values.latitude)) &&
                        Number.isFinite(Number(values.longitude)) &&
                        Number(values.latitude) >= -90 &&
                        Number(values.latitude) <= 90 &&
                        Number(values.longitude) >= -180 &&
                        Number(values.longitude) <= 180 && (
                          <a
                            href={`https://www.google.com/maps?q=${values.latitude},${values.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mt-3 text-xs font-semibold text-blue-600 hover:text-blue-800"
                          >
                            <FaMapLocationDot size={13} />
                            عرض الموقع على خرائط Google
                          </a>
                        )}
                    </div>

                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">

                <button
                  type="button"
                  onClick={() => setOpenUpdateProfile(false)}
                  className="px-5 py-2.5 text-sm font-semibold transition border rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  disabled={loading || isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white transition bg-blue-600 rounded-xl hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <FaFloppyDisk size={14} />

                  {loading || isSubmitting
                    ? "جارٍ الحفظ..."
                    : "حفظ التعديلات"}
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
