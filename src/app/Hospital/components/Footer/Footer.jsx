import React from "react";
import Image from "next/image";

import mainTech from "../../../../images/mainTech.jpeg";

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="flex flex-col items-center justify-between gap-4 px-4 py-5 sm:flex-row">

        {/* Copyright */}
        <div className="text-center sm:text-right">
          <p className="text-xs font-semibold text-slate-600">
            جميع الحقوق محفوظة © 2026 لشركة Main Tech
          </p>

          <p className="mt-1 text-[11px] text-slate-400">
            سرير — أقرب رعاية ليك
          </p>
        </div>

        {/* Main Tech */}
        <div className="flex items-center gap-3">
          <span className="hidden text-[11px] text-slate-400 sm:block">
            Powered by
          </span>

          <div className="flex items-center gap-2.5">
            {/* Logo */}
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm">
              <Image
                src={mainTech}
                alt="Main Tech"
                width={36}
                height={36}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Name */}
            <div className="leading-none">
              <p className="text-xs font-bold text-slate-700">
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