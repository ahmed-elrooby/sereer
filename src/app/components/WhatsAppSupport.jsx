
"use client";

import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";

export default function WhatsAppSupport() {
  const [showMessage, setShowMessage] = useState(true);

  return (
    <div className="fixed z-50 flex items-center gap-2 bottom-5 left-5">
    {showMessage && (
  <button
    onClick={() => setShowMessage(false)}
    className="px-4 py-2 text-sm font-medium text-gray-700 transition bg-white rounded-full shadow-md hover:shadow-lg"
  >
    👋 أهلًا بيك! محتاج مساعدة؟ تواصل معانا 💬
  </button>
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
