"use client";

import Sidebar from "@/_components/Sidebar/Sidebar";
import React, { useEffect, useMemo } from "react";
import Header from "../header/Header";
import { adminLayoutCss } from "./AdminLayout.styles";
import Footer from "../footer/Footer";
import { useThemeStore } from "@/_stores/useThemeStore";
import AuthProvider from '@/_components/AuthProvider';
const AdminLayoutContainer = ({ children }: { children: React.ReactNode }) => {
  const { isSideBar } = useThemeStore();

  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="w-full">
        <Header />
        
        <main
          css={[adminLayoutCss.main, !isSideBar && adminLayoutCss.mainSideBar]}
          className="custom-scrollbar-not-hide"
        >
          <AuthProvider>{children}</AuthProvider>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayoutContainer;
