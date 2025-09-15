import { menuData } from "@/_datas/menu/menu.data";
import { MenuItem } from "@/_datas/menu/type/menu.type";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import { breadCrumbCss } from "./BreadCrumb.styles";
import { useLocale } from "@/_hooks/useLocale";
import { LayoutDashboard } from "lucide-react";
const BreadCrumb = () => {
  const pathname = usePathname();
  const { t } = useLocale();
  const breadCrumb: MenuItem | undefined = useMemo(() => {
    let data: MenuItem | undefined;

    if (pathname === "/") {
      data = {
        text: "Dashboard",
        href: "/",
        icon: <LayoutDashboard />,
      };

      return data;
    }

    menuData.forEach((menu) => {
      const item = menu.items.find((item) => item.href === pathname);
      if (item) {
        data = item;
      }
    });

    return data;
  }, [pathname]);

  if (!breadCrumb) return null;

  return (
    <section css={breadCrumbCss.breadCrumb}>
      <h1 css={breadCrumbCss.breadCrumbText}>
        <span css={breadCrumbCss.breadCrumbIcon}>{breadCrumb?.icon}</span>
        {t(breadCrumb.text)}
      </h1>
    </section>
  );
};

export default BreadCrumb;
