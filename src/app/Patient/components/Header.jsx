import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { FaBedPulse } from "react-icons/fa6";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur-sm">
      
      {/* Background Circle */}
<div className="absolute -translate-x-1/2 rounded-full pointer-events-none -top-24 left-1/2 h-80 w-80 bg-blue-100/60 blur-xl" />
      <div className="relative z-10  flex h-[72px]  items-center justify-between px-4 md:px-36">

        <Link
          href="/Patient"
          aria-label="سرير - الصفحة الرئيسية"
          className="flex items-center gap-3 group"
        >
         
  <div className="flex items-center justify-center text-blue-600 transition-all duration-200 h-11 w-11 rounded-xl bg-blue-50 group-hover:bg-blue-100">
            <FaBedPulse size={23} aria-hidden="true" />
          </div>
          <div className="flex flex-col items-start leading-none">
            <span className="text-[20px] font-bold tracking-tight text-[#131B2E]">
             عناية وحضّانة
            </span>

            <span className="mt-1 text-[11px] font-medium text-slate-500">
             منظومة المتابعة السريرية الفورية
            </span>
          </div>
         
        </Link>
       
<div className="flex items-center gap-4">
    <span className="text-xs">متابعة الحاضنات</span>
    <span className="text-xs">تحديثات الفريق الطبي</span>
</div>
        {/* Brand */}
       
 <button
          type="button"
          aria-label="الملف الشخصي"
          className="flex items-center justify-center w-10 h-10 transition-all duration-200 bg-white border rounded-full group border-slate-200 text-slate-500 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          <FaUserCircle
            size={24}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:scale-105"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;