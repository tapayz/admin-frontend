"use client";

import React, { useEffect } from "react";
import { sidebarCss } from "./_styles/Sidebar.styles";
import { menuData } from "@/_datas/menu/menu.data";
import SidebarMenuItem from "./_components/SidebarMenuItem";
import { LayoutDashboard, RotateCw, X } from "lucide-react";
import { sidebarMenuItemCss } from "./_components/SidebarMenuItem.styles";
import NavLink from "@/_components/NavLink/NavLink";
import { useThemeStore } from "@/_stores/useThemeStore";
import Image from "next/image";
import { useQueryRefresh } from "@/_hooks/react-query/useQueryRefresh";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useResize } from "@/_hooks/useResize";

const Sidebar = () => {
  const { isSideBar, setIsSideBar } = useThemeStore();
  const pathname = usePathname();
  const { isTablet, isMobile } = useResize();

  useEffect(() => {
    const handleResize = () => {
      if (isTablet) {
        setIsSideBar(false);
      } else {
        setIsSideBar(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isTablet]);

  useEffect(() => {
    if (isTablet && isSideBar) {
      setIsSideBar(false);
    }
  }, [pathname]);

  return (
    <>
      <div css={[sidebarCss.container, !isSideBar && sidebarCss.containerHide]}>
        <div css={sidebarCss.logoWrapper}>
          <Link
            href={"/dashboard"}
            css={[sidebarCss.logo, !isSideBar && sidebarCss.logoHide]}
          >
            TAPAYZ
          </Link>
          {isMobile && (
            <button type="button" onClick={() => setIsSideBar(false)}>
              <X size={26} color="white" strokeWidth={3} />
            </button>
          )}
        </div>
        <nav css={[sidebarCss.menu]}>
          <ul css={sidebarCss.menuList}>
            {menuData.map((menu) => (
              <SidebarMenuItem key={menu.title} menu={menu} />
            ))}
          </ul>
        </nav>
      </div>
      {isMobile && isSideBar && (
        <div css={sidebarCss.overlay} onClick={() => setIsSideBar(false)} />
      )}
    </>
  );
};

export default Sidebar;
