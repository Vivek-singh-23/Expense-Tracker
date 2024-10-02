
"use client";

import React from "react";
import SideNav from "./_components/SideNav";
import DashboardHeader from "./_components/DashboardHeader";

function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen">
      {/* SideNav section */}
      <div className="hidden md:block md:w-64">
        <SideNav />
      </div>

      {/* Children content section */}
      <div className="flex-1 ">
        <DashboardHeader/>
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
