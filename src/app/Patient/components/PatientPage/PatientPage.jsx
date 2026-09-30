"use client";

import { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import LocationPermissionModal from "../LocationPermissionModal/LocationPermissionModal.jsx";

const PatientPage = () => {
  const [showLocationModal, setShowLocationModal] = useState(true);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");

  const handleAllowLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("المتصفح بتاعك مش بيدعم تحديد الموقع.");
      return;
    }

    setIsLoadingLocation(true);
    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // هنا بقى عندنا الإحداثيات
        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);

        // بعد نجاح الحصول على الإحداثيات فقط
        setIsLoadingLocation(false);
        setShowLocationModal(false);
      },
      (error) => {
        setIsLoadingLocation(false);

        if (error.code === error.PERMISSION_DENIED) {
          setLocationError(
            "لازم تسمح بالوصول لموقعك عشان نقدر نعرضلك الأماكن الأقرب ليك."
          );
        } else {
          setLocationError(
            "مش قادرين نحدد موقعك حاليًا. حاول مرة تانية."
          );
        }

        // مهم جدًا:
        // لا نقفل الـ Modal
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <>
      {/* محتوى الصفحة */}

      <LocationPermissionModal
        isOpen={showLocationModal}
        onAllow={handleAllowLocation}
        isLoading={isLoadingLocation}
        error={locationError}
      />
    </>
  );
};

export default PatientPage;