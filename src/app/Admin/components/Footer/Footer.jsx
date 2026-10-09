import React from "react";
import Image from "next/image";

import maintech from "../../../../images/mainTech.jpeg";

const Footer = () => {
  return (
    <footer className="pt-5 mt-8 mb-4 border-t border-slate-200/80">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">

        {/* Copyright */}
        <div className="text-center sm:text-right">
          <p className="text-[11px] font-semibold tracking-wide text-slate-500">
            جميع الحقوق محفوظة © 2026 لشركة Main Tech
          </p>

          <p className="mt-1 text-[10px] text-slate-400">
            SEERER — منصة إدارة ومتابعة الرعاية الطبية
          </p>
        </div>

        {/* Main Tech */}
        <div className="flex items-center gap-3">

          <span className="text-[10px] font-medium text-slate-400">
            Developed by
          </span>

          <div className="flex items-center gap-2.5">

            {/* Logo */}
            <div className="flex items-center justify-center overflow-hidden bg-white border rounded-full shadow-sm h-9 w-9 border-slate-200">
              <Image
                src={maintech}
                alt="Main Tech"
                width={36}
                height={36}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="leading-none">
              <p className="text-xs font-bold tracking-wide text-slate-700">
                Main Tech
              </p>

              <p className="mt-1 text-[9px] text-slate-400">
                Technology Solutions
              </p>
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;