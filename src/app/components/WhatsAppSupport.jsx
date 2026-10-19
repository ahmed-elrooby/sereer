
"use client";

import { FaWhatsapp } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

export default function WhatsAppSupport() {
  const [showMessage, setShowMessage] = useState(true);

  const message =
    "مرحبًا، أرغب في إضافة حضّانة أو وحدة عناية مركزة إلى منصة سرير. أرجو معرفة خطوات الانضمام.";

  return (
    <div
      dir="rtl"
      className="fixed z-50 flex items-center gap-2 bottom-[150px] right-1 md:right-5"
    >
      {showMessage && (
        <div className="relative max-w-[240px] rounded-xl bg-white px-3 py-3 pr-7 text-sm font-medium leading-6 text-gray-700 shadow-md">
          <button
            type="button"
            onClick={() => setShowMessage(false)}
            aria-label="إغلاق الرسالة"
            className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white transition hover:bg-red-700"
          >
            <IoClose size={15} />
          </button>

          <p>مرحبًا بك 👋</p>
          <p>
            لإضافة حضّانة أو وحدة عناية مركزة إلى منصة سرير 🏥
          </p>
          <p>تواصل معنا وسنساعدك في الانضمام.</p>
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
