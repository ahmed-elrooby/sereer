"use client";

import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from "formik";

import * as Yup from "yup";

import {
  FaXmark,
  FaHospital,
  FaUserShield,
  FaLocationDot,
  FaPhone,
  FaGlobe,
  FaCity,
  FaMapLocationDot,
  FaFloppyDisk,
  FaCheck,
} from "react-icons/fa6";

import { admin } from "../../../../providers/AdminContext.jsx";

import "leaflet/dist/leaflet.css";

const UpdateFacility = ({ selectFacility }) => {
  const {
    handleUpdateFacilitySubmit,
    openEditFacility,
    setOpenEditFacility,
    loading,
  } = useContext(admin);

  const [leaflet, setLeaflet] = useState(null);
  const [mapComponents, setMapComponents] = useState(null);

  const [position, setPosition] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | Load Leaflet only on client
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!openEditFacility) return;

    let mounted = true;

    const loadLeaflet = async () => {
      const leafletModule = await import("leaflet");
      const reactLeafletModule = await import("react-leaflet");

      if (!mounted) return;

      setLeaflet(leafletModule.default || leafletModule);

      setMapComponents({
        MapContainer: reactLeafletModule.MapContainer,
        TileLayer: reactLeafletModule.TileLayer,
        Marker: reactLeafletModule.Marker,
        Popup: reactLeafletModule.Popup,
        useMapEvents: reactLeafletModule.useMapEvents,
      });
    };

    loadLeaflet();

    return () => {
      mounted = false;
    };
  }, [openEditFacility]);

  /*
  |--------------------------------------------------------------------------
  | Current facility coordinates
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!openEditFacility || !selectFacility?.location?.coordinates) {
      return;
    }

    const coordinates = selectFacility.location.coordinates;

    if (
      coordinates.length === 2 &&
      coordinates[0] !== undefined &&
      coordinates[1] !== undefined
    ) {
      const lng = Number(coordinates[0]);
      const lat = Number(coordinates[1]);

      if (!Number.isNaN(lng) && !Number.isNaN(lat)) {
        setPosition([lat, lng]);
      }
    }
  }, [openEditFacility, selectFacility]);

  /*
  |--------------------------------------------------------------------------
  | Close modal
  |--------------------------------------------------------------------------
  */

  const handleClose = () => {
    if (loading) return;

    setOpenEditFacility(false);

    setPosition(null);
    setSearchText("");
    setSearchResults([]);
  };

  /*
  |--------------------------------------------------------------------------
  | Search location
  |--------------------------------------------------------------------------
  */

  const searchLocation = async () => {
    if (!searchText.trim()) return;

    try {
      setSearchLoading(true);

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&accept-language=ar&q=${encodeURIComponent(
          searchText
        )}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      const data = await response.json();

      setSearchResults(data || []);
    } catch (error) {
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Reverse geocoding
  |--------------------------------------------------------------------------
  */

  const getAddressFromCoordinates = async (
    lat,
    lng,
    setFieldValue
  ) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&addressdetails=1&accept-language=ar&lat=${lat}&lon=${lng}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      const data = await response.json();

      const address = data?.address || {};

      const country =
        address?.country || "";

      const city =
        address?.city ||
        address?.town ||
        address?.village ||
        address?.municipality ||
        "";

      const governorate =
        address?.state ||
        address?.province ||
        address?.region ||
        "";

      const road =
        address?.road ||
        address?.street ||
        "";

      const neighbourhood =
        address?.neighbourhood ||
        address?.suburb ||
        address?.district ||
        "";

      const fullAddress =
        data?.display_name ||
        [road, neighbourhood, city, governorate]
          .filter(Boolean)
          .join("، ");

      setFieldValue("country", country);
      setFieldValue("city", city);
      setFieldValue("governorate", governorate);

      if (fullAddress) {
        setFieldValue("address", fullAddress);
      }
    } catch (error) {
      // Ignore reverse geocoding errors
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Initial values
  |--------------------------------------------------------------------------
  */

  if (!openEditFacility || !selectFacility) {
    return null;
  }

  const coordinates =
    selectFacility?.location?.coordinates || [];

  const initialLongitude =
    coordinates?.[0] !== undefined
      ? Number(coordinates[0])
      : "";

  const initialLatitude =
    coordinates?.[1] !== undefined
      ? Number(coordinates[1])
      : "";

  const initialValues = {
    name: selectFacility?.name || "",
    phone: selectFacility?.phone || "",
    country: selectFacility?.country || "",
    address: selectFacility?.address || "",
    city: selectFacility?.city || "",
    governorate: selectFacility?.governorate || "",

    location: {
      type: "Point",
      coordinates: [
        initialLongitude,
        initialLatitude,
      ],
    },

    services: selectFacility?.services || [],

    adminName:
      selectFacility?.admin?.name ||
      selectFacility?.adminName ||
      "",

    adminEmail:
      selectFacility?.admin?.email ||
      selectFacility?.adminEmail ||
      "",

    adminPassword: "",
  };

  /*
  |--------------------------------------------------------------------------
  | Validation
  |--------------------------------------------------------------------------
  */

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .min(2, "اسم المنشأة قصير جدًا")
      .required("اسم المنشأة مطلوب"),

    phone: Yup.string()
      .trim()
      .required("رقم الهاتف مطلوب"),

    country: Yup.string()
      .trim()
      .required("الدولة مطلوبة"),

    address: Yup.string()
      .trim()
      .required("العنوان مطلوب"),

    city: Yup.string()
      .trim()
      .required("المدينة مطلوبة"),

governorate: Yup.string().trim(),

    services: Yup.array()
      .min(1, "اختر خدمة واحدة على الأقل")
      .required("الخدمات مطلوبة"),

    adminName: Yup.string()
      .trim()
      .min(2, "اسم المسؤول قصير جدًا")
      .required("اسم المسؤول مطلوب"),

    adminEmail: Yup.string()
      .trim()
      .email("البريد الإلكتروني غير صحيح")
      .required("البريد الإلكتروني مطلوب"),

    adminPassword: Yup.string()
      .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل")
      .nullable(),

    location: Yup.object({
      type: Yup.string()
        .required(),

      coordinates: Yup.array()
        .of(Yup.number())
        .length(2, "يجب تحديد موقع المنشأة")
        .test(
          "valid-coordinates",
          "يجب تحديد موقع المنشأة على الخريطة",
          (value) => {
            if (!value || value.length !== 2) {
              return false;
            }

            return value.every(
              (coordinate) =>
                coordinate !== null &&
                coordinate !== undefined &&
                coordinate !== "" &&
                !Number.isNaN(Number(coordinate))
            );
          }
        ),
    }),
  });

  /*
  |--------------------------------------------------------------------------
  | Map Marker Component
  |--------------------------------------------------------------------------
  */

  const LocationMarker = ({
    setFieldValue,
  }) => {
    if (!mapComponents?.useMapEvents) {
      return null;
    }

    const { useMapEvents } = mapComponents;

    useMapEvents({
      click(event) {
        const lat = event.latlng.lat;
        const lng = event.latlng.lng;

        setPosition([lat, lng]);

        setFieldValue(
          "location.coordinates",
          [lng, lat]
        );

        getAddressFromCoordinates(
          lat,
          lng,
          setFieldValue
        );
      },
    });

    return null;
  };

  /*
  |--------------------------------------------------------------------------
  | Select Search Result
  |--------------------------------------------------------------------------
  */

  const handleSelectSearchResult = (
    result,
    setFieldValue
  ) => {
    const lat = Number(result.lat);
    const lng = Number(result.lon);

    if (
      Number.isNaN(lat) ||
      Number.isNaN(lng)
    ) {
      return;
    }

    setPosition([lat, lng]);

    setFieldValue(
      "location.coordinates",
      [lng, lat]
    );

    const address =
      result?.address || {};

    setFieldValue(
      "country",
      address?.country || ""
    );

    setFieldValue(
      "city",
      address?.city ||
        address?.town ||
        address?.village ||
        ""
    );

    setFieldValue(
      "governorate",
      address?.state ||
        address?.province ||
        ""
    );

    setFieldValue(
      "address",
      result?.display_name || ""
    );

    setSearchText(
      result?.display_name || ""
    );

    setSearchResults([]);
  };

  /*
  |--------------------------------------------------------------------------
  | Submit
  |--------------------------------------------------------------------------
  */

  const handleSubmit = async (
    values,
    { setSubmitting }
  ) => {
    try {
      const coordinates =
        values?.location?.coordinates;

      if (
        !coordinates ||
        coordinates.length !== 2 ||
        coordinates.some(
          (coordinate) =>
            coordinate === "" ||
            coordinate === null ||
            coordinate === undefined ||
            Number.isNaN(Number(coordinate))
        )
      ) {
        return;
      }

      const payload = {
        name: values.name.trim(),

        phone: values.phone.trim(),

        country: values.country.trim(),

        address: values.address.trim(),

        city: values.city.trim(),

        governorate:
          values.governorate?.trim() || "",

        location: {
          type: "Point",

          coordinates: [
            Number(coordinates[0]),
            Number(coordinates[1]),
          ],
        },

        services: values.services,

        adminName:
          values.adminName.trim(),

        adminEmail:
          values.adminEmail.trim(),

        ...(values.adminPassword?.trim()
          ? {
              adminPassword:
                values.adminPassword.trim(),
            }
          : {}),
      };

 await handleUpdateFacilitySubmit({
  id: selectFacility._id,
  values: payload,
});
    } finally {
      setSubmitting(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Toggle Service
  |--------------------------------------------------------------------------
  */

  const toggleService = (
    setFieldValue,
    services,
    service
  ) => {
    if (services.includes(service)) {
      setFieldValue(
        "services",
        services.filter(
          (item) => item !== service
        )
      );
    } else {
      setFieldValue(
        "services",
        [...services, service]
      );
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm"
      onMouseDown={handleClose}
    >
      <div
        dir="rtl"
        onMouseDown={(e) =>
          e.stopPropagation()
        }
        className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-slate-800 bg-[#0D1118] shadow-2xl shadow-black/50"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b shrink-0 border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#38BDF8]/10 text-[#38BDF8]">
              <FaHospital className="text-sm" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-slate-100">
                تعديل المنشأة
              </h2>

              <p className="mt-0.5 text-[11px] text-slate-500">
                تعديل بيانات المنشأة والمسؤول
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="flex items-center justify-center w-8 h-8 transition-all rounded-lg text-slate-500 hover:bg-slate-800 hover:text-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FaXmark className="text-sm" />
          </button>
        </div>

        {/* Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={
            validationSchema
          }
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({
            values,
            setFieldValue,
          }) => (
            <Form className="flex flex-col flex-1 min-h-0">
              <div className="flex-1 px-5 py-5 overflow-y-auto">
                {/* Facility Data */}
                <div className="mb-7">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center justify-center rounded-lg h-7 w-7 bg-slate-800 text-slate-400">
                      <FaHospital className="text-[11px]" />
                    </div>

                    <div>
                      <h3 className="text-xs font-semibold text-slate-200">
                        بيانات المنشأة
                      </h3>

                      <p className="text-[10px] text-slate-500">
                        المعلومات الأساسية للمنشأة الطبية
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Name */}
                    <div>
                      <label className="mb-1.5 block text-[11px] font-medium text-slate-400">
                        اسم المنشأة
                      </label>

                      <Field
                        name="name"
                        className="h-10 w-full rounded-xl border border-slate-800 bg-[#080B12] px-3 text-xs text-slate-200 outline-none transition-all placeholder:text-slate-600 focus:border-[#38BDF8]/50 focus:ring-2 focus:ring-[#38BDF8]/10"
                      />

                      <ErrorMessage
                        name="name"
                        component="p"
                        className="mt-1 text-[10px] text-red-400"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="mb-1.5 block text-[11px] font-medium text-slate-400">
                        رقم الهاتف
                      </label>

                      <div className="relative">
                        <FaPhone className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-600" />

                        <Field
                          name="phone"
                          className="h-10 w-full rounded-xl border border-slate-800 bg-[#080B12] pr-8 pl-3 text-xs text-slate-200 outline-none transition-all placeholder:text-slate-600 focus:border-[#38BDF8]/50 focus:ring-2 focus:ring-[#38BDF8]/10"
                        />
                      </div>

                      <ErrorMessage
                        name="phone"
                        component="p"
                        className="mt-1 text-[10px] text-red-400"
                      />
                    </div>

                    {/* Country */}
                    <div>
                      <label className="mb-1.5 block text-[11px] font-medium text-slate-400">
                        الدولة
                      </label>

                      <div className="relative">
                        <FaGlobe className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-600" />

                        <Field
                          name="country"
                          className="h-10 w-full rounded-xl border border-slate-800 bg-[#080B12] pr-8 pl-3 text-xs text-slate-200 outline-none transition-all placeholder:text-slate-600 focus:border-[#38BDF8]/50 focus:ring-2 focus:ring-[#38BDF8]/10"
                        />
                      </div>

                      <ErrorMessage
                        name="country"
                        component="p"
                        className="mt-1 text-[10px] text-red-400"
                      />
                    </div>

                    {/* City */}
                    <div>
                      <label className="mb-1.5 block text-[11px] font-medium text-slate-400">
                        المدينة
                      </label>

                      <div className="relative">
                        <FaCity className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-600" />

                        <Field
                          name="city"
                          className="h-10 w-full rounded-xl border border-slate-800 bg-[#080B12] pr-8 pl-3 text-xs text-slate-200 outline-none transition-all placeholder:text-slate-600 focus:border-[#38BDF8]/50 focus:ring-2 focus:ring-[#38BDF8]/10"
                        />
                      </div>

                      <ErrorMessage
                        name="city"
                        component="p"
                        className="mt-1 text-[10px] text-red-400"
                      />
                    </div>

                    {/* Governorate */}
                    <div>
                      <label className="mb-1.5 block text-[11px] font-medium text-slate-400">
                        المحافظة / المنطقة
                      </label>

                      <Field
                        name="governorate"
                        className="h-10 w-full rounded-xl border border-slate-800 bg-[#080B12] px-3 text-xs text-slate-200 outline-none transition-all placeholder:text-slate-600 focus:border-[#38BDF8]/50 focus:ring-2 focus:ring-[#38BDF8]/10"
                      />
                    </div>

                    {/* Address */}
                    <div className="md:col-span-2">
                      <label className="mb-1.5 block text-[11px] font-medium text-slate-400">
                        العنوان
                      </label>

                      <Field
                        name="address"
                        className="h-10 w-full rounded-xl border border-slate-800 bg-[#080B12] px-3 text-xs text-slate-200 outline-none transition-all placeholder:text-slate-600 focus:border-[#38BDF8]/50 focus:ring-2 focus:ring-[#38BDF8]/10"
                      />

                      <ErrorMessage
                        name="address"
                        component="p"
                        className="mt-1 text-[10px] text-red-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="mb-7">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center rounded-lg h-7 w-7 bg-slate-800 text-slate-400">
                        <FaMapLocationDot className="text-[11px]" />
                      </div>

                      <div>
                        <h3 className="text-xs font-semibold text-slate-200">
                          موقع المنشأة
                        </h3>

                        <p className="text-[10px] text-slate-500">
                          اضغط على الخريطة لتغيير موقع المنشأة
                        </p>
                      </div>
                    </div>

                    {position && (
                      <div className="flex items-center gap-1.5 rounded-lg border border-emerald-500/10 bg-emerald-500/[0.06] px-2.5 py-1.5 text-[10px] text-emerald-400">
                        <FaCheck className="text-[9px]" />
                        تم تحديد الموقع
                      </div>
                    )}
                  </div>

                  {/* Search */}
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={searchText}
                      onChange={(e) =>
                        setSearchText(
                          e.target.value
                        )
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          searchLocation();
                        }
                      }}
                      placeholder="ابحث عن مكان أو عنوان..."
                      className="h-10 flex-1 rounded-xl border border-slate-800 bg-[#080B12] px-3 text-xs text-slate-200 outline-none transition-all placeholder:text-slate-600 focus:border-[#38BDF8]/50 focus:ring-2 focus:ring-[#38BDF8]/10"
                    />

                    <button
                      type="button"
                      onClick={searchLocation}
                      disabled={searchLoading}
                      className="px-4 text-xs font-medium transition-all rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {searchLoading
                        ? "جاري البحث..."
                        : "بحث"}
                    </button>
                  </div>

                  {/* Search Results */}
                  {searchResults.length > 0 && (
                    <div className="mb-3 max-h-48 overflow-y-auto rounded-xl border border-slate-800 bg-[#080B12]">
                      {searchResults.map(
                        (result, index) => (
                          <button
                            key={`${result.place_id}-${index}`}
                            type="button"
                            onClick={() =>
                              handleSelectSearchResult(
                                result,
                                setFieldValue
                              )
                            }
                            className="flex items-start w-full gap-3 px-3 py-3 text-right transition-all border-b border-slate-800 last:border-b-0 hover:bg-slate-800/60"
                          >
                            <FaLocationDot className="mt-0.5 shrink-0 text-[11px] text-[#38BDF8]" />

                            <span className="text-[11px] leading-5 text-slate-300">
                              {result.display_name}
                            </span>
                          </button>
                        )
                      )}
                    </div>
                  )}

                  {/* Map */}
                  <div className="relative h-[320px] overflow-hidden rounded-2xl border border-slate-800 bg-[#080B12]">
                    {leaflet &&
                    mapComponents &&
                    position ? (
                      <mapComponents.MapContainer
                        center={position}
                        zoom={15}
                        scrollWheelZoom={true}
                        className="w-full h-full"
                      >
                        <mapComponents.TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <LocationMarker
                          setFieldValue={
                            setFieldValue
                          }
                        />

                        <mapComponents.Marker
                          position={position}
                          draggable={true}
                          eventHandlers={{
                            dragend: async (
                              event
                            ) => {
                              const marker =
                                event.target;

                              const latLng =
                                marker.getLatLng();

                              const lat =
                                latLng.lat;

                              const lng =
                                latLng.lng;

                              setPosition([
                                lat,
                                lng,
                              ]);

                              setFieldValue(
                                "location.coordinates",
                                [lng, lat]
                              );

                              await getAddressFromCoordinates(
                                lat,
                                lng,
                                setFieldValue
                              );
                            },
                          }}
                        >
                          <mapComponents.Popup>
                            موقع المنشأة
                          </mapComponents.Popup>
                        </mapComponents.Marker>
                      </mapComponents.MapContainer>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full gap-2 text-center">
                        <FaLocationDot className="text-2xl text-slate-700" />

                        <p className="text-xs text-slate-500">
                          جاري تحميل الخريطة...
                        </p>
                      </div>
                    )}
                  </div>

                  <p className="mt-2 text-[10px] text-slate-600">
                    يمكنك الضغط على أي مكان في الخريطة أو سحب العلامة
                    لتحديد الموقع الجديد.
                  </p>

                  <ErrorMessage
                    name="location.coordinates"
                    component="p"
                    className="mt-1 text-[10px] text-red-400"
                  />
                </div>

                {/* Services */}
                <div className="mb-7">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center justify-center rounded-lg h-7 w-7 bg-slate-800 text-slate-400">
                      <FaHospital className="text-[11px]" />
                    </div>

                    <div>
                      <h3 className="text-xs font-semibold text-slate-200">
                        الخدمات
                      </h3>

                      <p className="text-[10px] text-slate-500">
                        الخدمات الطبية المتاحة
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {[
                      {
                        value: "NICU",
                        label: "حضّانات الأطفال",
                        description:
                          "Neonatal ICU",
                      },
                      {
                        value: "ICU",
                        label: "العناية المركزة",
                        description:
                          "Intensive Care Unit",
                      },
                    ].map((service) => {
                      const selected =
                        values.services.includes(
                          service.value
                        );

                      return (
                        <button
                          key={service.value}
                          type="button"
                          onClick={() =>
                            toggleService(
                              setFieldValue,
                              values.services,
                              service.value
                            )
                          }
                          className={`rounded-xl border p-3 text-right transition-all ${
                            selected
                              ? "border-[#38BDF8]/40 bg-[#38BDF8]/10"
                              : "border-slate-800 bg-[#080B12] hover:border-slate-700"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span
                              className={`text-xs font-medium ${
                                selected
                                  ? "text-[#38BDF8]"
                                  : "text-slate-300"
                              }`}
                            >
                              {service.label}
                            </span>

                            <span
                              className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                                selected
                                  ? "border-[#38BDF8] bg-[#38BDF8]"
                                  : "border-slate-700"
                              }`}
                            >
                              {selected && (
                                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                              )}
                            </span>
                          </div>

                          <p className="mt-1 text-[10px] text-slate-600">
                            {service.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  <ErrorMessage
                    name="services"
                    component="p"
                    className="mt-1.5 text-[10px] text-red-400"
                  />
                </div>

                {/* Admin */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center justify-center rounded-lg h-7 w-7 bg-slate-800 text-slate-400">
                      <FaUserShield className="text-[11px]" />
                    </div>

                    <div>
                      <h3 className="text-xs font-semibold text-slate-200">
                        مسؤول المنشأة
                      </h3>

                      <p className="text-[10px] text-slate-500">
                        بيانات حساب المسؤول
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Admin Name */}
                    <div>
                      <label className="mb-1.5 block text-[11px] font-medium text-slate-400">
                        اسم المسؤول
                      </label>

                      <Field
                        name="adminName"
                        className="h-10 w-full rounded-xl border border-slate-800 bg-[#080B12] px-3 text-xs text-slate-200 outline-none transition-all focus:border-[#38BDF8]/50 focus:ring-2 focus:ring-[#38BDF8]/10"
                      />

                      <ErrorMessage
                        name="adminName"
                        component="p"
                        className="mt-1 text-[10px] text-red-400"
                      />
                    </div>

                    {/* Admin Email */}
                    <div>
                      <label className="mb-1.5 block text-[11px] font-medium text-slate-400">
                        البريد الإلكتروني
                      </label>

                      <Field
                        name="adminEmail"
                        type="email"
                        className="h-10 w-full rounded-xl border border-slate-800 bg-[#080B12] px-3 text-xs text-slate-200 outline-none transition-all focus:border-[#38BDF8]/50 focus:ring-2 focus:ring-[#38BDF8]/10"
                      />

                      <ErrorMessage
                        name="adminEmail"
                        component="p"
                        className="mt-1 text-[10px] text-red-400"
                      />
                    </div>

                    {/* Password */}
                    <div className="md:col-span-2">
                      <label className="mb-1.5 block text-[11px] font-medium text-slate-400">
                        كلمة المرور الجديدة
                      </label>

                      <Field
                        name="adminPassword"
                        type="password"
                        placeholder="اتركها فارغة إذا كنت لا تريد تغييرها"
                        className="h-10 w-full rounded-xl border border-slate-800 bg-[#080B12] px-3 text-xs text-slate-200 outline-none transition-all placeholder:text-slate-600 focus:border-[#38BDF8]/50 focus:ring-2 focus:ring-[#38BDF8]/10"
                      />

                      <p className="mt-1.5 text-[10px] text-slate-600">
                        اترك الحقل فارغًا للحفاظ على كلمة المرور الحالية.
                      </p>

                      <ErrorMessage
                        name="adminPassword"
                        component="p"
                        className="mt-1 text-[10px] text-red-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex shrink-0 items-center gap-3 border-t border-slate-800 bg-[#0A0E15] px-5 py-4">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={loading}
                  className="flex-1 rounded-xl border border-slate-700 bg-slate-800/40 px-4 py-2.5 text-xs font-medium text-slate-300 transition-all hover:border-slate-600 hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#38BDF8] px-4 py-2.5 text-xs font-semibold text-[#071018] shadow-lg shadow-[#38BDF8]/10 transition-all hover:bg-[#5CC8FA] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#071018]/30 border-t-[#071018]" />
                      جاري الحفظ...
                    </>
                  ) : (
                    <>
                      <FaFloppyDisk className="text-[11px]" />
                      حفظ التعديلات
                    </>
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateFacility;

