"use client";

import React, {
  useContext,
  useRef,
  useState,
} from "react";

import dynamic from "next/dynamic";

import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from "formik";

import * as Yup from "yup";

import { admin } from "../../../../providers/AdminContext.jsx";

import {
  FaXmark,
  FaHospital,
  FaUser,
  FaLocationDot,
  FaLock,
  FaMagnifyingGlass,
  FaSpinner,
  FaPhone,
  FaEnvelope,
  FaBed,
  FaCircleCheck,
  FaTriangleExclamation,
  FaMapLocationDot,
} from "react-icons/fa6";

import toast from "react-hot-toast";


// Leaflet must load only on the client
const FacilityMap = dynamic(
  () => import("./FacilityMap"),
  {
    ssr: false,
  }
);


const DEFAULT_CENTER = [25.5, 29.5];


const AddFacility = () => {

  const {
    handleAddFacilitySubmit,
    loading,
    openAddFacility,
    setOpenAddFacility,
  } = useContext(admin);


  const formikRef = useRef(null);


  const [position, setPosition] = useState(null);

  const [loadingLocation, setLoadingLocation] = useState(false);

  const [searchText, setSearchText] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  const [searching, setSearching] = useState(false);


  const initialValues = {
    name: "",
    phone: "",
    country: "",
    city: "",
    governorate: "",
    address: "",

    location: {
      type: "Point",
      coordinates: ["", ""],
    },

    services: [],

    adminName: "",
    adminEmail: "",
    adminPassword: "",
  };


  const validationSchema = Yup.object({

    name: Yup.string()
      .required("اسم المنشأة مطلوب"),

    phone: Yup.string()
      .required("رقم الهاتف مطلوب"),

    country: Yup.string()
      .required("الدولة مطلوبة"),

    city: Yup.string()
      .required("المدينة مطلوبة"),

    governorate: Yup.string()
      .required("المحافظة مطلوبة"),

    address: Yup.string()
      .required("العنوان مطلوب"),

    services: Yup.array()
      .of(
        Yup.string().oneOf(["NICU", "ICU"])
      )
      .min(1, "اختر خدمة واحدة على الأقل")
      .required("الخدمات مطلوبة"),

    adminName: Yup.string()
      .required("اسم المسؤول مطلوب"),

    adminEmail: Yup.string()
      .email("البريد الإلكتروني غير صحيح")
      .required("البريد الإلكتروني مطلوب"),

    adminPassword: Yup.string()
      .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل")
      .required("كلمة المرور مطلوبة"),

    location: Yup.object({
      type: Yup.string()
        .required(),

      coordinates: Yup.array()
        .of(Yup.number())
        .length(2, "حدد موقع المنشأة على الخريطة")
        .test(
          "valid-coordinates",
          "يجب تحديد موقع المنشأة على الخريطة",
          (value) => {
            return (
              Array.isArray(value) &&
              value.length === 2 &&
              value[0] !== "" &&
              value[1] !== "" &&
              !Number.isNaN(Number(value[0])) &&
              !Number.isNaN(Number(value[1]))
            );
          }
        ),
    }),
  });


  // ---------------------------------------
  // Reverse Geocoding
  // ---------------------------------------

  const reverseGeocode = async (lat, lng) => {

    try {

      setLoadingLocation(true);

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=jsonv2&addressdetails=1&accept-language=ar`
      );


      if (!response.ok) {
        throw new Error("فشل في تحديد العنوان");
      }


      const data = await response.json();

      const address = data?.address || {};


      const formik = formikRef.current;

      if (!formik) return;


      const country =
        address.country || "";

      const city =
        address.city ||
        address.town ||
        address.village ||
        address.municipality ||
        "";

      const governorate =
        address.state ||
        address.province ||
        address.region ||
        "";

      const displayAddress =
        data?.display_name || "";


      formik.setFieldValue(
        "country",
        country
      );

      formik.setFieldValue(
        "city",
        city
      );

      formik.setFieldValue(
        "governorate",
        governorate
      );

      formik.setFieldValue(
        "address",
        displayAddress
      );

    } catch (error) {

      toast.error(
        "تعذر الحصول على بيانات العنوان"
      );

    } finally {

      setLoadingLocation(false);

    }
  };


  // ---------------------------------------
  // Search Location
  // ---------------------------------------

  const handleSearchLocation = async () => {

    if (!searchText.trim()) {

      toast.error(
        "اكتب اسم المكان أولاً"
      );

      return;
    }


    try {

      setSearching(true);


      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          searchText
        )}&format=jsonv2&addressdetails=1&limit=6&accept-language=ar`
      );


      if (!response.ok) {
        throw new Error();
      }


      const data = await response.json();


      setSearchResults(data || []);


      if (!data?.length) {

        toast.error(
          "لم يتم العثور على المكان"
        );

      }

    } catch (error) {

      toast.error(
        "حدث خطأ أثناء البحث عن المكان"
      );

    } finally {

      setSearching(false);

    }
  };


  // ---------------------------------------
  // Select Search Result
  // ---------------------------------------

  const handleSearchResultSelect = async (
    result
  ) => {

    const lat = Number(result.lat);

    const lng = Number(result.lon);


    if (
      Number.isNaN(lat) ||
      Number.isNaN(lng)
    ) {
      return;
    }


    setSearchText(
      result.display_name || ""
    );

    setSearchResults([]);

    setPosition([lat, lng]);


    const formik = formikRef.current;

    if (formik) {

      formik.setFieldValue(
        "location.coordinates",
        [lng, lat]
      );

    }


    await reverseGeocode(
      lat,
      lng
    );
  };


  // ---------------------------------------
  // Get Current Location
  // ---------------------------------------

  const getCurrentLocation = () => {

    if (
      typeof navigator === "undefined" ||
      !navigator.geolocation
    ) {

      toast.error(
        "المتصفح لا يدعم تحديد الموقع"
      );

      return;
    }


    setLoadingLocation(true);


    navigator.geolocation.getCurrentPosition(

      async (location) => {

        const lat =
          location.coords.latitude;

        const lng =
          location.coords.longitude;


        setPosition([
          lat,
          lng,
        ]);


        const formik =
          formikRef.current;


        if (formik) {

          formik.setFieldValue(
            "location.coordinates",
            [lng, lat]
          );

        }


        await reverseGeocode(
          lat,
          lng
        );

      },

      () => {

        setLoadingLocation(false);

        toast.error(
          "تعذر الحصول على موقعك الحالي"
        );

      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };


  // ---------------------------------------
  // Map Location Select
  // ---------------------------------------

  const handleLocationSelect = async (
    lat,
    lng
  ) => {

    setPosition([
      lat,
      lng,
    ]);


    const formik =
      formikRef.current;


    if (formik) {

      formik.setFieldValue(
        "location.coordinates",
        [lng, lat]
      );

    }


    await reverseGeocode(
      lat,
      lng
    );
  };


  // ---------------------------------------
  // Submit
  // ---------------------------------------

  const handleSubmit = async (
    values
  ) => {

    if (loadingLocation) {

      toast.error(
        "انتظر حتى يتم تحديد الموقع"
      );

      return;
    }


    const coordinates =
      values?.location?.coordinates;


    if (
      !Array.isArray(coordinates) ||
      coordinates.length !== 2 ||
      coordinates.some(
        (coordinate) =>
          coordinate === "" ||
          Number.isNaN(
            Number(coordinate)
          )
      )
    ) {

      toast.error(
        "يرجى تحديد موقع المنشأة على الخريطة"
      );

      return;
    }


    const payload = {

      ...values,

      location: {

        type: "Point",

        coordinates: coordinates.map(
          Number
        ),

      },

    };


    await handleAddFacilitySubmit(
      payload
    );

  };


  if (!openAddFacility) {
    return null;
  }


  return (

    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">

      <div className="flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl">


        {/* ================= HEADER ================= */}

        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">

          <div className="flex items-center gap-3">

            <div className="flex items-center justify-center text-blue-500 h-11 w-11 rounded-xl bg-blue-600/10">

              <FaHospital size={21} />

            </div>


            <div>

              <h2 className="text-lg font-bold text-white">

                إضافة منشأة جديدة

              </h2>

              <p className="mt-1 text-sm text-slate-500">

                أضف بيانات المستشفى والمسؤول والموقع

              </p>

            </div>

          </div>


          <button
            type="button"
            onClick={() =>
              setOpenAddFacility(false)
            }
            className="flex items-center justify-center w-10 h-10 transition rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white"
          >

            <FaXmark size={20} />

          </button>

        </div>


        {/* ================= FORM ================= */}

        <Formik

          innerRef={formikRef}

          initialValues={initialValues}

          validationSchema={
            validationSchema
          }

          onSubmit={handleSubmit}

        >

          {({
            values,
            setFieldValue,
          }) => (

            <Form className="flex-1 overflow-y-auto custom-scrollbar">


              {/* ================= FACILITY INFO ================= */}

              <div className="p-6 border-b border-slate-800">

                <div className="flex items-center gap-3 mb-5">

                  <div className="flex items-center justify-center text-blue-500 rounded-lg h-9 w-9 bg-blue-500/10">

                    <FaHospital />

                  </div>

                  <div>

                    <h3 className="font-bold text-white">

                      بيانات المنشأة

                    </h3>

                    <p className="text-xs text-slate-500">

                      البيانات الأساسية للمستشفى

                    </p>

                  </div>

                </div>


                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">


                  {/* NAME */}

                  <div>

                    <label className="block mb-2 text-sm font-medium text-slate-300">

                      اسم المنشأة

                    </label>

                    <div className="relative">

                      <FaHospital className="absolute -translate-y-1/2 right-4 top-1/2 text-slate-500" />

                      <Field
                        name="name"
                        placeholder="مثال: مستشفى بني سويف العام"
                        className="input pr-11"
                      />

                    </div>

                    <ErrorMessage
                      name="name"
                      component="div"
                      className="error"
                    />

                  </div>


                  {/* PHONE */}

                  <div>

                    <label className="block mb-2 text-sm font-medium text-slate-300">

                      رقم الهاتف

                    </label>

                    <div className="relative">

                      <FaPhone className="absolute -translate-y-1/2 right-4 top-1/2 text-slate-500" />

                      <Field
                        name="phone"
                        placeholder="01xxxxxxxxx"
                        className="input pr-11"
                      />

                    </div>

                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="error"
                    />

                  </div>


                  {/* COUNTRY */}

                  <div>

                    <label className="block mb-2 text-sm font-medium text-slate-300">

                      الدولة

                    </label>

                    <Field
                      name="country"
                      placeholder="مصر"
                      className="input"
                    />

                    <ErrorMessage
                      name="country"
                      component="div"
                      className="error"
                    />

                  </div>


                  {/* CITY */}

                  <div>

                    <label className="block mb-2 text-sm font-medium text-slate-300">

                      المدينة

                    </label>

                    <Field
                      name="city"
                      placeholder="بني سويف"
                      className="input"
                    />

                    <ErrorMessage
                      name="city"
                      component="div"
                      className="error"
                    />

                  </div>


                  {/* GOVERNORATE */}

                  <div>

                    <label className="block mb-2 text-sm font-medium text-slate-300">

                      المحافظة

                    </label>

                    <Field
                      name="governorate"
                      placeholder="بني سويف"
                      className="input"
                    />

                    <ErrorMessage
                      name="governorate"
                      component="div"
                      className="error"
                    />

                  </div>


                  {/* ADDRESS */}

                  <div>

                    <label className="block mb-2 text-sm font-medium text-slate-300">

                      العنوان

                    </label>

                    <Field
                      name="address"
                      placeholder="العنوان بالتفصيل"
                      className="input"
                    />

                    <ErrorMessage
                      name="address"
                      component="div"
                      className="error"
                    />

                  </div>

                </div>

              </div>


              {/* ================= SERVICES ================= */}

              <div className="p-6 border-b border-slate-800">

                <div className="flex items-center gap-3 mb-5">

                  <div className="flex items-center justify-center text-blue-500 rounded-lg h-9 w-9 bg-blue-500/10">

                    <FaBed />

                  </div>

                  <div>

                    <h3 className="font-bold text-white">

                      الخدمات المتاحة

                    </h3>

                    <p className="text-xs text-slate-500">

                      اختر أنواع الرعاية الموجودة في المنشأة

                    </p>

                  </div>

                </div>


                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">


                  {/* NICU */}

                  <label
                    className={`cursor-pointer rounded-xl border p-4 transition ${
                      values.services.includes("NICU")
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-slate-800 bg-slate-900/40 hover:border-slate-700"
                    }`}
                  >

                    <input
                      type="checkbox"
                      className="hidden"
                      checked={
                        values.services.includes(
                          "NICU"
                        )
                      }
                      onChange={(e) => {

                        if (
                          e.target.checked
                        ) {

                          setFieldValue(
                            "services",
                            [
                              ...values.services,
                              "NICU",
                            ]
                          );

                        } else {

                          setFieldValue(
                            "services",
                            values.services.filter(
                              (service) =>
                                service !== "NICU"
                            )
                          );

                        }

                      }}
                    />


                    <div className="flex items-center gap-3">

                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-lg ${
                          values.services.includes("NICU")
                            ? "bg-blue-500 text-white"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >

                        <FaBed />

                      </div>


                      <div className="flex-1">

                        <h4 className="font-bold text-white">

                          حضّانة الأطفال

                        </h4>

                        <p className="mt-1 text-xs text-slate-500">

                          NICU

                        </p>

                      </div>


                      {values.services.includes(
                        "NICU"
                      ) && (

                        <FaCircleCheck className="text-blue-500" />

                      )}

                    </div>

                  </label>


                  {/* ICU */}

                  <label
                    className={`cursor-pointer rounded-xl border p-4 transition ${
                      values.services.includes("ICU")
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-slate-800 bg-slate-900/40 hover:border-slate-700"
                    }`}
                  >

                    <input
                      type="checkbox"
                      className="hidden"
                      checked={
                        values.services.includes(
                          "ICU"
                        )
                      }
                      onChange={(e) => {

                        if (
                          e.target.checked
                        ) {

                          setFieldValue(
                            "services",
                            [
                              ...values.services,
                              "ICU",
                            ]
                          );

                        } else {

                          setFieldValue(
                            "services",
                            values.services.filter(
                              (service) =>
                                service !== "ICU"
                            )
                          );

                        }

                      }}
                    />


                    <div className="flex items-center gap-3">

                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-lg ${
                          values.services.includes("ICU")
                            ? "bg-blue-500 text-white"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >

                        <FaBed />

                      </div>


                      <div className="flex-1">

                        <h4 className="font-bold text-white">

                          العناية المركزة

                        </h4>

                        <p className="mt-1 text-xs text-slate-500">

                          ICU

                        </p>

                      </div>


                      {values.services.includes(
                        "ICU"
                      ) && (

                        <FaCircleCheck className="text-blue-500" />

                      )}

                    </div>

                  </label>

                </div>


                <ErrorMessage
                  name="services"
                  component="div"
                  className="mt-2 error"
                />

              </div>


              {/* ================= LOCATION ================= */}

              <div className="p-6 border-b border-slate-800">

                <div className="flex items-center justify-between gap-3 mb-5">

                  <div className="flex items-center gap-3">

                    <div className="flex items-center justify-center text-blue-500 rounded-lg h-9 w-9 bg-blue-500/10">

                      <FaLocationDot />

                    </div>

                    <div>

                      <h3 className="font-bold text-white">

                        موقع المنشأة

                      </h3>

                      <p className="text-xs text-slate-500">

                        حدد موقع المنشأة على الخريطة

                      </p>

                    </div>

                  </div>


                  <button
                    type="button"
                    onClick={
                      getCurrentLocation
                    }
                    disabled={
                      loadingLocation
                    }
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition border rounded-lg border-slate-700 bg-slate-900 text-slate-300 hover:border-blue-500 hover:text-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
                  >

                    {loadingLocation ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      <FaMapLocationDot />
                    )}

                    تحديد موقعي

                  </button>

                </div>


                {/* SEARCH */}

                <div className="relative mb-4">

                  <div className="flex gap-2">

                    <div className="relative flex-1">

                      <FaMagnifyingGlass className="absolute -translate-y-1/2 right-4 top-1/2 text-slate-500" />

                      <input
                        type="text"
                        value={searchText}
                        onChange={(e) =>
                          setSearchText(
                            e.target.value
                          )
                        }
                        onKeyDown={(e) => {

                          if (
                            e.key === "Enter"
                          ) {

                            e.preventDefault();

                            handleSearchLocation();

                          }

                        }}
                        placeholder="ابحث عن مكان أو مستشفى..."
                        className="input pr-11"
                      />

                    </div>


                    <button
                      type="button"
                      onClick={
                        handleSearchLocation
                      }
                      disabled={searching}
                      className="flex min-w-[100px] items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
                    >

                      {searching ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        <FaMagnifyingGlass />
                      )}

                      بحث

                    </button>

                  </div>


                  {/* SEARCH RESULTS */}

                  {searchResults.length >
                    0 && (

                    <div className="absolute right-0 top-full z-[1000] mt-2 max-h-60 w-full overflow-y-auto rounded-xl border border-slate-700 bg-slate-900 shadow-2xl">

                      {searchResults.map(
                        (result, index) => (

                          <button
                            type="button"
                            key={`${result.place_id}-${index}`}
                            onClick={() =>
                              handleSearchResultSelect(
                                result
                              )
                            }
                            className="flex items-start w-full gap-3 p-3 text-right transition border-b border-slate-800 last:border-b-0 hover:bg-slate-800"
                          >

                            <FaLocationDot className="mt-1 text-blue-500 shrink-0" />

                            <span className="text-sm text-slate-300">

                              {
                                result.display_name
                              }

                            </span>

                          </button>

                        )
                      )}

                    </div>

                  )}

                </div>


                {/* MAP */}

                <div className="relative h-[380px] overflow-hidden rounded-xl border border-slate-800">

                  <FacilityMap
                    position={position}
                    defaultCenter={
                      DEFAULT_CENTER
                    }
                    onLocationSelect={
                      handleLocationSelect
                    }
                  />


                  {loadingLocation && (

                    <div className="absolute inset-0 z-[500] flex items-center justify-center bg-slate-950/50 backdrop-blur-sm">

                      <div className="flex items-center gap-3 px-5 py-4 text-sm text-white border shadow-xl rounded-xl border-slate-700 bg-slate-900">

                        <FaSpinner className="text-blue-500 animate-spin" />

                        جاري تحديد الموقع...

                      </div>

                    </div>

                  )}

                </div>


                <div className="flex items-start gap-2 p-3 mt-3 text-xs border rounded-lg border-amber-500/20 bg-amber-500/5 text-amber-400">

                  <FaTriangleExclamation className="mt-0.5 shrink-0" />

                  <span>

                    اضغط على الخريطة لتحديد موقع المنشأة بدقة، أو استخدم زر تحديد موقعي.

                  </span>

                </div>


                <ErrorMessage
                  name="location.coordinates"
                  component="div"
                  className="mt-2 error"
                />

              </div>


              {/* ================= ADMIN ================= */}

              <div className="p-6">

                <div className="flex items-center gap-3 mb-5">

                  <div className="flex items-center justify-center text-blue-500 rounded-lg h-9 w-9 bg-blue-500/10">

                    <FaUser />

                  </div>

                  <div>

                    <h3 className="font-bold text-white">

                      مسؤول المنشأة

                    </h3>

                    <p className="text-xs text-slate-500">

                      بيانات حساب مسؤول المستشفى

                    </p>

                  </div>

                </div>


                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">


                  {/* ADMIN NAME */}

                  <div>

                    <label className="block mb-2 text-sm font-medium text-slate-300">

                      اسم المسؤول

                    </label>

                    <div className="relative">

                      <FaUser className="absolute -translate-y-1/2 right-4 top-1/2 text-slate-500" />

                      <Field
                        name="adminName"
                        placeholder="اسم المسؤول"
                        className="input pr-11"
                      />

                    </div>

                    <ErrorMessage
                      name="adminName"
                      component="div"
                      className="error"
                    />

                  </div>


                  {/* ADMIN EMAIL */}

                  <div>

                    <label className="block mb-2 text-sm font-medium text-slate-300">

                      البريد الإلكتروني

                    </label>

                    <div className="relative">

                      <FaEnvelope className="absolute -translate-y-1/2 right-4 top-1/2 text-slate-500" />

                      <Field
                        type="email"
                        name="adminEmail"
                        placeholder="admin@example.com"
                        className="input pr-11"
                      />

                    </div>

                    <ErrorMessage
                      name="adminEmail"
                      component="div"
                      className="error"
                    />

                  </div>


                  {/* PASSWORD */}

                  <div className="md:col-span-2">

                    <label className="block mb-2 text-sm font-medium text-slate-300">

                      كلمة المرور

                    </label>

                    <div className="relative">

                      <FaLock className="absolute -translate-y-1/2 right-4 top-1/2 text-slate-500" />

                      <Field
                        type="password"
                        name="adminPassword"
                        placeholder="••••••••"
                        className="input pr-11"
                      />

                    </div>

                    <ErrorMessage
                      name="adminPassword"
                      component="div"
                      className="error"
                    />

                  </div>

                </div>

              </div>


              {/* ================= FOOTER ================= */}

              <div className="flex flex-col-reverse gap-3 px-6 py-5 border-t border-slate-800 bg-slate-950/80 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={() =>
                    setOpenAddFacility(false)
                  }
                  className="px-6 py-3 text-sm font-semibold transition border rounded-xl border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                >

                  إلغاء

                </button>


                <button
                  type="submit"
                  disabled={
                    loading ||
                    loadingLocation
                  }
                  className="flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white transition bg-blue-600 rounded-xl px-7 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >

                  {loading ? (

                    <>

                      <FaSpinner className="animate-spin" />

                      جاري الإضافة...

                    </>

                  ) : (

                    <>

                      <FaCircleCheck />

                      إضافة المنشأة

                    </>

                  )}

                </button>

              </div>


            </Form>

          )}

        </Formik>


      </div>


      <style jsx global>{`

        .input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgb(30 41 59);
          background: rgb(15 23 42);
          padding: 0.75rem 1rem;
          color: white;
          outline: none;
          transition: 0.2s;
        }

        .input::placeholder {
          color: rgb(100 116 139);
        }

        .input:focus {
          border-color: rgb(59 130 246);
          box-shadow: 0 0 0 1px rgb(59 130 246);
        }

        .error {
          margin-top: 0.375rem;
          font-size: 0.75rem;
          color: rgb(248 113 113);
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 7px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgb(15 23 42);
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgb(51 65 85);
          border-radius: 999px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgb(71 85 105);
        }

        .leaflet-control-zoom {
          border: none !important;
        }

        .leaflet-control-zoom a {
          background: rgb(15 23 42) !important;
          color: white !important;
          border-color: rgb(51 65 85) !important;
        }

        .leaflet-control-attribution {
          background: rgba(15, 23, 42, 0.8) !important;
          color: rgb(148 163 184) !important;
        }

        .leaflet-control-attribution a {
          color: rgb(96 165 250) !important;
        }

      `}</style>

    </div>

  );
};


export default AddFacility;