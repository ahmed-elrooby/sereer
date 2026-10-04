"use client";

import React, { useState } from "react";
import Aside from "./components/Aside/Aside.jsx";
import Header from "./components/Header/Header.jsx";
import HospitalContext from "../providers/HospitalContext.jsx";


const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return <>
  <HospitalContext>
    <div
      className="min-h-screen bg-slate-50 text-slate-900"
    >
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
      <div className="min-h-screen lg:mr-64">
        {/* Header */}
        <Header
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Page Content */}
        <main className="p-4 bg-slate-50 md:p-6 min-h-[calc(100vh-73px)]">
          {children}
        </main>
      </div>
    </div>
  </HospitalContext>
  
    
</>
};

export default Layout;