"use client";

import { FaWhatsapp } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

export default function WhatsAppSupport() {
  const [showMessage, setShowMessage] = useState(true);

  return (
    <div className="fixed z-50 flex items-center gap-2 bottom-[150px] left-1 md:left-5">
      {showMessage && (
        <div className="relative px-2 py-3 text-sm font-medium text-gray-700 bg-white shadow-md pr-7 rounded-xl">
          👋 أهلًا بيك! محتاج مساعدة؟ تواصل معانا 💬

          <button
            type="button"
            onClick={() => setShowMessage(false)}
            aria-label="إغلاق الرسالة"
            className="absolute flex items-center justify-center w-5 h-5 text-gray-400 transition bg-red-400 rounded-full top-1 right-1 hover:text-red-500 hover:bg-gray-100"
          >
            <IoClose size={15} className="text-white" />
          </button>
        </div>
      )}

      <a
        href="https://wa.me/201221854919?text=مرحبًا،%20محتاج%20مساعدة%20؟"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="تواصل معنا عبر واتساب"
        className="flex items-center justify-center text-white transition bg-green-500 rounded-full shadow-lg h-14 w-14 hover:scale-110 hover:bg-green-600"
      >
        <FaWhatsapp size={30} />
      </a>
    </div>
  );
}