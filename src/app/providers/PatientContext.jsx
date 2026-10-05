"use client";

import React, {
  createContext,
  useState,
} from "react";

import api from "../lib/api.js";

export const Patient = createContext();

const PatientContext = ({ children }) => {
  const [location, setLocation] = useState({
    lat: null,
    lng: null,
  });

  const setPatientLocation = (lat, lng) => {
    console.log("SETTING LOCATION:", {
      lat,
      lng,
    });

    setLocation({
      lat,
      lng,
    });
  };

  const getNearbyHospitals = async (
    type,
    lat,
    lng
  ) => {
    console.log("GET NEARBY PARAMS:", {
      type,
      lat,
      lng,
    });

    const { data } = await api.get(
      `/patient/nearby?type=${type}&lat=${lat}&lng=${lng}`
    );

    console.log("API DATA:", data);

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