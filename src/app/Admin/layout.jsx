"use client";

import React, { useState } from "react";

import Aside from "./components/Aside/Aside.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";

import AdminContext from "../providers/AdminContext.jsx";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#080B12] text-white">
      <AdminContext>
        <div className="flex min-h-screen">

          {/* Sidebar */}
          <Aside
            sidebarOpen={sidebarOpen}
            closeSidebar={closeSidebar}
          />

          {/* Main Content */}
          <div className="flex min-w-0 flex-1 flex-col">

            {/* Header */}
            <Header toggleSidebar={toggleSidebar} />

            {/* Pages */}
            <main className="flex flex-1 flex-col px-4 md:px-8 lg:px-12">
              
              {/* Page Content */}
              <div className="flex-1">
                {children}
              </div>

              {/* Footer */}
              <Footer />

            </main>

          </div>
        </div>
      </AdminContext>
    </div>
  );
};

export default Layout;