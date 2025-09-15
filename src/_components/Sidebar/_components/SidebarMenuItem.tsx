import React from "react";
import { Menu } from "@/_datas/menu/type/menu.type";
import { useLocale } from "@/_hooks/useLocale";
import { sidebarMenuItemCss } from "./SidebarMenuItem.styles";
import NavLink from "@/_components/NavLink/NavLink";
import { useThemeStore } from "@/_stores/useThemeStore";

interface SidebarMenuItemProps {
  menu: Menu;
}

const SidebarMenuItem = ({ menu }: SidebarMenuItemProps) => {
  const { t } = useLocale();
  const { isSideBar } = useThemeStore();

  return (
    <li css={sidebarMenuItemCss.item}>
      <dl>
        <dt
          css={[
            sidebarMenuItemCss.title,
            !isSideBar && sidebarMenuItemCss.hide,
          ]}
        >
          {t(menu.title)}
        </dt>
        {menu.items.map((item) => (
          <dd
            key={item.text}
            css={[
              sidebarMenuItemCss.dd,
              !isSideBar && sidebarMenuItemCss.hideLink,
            ]}
          >
            {item.icon}
            <NavLink
              href={item.href}
              target={item.newTab ? "_blank" : undefined}
              rel={item.newTab ? "noopener noreferrer" : undefined}
              css={[sidebarMenuItemCss.link]}
            >
              <span
                css={[
                  sidebarMenuItemCss.text,
                  !isSideBar && sidebarMenuItemCss.hide,
                ]}
              >
                {t(item.text)}
              </span>
            </NavLink>
          </dd>
        ))}
      </dl>
    </li>
  );
};

export default SidebarMenuItem;
