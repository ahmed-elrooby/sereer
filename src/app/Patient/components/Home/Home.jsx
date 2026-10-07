"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  FaBedPulse,
  FaHeartPulse,
} from "react-icons/fa6";
import PatientPage from "../PatientPage/PatientPage.jsx";


const Home = () => {
  const router = useRouter();

  const [selectedType, setSelectedType] = useState(null);
  const [showLocationModal, setShowLocationModal] = useState(false);

  const handleNavigate = (type) => {
    setSelectedType(type);
    setShowLocationModal(true);
  };

  const handleLocationSuccess = () => {
    setShowLocationModal(false);

    router.push(`/Patient/Results/${selectedType}`);
  };

  return (
    <>
      <main className="min-h-[70vh] px-4 py-6 bg-slate-50 md:min-h-screen md:px-6">
        <div className="flex flex-col justify-center max-w-5xl mx-auto">

          {/* Header */}
          <div className="w-full max-w-2xl mx-auto text-center">

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              بتدور على إيه؟
            </h1>

            <p className="max-w-lg mx-auto mt-4 text-sm leading-7 text-slate-500 md:text-base">
              اختار نوع الرعاية اللي محتاجها، وهنوفرلك أقرب مكان ليك
            </p>
          </div>

          {/* Cards */}
          <div className="grid gap-5 mt-8 md:grid-cols-2">

            {/* NICU */}
            <button
              type="button"
              onClick={() => handleNavigate("NICU")}
              className="flex items-center justify-center gap-4 px-4 py-4 text-white transition-all bg-blue-600 rounded-lg hover:bg-blue-500"
            >
              <div className="flex items-center justify-center text-white">
                <FaBedPulse size={30} />
              </div>

              <p className="text-lg font-bold">
                حضانة أطفال
              </p>
            </button>

            {/* ICU */}
            <button
              type="button"
              onClick={() => handleNavigate("ICU")}
              className="flex items-center justify-center gap-4 px-4 py-4 text-white transition-all bg-green-600 rounded-lg hover:bg-green-500"
            >
              <div className="flex items-center justify-center text-white">
                <FaHeartPulse size={30} />
              </div>

              <p className="text-lg font-bold">
                عناية مركزة
              </p>
            </button>
          </div>
        </div>
      </main>

      {/* Location Modal */}
      {showLocationModal && (
        <PatientPage
          onSuccess={handleLocationSuccess}
        />
      )}
    </>
  );
};

export default Home;