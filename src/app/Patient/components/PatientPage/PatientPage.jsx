"use client";

import { useContext, useState } from "react";

import LocationPermissionModal from "../LocationPermissionModal/LocationPermissionModal.jsx";
import { Patient } from "../../../providers/PatientContext.jsx";

const PatientPage = ({ onSuccess }) => {
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");

  const { setPatientLocation } = useContext(Patient);

  const handleAllowLocation = () => {
    if (!navigator.geolocation) {
      setLocationError(
        "المتصفح بتاعك مش بيدعم تحديد الموقع."
      );
      return;
    }

    setIsLoadingLocation(true);
    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // تخزين الموقع داخل PatientContext
        setPatientLocation(latitude, longitude);

        setIsLoadingLocation(false);

        // بلغ Home إن الموقع اتحدد بنجاح
        onSuccess?.();
      },

      (error) => {
        setIsLoadingLocation(false);

        if (error.code === error.PERMISSION_DENIED) {
          setLocationError(
            "لازم تسمح بالوصول لموقعك عشان نقدر نعرضلك الأماكن الأقرب ليك."
          );
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setLocationError(
            "مش قادرين نحدد موقعك حاليًا. حاول مرة تانية."
          );
        } else if (error.code === error.TIMEOUT) {
          setLocationError(
            "تحديد الموقع استغرق وقت طويل. حاول مرة تانية."
          );
        } else {
          setLocationError(
            "حصل خطأ أثناء تحديد موقعك. حاول مرة تانية."
          );
        }
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <LocationPermissionModal
      isOpen={true}
      onAllow={handleAllowLocation}
      isLoading={isLoadingLocation}
      error={locationError}
    />
  );
};

export default PatientPage;