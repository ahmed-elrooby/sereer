"use client";

import Image from "next/image";
import Link from "next/link";

import logo from "../../../images/logo.png";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/Patient"
          aria-label="عناية وحضّانة - الصفحة الرئيسية"
          className="flex items-center gap-3 group"
        >
          <div className="flex items-center justify-center overflow-hidden transition-all duration-200  h-[120px] w-[120px] shrink-0 ">
            <Image
              src={logo}
              alt="عناية وحضّانة"
              width={64}
              height={64}
              priority
              className="object-contain w-full h-full"
            />
          </div>

          {/* <div className="flex flex-col leading-none">
            <span className="text-[19px] font-bold tracking-tight text-blue-900 sm:text-[20px]">
            سرير
            </span>

<span className="mt-1.5 text-lg font-semibold text-blue-900 sm:text-[11px] font-[Poppins]">
  sreer
</span>
          </div> */}
        </Link>

        {/* Desktop */}
        <nav className="items-center hidden gap-7 md:flex">
          <Link
            href="/Patient"
            className="text-sm font-medium transition-colors text-slate-600 hover:text-blue-600"
          >
            الرئيسية
          </Link>

          <span className="w-px h-5 bg-slate-200" />

          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            أقرب رعاية ليك
          </div>
        </nav>

        {/* Mobile */}
        <div className="flex items-center md:hidden">
          <div className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-2 text-[11px] font-semibold text-blue-600">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            أقرب رعاية ليك
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;