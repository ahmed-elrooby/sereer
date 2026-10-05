"use client";

import Image from "next/image";

import mainTechLogo from "../../../../images/mainTech.jpeg";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100">
      <div className="flex flex-col items-center justify-between w-full gap-5 px-4 py-4 mx-auto md:py-6 max-w-7xl sm:px-6 md:flex-row lg:px-8">

        {/* Copyright */}
        <div className="text-center md:text-right">
          <p className="text-xs font-semibold text-slate-600 sm:text-sm">
            جميع الحقوق محفوظة © 2026 لشركة Main Tech
          </p>

          <p className="mt-1 text-[11px] text-slate-400 sm:text-xs">
            عناية وحضّانة — منظومة الرعاية الطبية الفورية
          </p>
        </div>

        {/* Main Tech */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-slate-400">
            تطوير وتشغيل
          </span>

          <div className="flex items-center justify-center w-12 h-12 overflow-hidden bg-white border rounded-full shadow-sm shrink-0 border-slate-100">
            <Image
              src={mainTechLogo}
              alt="Main Tech"
              width={48}
              height={48}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="flex-col hidden leading-none sm:flex">
            <span className="text-sm font-bold text-slate-800">
              Main Tech
            </span>

            <span className="mt-1 text-[10px] text-slate-400">
              Technology Solutions
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;