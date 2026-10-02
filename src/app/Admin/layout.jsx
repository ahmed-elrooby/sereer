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
    <div
      className="min-h-screen bg-[#080B12] text-white"
    
    >
      <AdminContext>
        <div className="flex min-h-screen">
        <Aside
          sidebarOpen={sidebarOpen}
          closeSidebar={closeSidebar}
        />

        <div className="flex flex-col flex-1 min-w-0">
          <Header toggleSidebar={toggleSidebar} />

          <main className="flex-1 px-4 md:px-12">
            {children}
            <Footer/>
          </main>
        </div>
      </div> 
      </AdminContext>
     
    </div>
  );
};

export default Layout;