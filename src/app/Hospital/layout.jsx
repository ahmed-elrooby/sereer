"use client";

import React, { useState } from "react";

import Aside from "./components/Aside/Aside.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";

import HospitalContext from "../providers/HospitalContext.jsx";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <HospitalContext>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <button
            type="button"
            aria-label="إغلاق القائمة"
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-[1px] lg:hidden"
          />
        )}

        {/* Sidebar */}
        <Aside
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main Content */}
        <div className="flex min-h-screen flex-col lg:mr-64">
          {/* Header */}
          <Header
            onMenuClick={() => setSidebarOpen(true)}
          />

          {/* Content */}
          <main className="flex flex-1 flex-col bg-slate-50 p-4 md:p-6">
            <div className="flex-1">
              {children}
            </div>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </HospitalContext>
  );
};

export default Layout;