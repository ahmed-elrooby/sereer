
"use client";

import { FaWhatsapp } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

export default function WhatsAppSupport() {
  const [showMessage, setShowMessage] = useState(true);

const message =
  "مرحبًا، هل يمكنني إضافة حضّانة أو وحدة عناية مركزة إلى منصة سرير؟ أرجو معرفة خطوات الانضمام.";
  return (
    <div
      dir="rtl"
      className="fixed z-50 flex items-center gap-2 bottom-[150px] left-1 md:left-5"
    >
       {showMessage && (
        <div className="relative px-1 py-3 text-sm font-medium text-gray-700 bg-white shadow-md pr-7 rounded-xl">
 لإضافة عناية أو حضّانة لمنصة سرير 
<br/>
تواصل معنا          <button
            type="button"
            onClick={() => setShowMessage(false)}
            aria-label="إغلاق الرسالة"
            className="absolute flex items-center justify-center w-5 h-5 text-gray-400 transition bg-red-600 rounded-full top-1 right-1 "
          >
            <IoClose size={15} className="text-white" />
          </button>
        </div>
      )}

      <a
        href={`https://wa.me/201221854919?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="إضافة حضانة أو عناية عبر واتساب"
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition hover:scale-110 hover:bg-green-600"
      >
        <FaWhatsapp size={30} />
      </a>
    </div>
  );
}
