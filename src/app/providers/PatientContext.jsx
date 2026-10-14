
"use client";

import React, {
  createContext,
  useState,
  useEffect,
} from "react";

import api from "../lib/api.js";

export const Patient = createContext();

const PatientContext = ({ children }) => {
  const [location, setLocation] = useState({
    lat: null,
    lng: null,
  });

  // استرجاع الموقع المحفوظ بعد تحميل الصفحة
  useEffect(() => {
    try {
      const savedLocation = localStorage.getItem(
        "patientLocation"
      );

      if (!savedLocation) return;

      const { latitude, longitude } =
        JSON.parse(savedLocation);

      if (
        Number.isFinite(latitude) &&
        Number.isFinite(longitude)
      ) {
        setLocation({
          lat: latitude,
          lng: longitude,
        });
      }
    } catch (error) {
      localStorage.removeItem("patientLocation");
    }
  }, []);

  // حفظ الموقع في الـ State والـ localStorage
  const setPatientLocation = (lat, lng) => {
    const latitude = Number(lat);
    const longitude = Number(lng);

    if (
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude) ||
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      return;
    }

    const newLocation = {
      lat: latitude,
      lng: longitude,
    };

    setLocation(newLocation);

    localStorage.setItem(
      "patientLocation",
      JSON.stringify({
        latitude,
        longitude,
      })
    );
  };

  // جلب أقرب المستشفيات
  const getNearbyHospitals = async (
    type,
    lat,
    lng
  ) => {
    const { data } = await api.get(
      `/patient/nearby?type=${type}&lat=${lat}&lng=${lng}`
    );

    return data;
  };

  return (
    <Patient.Provider
      value={{
        location,
        setPatientLocation,
        getNearbyHospitals,
      }}
    >
      {children}
    </Patient.Provider>
  );
};

export default PatientContext;
