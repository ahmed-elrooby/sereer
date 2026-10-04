
"use client";

import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

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

import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import toast from "react-hot-toast";

/* =========================================================
   Leaflet Marker
========================================================= */

const markerIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",

  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",

  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",

  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

/* =========================================================
   Default Map Position
   Center of Arab World
========================================================= */

const DEFAULT_CENTER = [25.5, 29.5];

/* =========================================================
   Location Picker
========================================================= */

const LocationPicker = ({ onLocationSelect }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;

      onLocationSelect(lat, lng);
    },
  });

  return null;
};

/* =========================================================
   Map Controller
========================================================= */

const MapController = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (!position) return;

    map.flyTo(position, 16, {
      animate: true,
      duration: 1,
    });
  }, [position, map]);

  return null;
};

/* =========================================================
   Add Facility
========================================================= */

const AddFacility = () => {
  const { handleAddFacilitySubmit, loading, openAddFacility, setOpenAddFacility } =
    useContext(admin);

  const formikRef = useRef(null);

  const [position, setPosition] = useState(null);

  const [loadingLocation, setLoadingLocation] =
    useState(false);

  const [searchText, setSearchText] =
    useState("");

  const [searchResults, setSearchResults] =
    useState([]);

  const [searching, setSearching] =
    useState(false);

  /* =========================================================
     Initial Values
  ========================================================= */

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

  /* =========================================================
     Validation
  ========================================================= */

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .min(
        2,
        "اسم المنشأة يجب أن يكون حرفين على الأقل"
      )
      .max(
        100,
        "اسم المنشأة طويل جدًا"
      )
      .required(
        "اسم المنشأة مطلوب"
      ),

    phone: Yup.string()
      .trim()
      .required(
        "رقم الهاتف مطلوب"
      ),

    country: Yup.string()
      .trim()
      .required(
        "يجب تحديد الدولة"
      ),

    city: Yup.string()
      .trim()
      .required(
        "تعذر تحديد المدينة"
      ),

    governorate: Yup.string()
      .trim(),

    address: Yup.string()
      .trim()
      .required(
        "يجب تحديد موقع المنشأة"
      ),

    location: Yup.object({
      type: Yup.string()
        .oneOf(["Point"])
        .required(),

      coordinates: Yup.array()
        .of(
          Yup.number()
            .typeError(
              "يجب تحديد موقع المنشأة"
            )
            .required(
              "يجب تحديد موقع المنشأة"
            )
        )
        .length(
          2,
          "يجب تحديد موقع المنشأة"
        )
        .required(
          "يجب تحديد موقع المنشأة"
        ),
    }),

    services: Yup.array()
      .of(
        Yup.string().oneOf([
          "NICU",
          "ICU",
        ])
      )
      .min(
        1,
        "اختر خدمة واحدة على الأقل"
      )
      .required(
        "الخدمات مطلوبة"
      ),

    adminName: Yup.string()
      .trim()
      .min(
        2,
        "اسم المسؤول يجب أن يكون حرفين على الأقل"
      )
      .max(
        100,
        "اسم المسؤول طويل جدًا"
      )
      .required(
        "اسم المسؤول مطلوب"
      ),

    adminEmail: Yup.string()
      .trim()
      .email(
        "البريد الإلكتروني غير صحيح"
      )
      .required(
        "البريد الإلكتروني مطلوب"
      ),

    adminPassword: Yup.string()
      .min(
        6,
        "كلمة المرور يجب أن تكون 6 أحرف على الأقل"
      )
      .max(
        100,
        "كلمة المرور طويلة جدًا"
      )
      .required(
        "كلمة المرور مطلوبة"
      ),
  });

  /* =========================================================
     Reverse Geocoding
========================================================= */

  const getAddressFromCoordinates = async (
    lat,
    lng
  ) => {
    try {
      setLoadingLocation(true);

      const url =
        `https://nominatim.openstreetmap.org/reverse` +
        `?lat=${lat}` +
        `&lon=${lng}` +
        `&format=jsonv2` +
        `&addressdetails=1` +
        `&accept-language=ar`;

      const response = await fetch(url, {
        headers: {
          Accept:
            "application/json",
        },
      });

      if (!response.ok) {
        throw new Error();
      }

      const data =
        await response.json();

      const address =
        data.address || {};

      const street = [
        address.road,
        address.house_number,
      ]
        .filter(Boolean)
        .join(" ");

      const area =
        address.suburb ||
        address.neighbourhood ||
        address.quarter ||
        address.city_district ||
        address.district ||
        "";

      const city =
        address.city ||
        address.town ||
        address.village ||
        address.municipality ||
        "";

      const country =
        address.country || "";

      const governorate =
        address.state ||
        address.governorate ||
        "";

      const cleanAddress = [
        street,
        area,
      ]
        .filter(Boolean)
        .join("، ");

      const finalAddress =
        cleanAddress ||
        data.display_name ||
        "";

      formikRef.current?.setFieldValue(
        "address",
        finalAddress
      );

      formikRef.current?.setFieldValue(
        "country",
        country
      );

      formikRef.current?.setFieldValue(
        "city",
        city
      );

      formikRef.current?.setFieldValue(
        "governorate",
        governorate
      );

      if (
        !finalAddress ||
        !country ||
        !city
      ) {
        toast.error(
          "تم تحديد الموقع لكن بيانات العنوان غير مكتملة"
        );
      }
    } catch {
      formikRef.current?.setFieldValue(
        "address",
        ""
      );

      formikRef.current?.setFieldValue(
        "country",
        ""
      );

      formikRef.current?.setFieldValue(
        "city",
        ""
      );

      formikRef.current?.setFieldValue(
        "governorate",
        ""
      );

      toast.error(
        "تعذر الحصول على بيانات الموقع"
      );
    } finally {
      setLoadingLocation(false);
    }
  };

  /* =========================================================
     Select Location
========================================================= */

  const handleLocationSelect = async (
    lat,
    lng
  ) => {
    setPosition([
      lat,
      lng,
    ]);

    formikRef.current?.setFieldValue(
      "location.coordinates",
      [lng, lat]
    );

    await getAddressFromCoordinates(
      lat,
      lng
    );
  };

  /* =========================================================
     Search Location
========================================================= */

  const searchLocation = async () => {
    const query =
      searchText.trim();

    if (!query) {
      toast.error(
        "اكتب اسم المستشفى أو المدينة أو العنوان"
      );

      return;
    }

    try {
      setSearching(true);

      setSearchResults([]);

      const url =
        `https://nominatim.openstreetmap.org/search` +
        `?q=${encodeURIComponent(query)}` +
        `&format=jsonv2` +
        `&addressdetails=1` +
        `&limit=6` +
        `&accept-language=ar`;

      const response =
        await fetch(url, {
          headers: {
            Accept:
              "application/json",
          },
        });

      if (!response.ok) {
        throw new Error();
      }

      const data =
        await response.json();

      if (!data.length) {
        toast.error(
          "لم يتم العثور على نتائج"
        );

        return;
      }

      setSearchResults(data);
    } catch {
      toast.error(
        "تعذر البحث عن الموقع"
      );
    } finally {
      setSearching(false);
    }
  };

  /* =========================================================
     Select Search Result
========================================================= */

  const handleSearchResultSelect =
    async (result) => {
      const lat =
        Number(result.lat);

      const lng =
        Number(result.lon);

      setSearchText(
        result.display_name || ""
      );

      setSearchResults([]);

      setPosition([
        lat,
        lng,
      ]);

      formikRef.current?.setFieldValue(
        "location.coordinates",
        [lng, lat]
      );

      await getAddressFromCoordinates(
        lat,
        lng
      );
    };

  /* =========================================================
     Current Location
     Optional only
========================================================= */

  const getCurrentLocation = () => {
    if (
      loadingLocation ||
      loading
    ) {
      return;
    }

    if (
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
        const latitude =
          location.coords.latitude;

        const longitude =
          location.coords.longitude;

        setPosition([
          latitude,
          longitude,
        ]);

        formikRef.current?.setFieldValue(
          "location.coordinates",
          [
            longitude,
            latitude,
          ]
        );

        await getAddressFromCoordinates(
          latitude,
          longitude
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

  /* =========================================================
     Submit
========================================================= */

  const handleSubmit = async (
    values
  ) => {
    if (loadingLocation) {
      toast.error(
        "انتظر حتى يتم تحديد الموقع"
      );

      return;
    }

    const payload = {
      ...values,

      location: {
        type: "Point",

        coordinates: [
          Number(
            values.location
              .coordinates[0]
          ),

          Number(
            values.location
              .coordinates[1]
          ),
        ],
      },
    };

    handleAddFacilitySubmit(payload);

  };

  /* =========================================================
     Render
========================================================= */

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">

      <div className="custom-scrollbar relative flex max-h-[95vh] w-full max-w-5xl flex-col overflow-y-auto rounded-2xl border border-slate-800 bg-[#080c14] shadow-2xl">

        {/* =================================================
            Header
        ================================================= */}

        <div className="sticky top-0 z-[1100] flex items-center justify-between border-b border-slate-800 bg-[#080c14] px-6 py-5">

          <div className="flex items-center gap-3">

            <div className="flex items-center justify-center text-blue-400 h-11 w-11 rounded-xl bg-blue-500/10">
              <FaHospital />
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-100">
                إضافة منشأة صحية
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                أضف منشأة من أي دولة عربية
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setOpenAddFacility(false)}
            className="flex items-center justify-center transition rounded-lg h-9 w-9 text-slate-500 hover:bg-slate-800 hover:text-white"
          >
            <FaXmark />
          </button>

        </div>

        {/* =================================================
            Formik
        ================================================= */}

        <Formik
          innerRef={formikRef}
          initialValues={initialValues}
          validationSchema={
            validationSchema
          }
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form className="p-6 space-y-5">

              {/* =================================================
                  Facility Information
              ================================================= */}

              <div className="rounded-2xl border border-slate-800 bg-[#0a0f18] p-5">

                <div className="flex items-center gap-3 mb-5">

                  <div className="flex items-center justify-center text-blue-400 rounded-lg h-9 w-9 bg-blue-500/10">
                    <FaHospital />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-slate-200">
                      بيانات المنشأة
                    </h3>

                    <p className="text-[11px] text-slate-500">
                      البيانات الأساسية للمنشأة
                    </p>
                  </div>

                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                  {/* Name */}

                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-xs font-medium text-slate-300"
                    >
                      اسم المنشأة
                    </label>

                    <Field
                      id="name"
                      name="name"
                      type="text"
                      placeholder="مثال: مستشفى الملك فيصل التخصصي"
                      className="input"
                    />

                    <ErrorMessage
                      name="name"
                      component="div"
                      className="error"
                    />
                  </div>

                  {/* Phone */}

                  <div>
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-xs font-medium text-slate-300"
                    >
                      رقم الهاتف
                    </label>

                    <div className="relative">

                      <FaPhone className="absolute z-10 text-xs -translate-y-1/2 left-3 top-1/2 text-slate-600" />

                      <Field
                        id="phone"
                        name="phone"
                        type="text"
                        placeholder="رقم هاتف المنشأة"
                        className="pr-10 input"
                      />

                    </div>

                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="error"
                    />
                  </div>

                </div>
              </div>

              {/* =================================================
                  Services
              ================================================= */}

              <div className="rounded-2xl border border-slate-800 bg-[#0a0f18] p-5">

                <div className="flex items-center gap-3 mb-5">

                  <div className="flex items-center justify-center rounded-lg h-9 w-9 bg-emerald-500/10 text-emerald-400">
                    <FaBed />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-slate-200">
                      الخدمات المتاحة
                    </h3>

                    <p className="text-[11px] text-slate-500">
                      اختر الخدمات التي توفرها المنشأة
                    </p>
                  </div>

                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">

                  {/* NICU */}

                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-800 bg-[#070b12] p-4 transition hover:border-blue-500/40 hover:bg-[#0b111c]">

                    <Field
                      type="checkbox"
                      name="services"
                      value="NICU"
                      className="w-4 h-4 accent-blue-600"
                    />

                    <div>
                      <p className="text-sm font-medium text-slate-200">
                        حضانات NICU
                      </p>

                      <p className="mt-1 text-[11px] text-slate-500">
                        وحدة رعاية الأطفال حديثي الولادة
                      </p>
                    </div>

                  </label>

                  {/* ICU */}

                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-800 bg-[#070b12] p-4 transition hover:border-blue-500/40 hover:bg-[#0b111c]">

                    <Field
                      type="checkbox"
                      name="services"
                      value="ICU"
                      className="w-4 h-4 accent-blue-600"
                    />

                    <div>
                      <p className="text-sm font-medium text-slate-200">
                        عناية مركزة ICU
                      </p>

                      <p className="mt-1 text-[11px] text-slate-500">
                        وحدة العناية المركزة
                      </p>
                    </div>

                  </label>

                </div>

                <ErrorMessage
                  name="services"
                  component="div"
                  className="error"
                />

              </div>

              {/* =================================================
                  Location
              ================================================= */}

              <div className="rounded-2xl border border-slate-800 bg-[#0a0f18] p-5">

                <div className="flex items-start justify-between gap-4 mb-5">

                  <div className="flex items-center gap-3">

                    <div className="flex items-center justify-center text-red-400 rounded-lg h-9 w-9 bg-red-500/10">
                      <FaLocationDot />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-slate-200">
                        موقع المنشأة
                      </h3>

                      <p className="mt-1 text-[11px] text-slate-500">
                        ابحث عن المنشأة أو حدد موقعها مباشرة على الخريطة
                      </p>
                    </div>

                  </div>

                  <button
                    type="button"
                    onClick={
                      getCurrentLocation
                    }
                    disabled={
                      loadingLocation ||
                      loading
                    }
                    className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-700 bg-[#070b12] px-3 py-2 text-[11px] text-slate-300 transition hover:border-blue-500/50 hover:text-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <FaMapLocationDot />
                    موقعي الحالي
                  </button>

                </div>

                {/* =================================================
                    Search
                ================================================= */}

                <div className="relative mb-4">

                  <div className="flex gap-2">

                    <div className="relative flex-1">

                      <FaMagnifyingGlass className="absolute z-10 text-xs -translate-y-1/2 left-3 top-1/2 text-slate-600" />

                      <input
                        type="text"
                        value={
                          searchText
                        }
                        onChange={(e) =>
                          setSearchText(
                            e.target.value
                          )
                        }
                        onKeyDown={(e) => {
                          if (
                            e.key ===
                            "Enter"
                          ) {
                            e.preventDefault();
                            searchLocation();
                          }
                        }}
                        placeholder="ابحث باسم المستشفى أو المدينة أو العنوان..."
                        className="pr-10 input"
                      />

                    </div>

                    <button
                      type="button"
                      onClick={
                        searchLocation
                      }
                      disabled={
                        searching
                      }
                      className="flex items-center gap-2 px-5 text-xs font-semibold text-white transition bg-blue-600 h-11 shrink-0 rounded-xl hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >

                      {searching ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        <FaMagnifyingGlass />
                      )}

                      بحث

                    </button>

                  </div>

                  {/* =================================================
                      Search Results
                  ================================================= */}

                  {searchResults.length >
                    0 && (
                    <div className="absolute left-0 right-0 top-14 z-[2000] overflow-hidden rounded-xl border border-slate-700 bg-[#080c14] shadow-2xl">

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
                            className="flex w-full items-start gap-3 border-b border-slate-800 p-4 text-right transition last:border-b-0 hover:bg-[#0d1420]"
                          >

                            <FaLocationDot className="mt-1 text-sm text-blue-400 shrink-0" />

                            <span className="text-xs leading-5 text-slate-300">
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

                {/* =================================================
                    Map
                ================================================= */}

                <div className="relative h-[380px] overflow-hidden rounded-xl border border-slate-800">

                  <MapContainer
                    center={
                      position ||
                      DEFAULT_CENTER
                    }
                    zoom={
                      position
                        ? 16
                        : 4
                    }
                    scrollWheelZoom
                    className="w-full h-full"
                  >

                    <TileLayer
                      attribution='&copy; OpenStreetMap contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <LocationPicker
                      onLocationSelect={
                        handleLocationSelect
                      }
                    />

                    <MapController
                      position={
                        position
                      }
                    />

                    {position && (
                      <Marker
                        position={
                          position
                        }
                        icon={
                          markerIcon
                        }
                      />
                    )}

                  </MapContainer>

                  {/* Loading */}

                  {loadingLocation && (
                    <div className="absolute inset-0 z-[1000] flex items-center justify-center bg-slate-950/50 backdrop-blur-[2px]">

                      <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-[#080c14] px-5 py-3 shadow-xl">

                        <FaSpinner className="text-blue-400 animate-spin" />

                        <span className="text-xs text-slate-300">
                          جاري تحديد بيانات الموقع...
                        </span>

                      </div>

                    </div>
                  )}

                </div>

                {/* =================================================
                    Location Status
                ================================================= */}

                <div className="mt-3">

                  {values.location
                    .coordinates[0] !==
                    "" &&
                  values.location
                    .coordinates[1] !==
                    "" &&
                  values.country &&
                  values.city ? (

                    <div className="flex items-start gap-3 px-4 py-3 border rounded-xl border-emerald-500/20 bg-emerald-500/5">

                      <FaCircleCheck className="mt-0.5 shrink-0 text-emerald-400" />

                      <div>
                        <p className="text-xs font-medium text-emerald-300">
                          تم تحديد موقع المنشأة
                        </p>

                        <p className="mt-1 text-[10px] leading-5 text-slate-500">
                          {values.address}
                        </p>

                        <p className="text-[10px] text-slate-600">
                          {[
                            values.city,
                            values.governorate,
                            values.country,
                          ]
                            .filter(Boolean)
                            .join("، ")}
                        </p>
                      </div>

                    </div>

                  ) : (

                    <div className="flex items-center gap-2 px-4 py-3 border rounded-xl border-amber-500/20 bg-amber-500/5">

                      <FaTriangleExclamation className="text-amber-400" />

                      <p className="text-xs text-amber-300">
                        ابحث عن المنشأة أو اضغط على موقعها في الخريطة
                      </p>

                    </div>

                  )}

                </div>

                <ErrorMessage
                  name="location.coordinates"
                  component="div"
                  className="error"
                />

                <ErrorMessage
                  name="country"
                  component="div"
                  className="error"
                />

                <ErrorMessage
                  name="city"
                  component="div"
                  className="error"
                />

                <ErrorMessage
                  name="address"
                  component="div"
                  className="error"
                />

              </div>

              {/* =================================================
                  Admin
              ================================================= */}

              <div className="rounded-2xl border border-slate-800 bg-[#0a0f18] p-5">

                <div className="flex items-center gap-3 mb-5">

                  <div className="flex items-center justify-center rounded-lg h-9 w-9 bg-violet-500/10 text-violet-400">
                    <FaUser />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-slate-200">
                      بيانات المسؤول
                    </h3>

                    <p className="text-[11px] text-slate-500">
                      حساب مسؤول المنشأة
                    </p>
                  </div>

                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                  {/* Admin Name */}

                  <div>
                    <label
                      htmlFor="adminName"
                      className="block mb-2 text-xs font-medium text-slate-300"
                    >
                      اسم المسؤول
                    </label>

                    <Field
                      id="adminName"
                      name="adminName"
                      type="text"
                      placeholder="اسم مسؤول المنشأة"
                      className="input"
                    />

                    <ErrorMessage
                      name="adminName"
                      component="div"
                      className="error"
                    />
                  </div>

                  {/* Email */}

                  <div>
                    <label
                      htmlFor="adminEmail"
                      className="block mb-2 text-xs font-medium text-slate-300"
                    >
                      البريد الإلكتروني
                    </label>

                    <div className="relative">

                      <FaEnvelope className="absolute z-10 text-xs -translate-y-1/2 left-3 top-1/2 text-slate-600" />

                      <Field
                        id="adminEmail"
                        name="adminEmail"
                        type="email"
                        placeholder="admin@hospital.com"
                        className="pr-10 input"
                      />

                    </div>

                    <ErrorMessage
                      name="adminEmail"
                      component="div"
                      className="error"
                    />
                  </div>

                  {/* Password */}

                  <div className="md:col-span-2">

                    <label
                      htmlFor="adminPassword"
                      className="block mb-2 text-xs font-medium text-slate-300"
                    >
                      كلمة المرور
                    </label>

                    <div className="relative">

                      <FaLock className="absolute z-10 text-xs -translate-y-1/2 left-3 top-1/2 text-slate-600" />

                      <Field
                        id="adminPassword"
                        name="adminPassword"
                        type="password"
                        placeholder="أدخل كلمة مرور المسؤول"
                        className="pr-10 input"
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

              {/* =================================================
                  Footer
              ================================================= */}

              <div className="flex flex-col-reverse gap-3 pt-5 border-t border-slate-800 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={
                    () =>
                      setOpenAddFacility(
                        false
                      )
                  }
                  className="h-11 rounded-xl border border-slate-700 bg-[#070b12] px-6 text-xs font-medium text-slate-300 transition hover:border-slate-600 hover:bg-[#0b111c] hover:text-white"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  disabled={
                    loading ||
                    loadingLocation
                  }
                  className="flex items-center justify-center gap-2 text-xs font-semibold text-white transition bg-blue-600 h-11 rounded-xl px-7 hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                >

                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      جاري الحفظ...
                    </>
                  ) : (
                    <>
                      <FaHospital />
                      إضافة المنشأة
                    </>
                  )}

                </button>

              </div>

            </Form>
          )}
        </Formik>
      </div>

      {/* =========================================================
          Styles
      ========================================================= */}

      <style jsx global>{`
        /* =========================
           Inputs
        ========================= */

        .input {
          width: 100%;
          height: 44px;

          border: 1px solid #1e293b;
          border-radius: 12px;

          background-color: #070b12 !important;
          color: #e2e8f0 !important;

          padding: 0 14px;

          font-size: 12px;

          outline: none;

          transition: all 0.2s ease;

          appearance: none;
          -webkit-appearance: none;

          color-scheme: dark;
        }

        .input::placeholder {
          color: #475569;
        }

        .input:hover {
          border-color: #334155;
          background-color: #0a0f18 !important;
        }

        .input:focus {
          border-color: #2563eb;

          background-color: #080d16 !important;

          box-shadow:
            0 0 0 3px
            rgb(37 99 235 / 0.08);
        }

        /* Chrome Autofill */

        .input:-webkit-autofill,
        .input:-webkit-autofill:hover,
        .input:-webkit-autofill:focus,
        .input:-webkit-autofill:active {
          -webkit-text-fill-color:
            #e2e8f0 !important;

          -webkit-box-shadow:
            0 0 0 1000px
            #070b12 inset !important;

          box-shadow:
            0 0 0 1000px
            #070b12 inset !important;

          background-color:
            #070b12 !important;

          transition:
            background-color
            9999s
            ease-in-out
            0s;
        }

        /* Firefox Autofill */

        .input:-moz-autofill {
          background-color:
            #070b12 !important;

          color:
            #e2e8f0 !important;
        }

        /* =========================
           Error
        ========================= */

        .error {
          margin-top: 6px;

          font-size: 10px;

          color: #f87171;
        }

        /* =========================
           Scrollbar
        ========================= */

        .custom-scrollbar {
          scrollbar-width: thin;

          scrollbar-color:
            #263246
            #080c14;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 7px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #080c14;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #263246;

          border-radius: 999px;

          border: 2px solid
            #080c14;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #334155;
        }

        /* =========================
           Leaflet
        ========================= */

        .leaflet-control-zoom a {
          background:
            #080c14 !important;

          color:
            #cbd5e1 !important;

          border-color:
            #1e293b !important;
        }

        .leaflet-control-zoom a:hover {
          background:
            #111827 !important;

          color:
            white !important;
        }

        .leaflet-control-attribution {
          background:
            rgb(8 12 20 / 0.85) !important;

          color:
            #64748b !important;
        }

        .leaflet-control-attribution a {
          color:
            #60a5fa !important;
        }
      `}</style>
    </div>
  );
};

export default AddFacility;
