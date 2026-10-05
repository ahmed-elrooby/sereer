"use client";

import { useRouter } from "next/navigation";

import {
  FaBedPulse,
  FaHeartPulse,
  FaArrowLeft,
} from "react-icons/fa6";

const Home = () => {
  const router = useRouter();

  const handleNavigate = (type) => {
    router.push(`/Patient/Results/${type}`);
  };

  return (
    <main className="px-4 py-6 md:min-h-screen bg-slate-50 md:px-6">
      <div className="flex flex-col justify-center max-w-5xl mx-auto">

        {/* Header */}
        <div className="w-full max-w-2xl mx-auto text-center">

          {/* Location Status */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium border rounded-full border-emerald-100 bg-emerald-50 text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            تم تحديد موقعك بنجاح
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
           بتدور علي ايه؟
          </h1>

          <p className="max-w-lg mx-auto mt-4 text-sm leading-7 text-slate-500 md:text-base">
      اختار نوع الرعاية اللي محتاجها، وهنوفرلك اقرب مكان ليك
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-5 mt-4 md:grid-cols-2">

          {/* =========================
              NICU
          ========================== */}
          <button
            type="button"
            onClick={() => handleNavigate("NICU")}
            className="flex items-center justify-center gap-4 px-4 py-4 text-white transition-all bg-blue-600 rounded-lg hover:bg-blue-500"
          >
           

             <div className="flex items-center justify-center text-white transition-all duration-200 ">
                <FaBedPulse size={30} />
              </div>
              <p className="text-lg font-bold">حضانة اطفال </p>
            
           

            
          </button>

          {/* =========================
              ICU
          ========================== */}
         <button
            type="button"
            onClick={() => handleNavigate("ICU")}
            className="flex items-center justify-center gap-4 px-4 py-4 text-white transition-all bg-green-600 rounded-lg hover:bg-green-500"
          >
           

             <div className="flex items-center justify-center text-white transition-all duration-200 ">
                <FaHeartPulse size={30} />
              </div>
              <p className="text-lg font-bold"> عنايه مركزة </p>
            
           

            
          </button>
        </div>

      </div>
    </main>
  );
};

export default Home;