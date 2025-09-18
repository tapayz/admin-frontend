"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { Menu, ChevronDown } from "lucide-react";
import { useThemeStore } from "@/_stores/useThemeStore";
import Dropdown from "@/_components/Dropdown/Dropdown";
import BreadCrumb from "@/_components/BreadCrumb/BreadCrumb";
import theme from "@/_theme";
import { useLocale } from "@/_hooks/useLocale";
import { countryData } from "@/_datas/menu/country.data";
import { headerCss } from "./Header.styles";
import Button from "@/_components/Button/Button";
import { useSessionStore } from "@/_stores/useSessionStore";
import { useMyInfoQuery } from "@/_commomActions/myInfo/react-query/useMyInfoQuery";
import Skeleton from "@/_components/common/Skeleton";
import { useLogoutMutation } from "../auth/_hooks/react-query/useLogoutMutation";

const Header = () => {
  const { toggleIsSideBar, isSideBar } = useThemeStore();
  const { session, setSession } = useSessionStore();
  const { locale, handleChangeLocale } = useLocale();
  const { data: myInfoData, isLoading } = useMyInfoQuery();
  const { mutate: logout } = useLogoutMutation();

  useEffect(() => {
    if (myInfoData) {
      setSession(myInfoData);
    }
  }, [myInfoData]);

  const country = useMemo(() => {
    return countryData.find((country) => country.code === locale);
  }, [locale]);

  return (
    <>
      {isLoading && <Skeleton height={30} />}
      <header css={[headerCss.header, !isSideBar && headerCss.headerSideBar]}>
        <div css={headerCss.headerLeft}>
          <button onClick={toggleIsSideBar}>
            <Menu size={20} color={theme.colors.mainDark} />
          </button>
          <BreadCrumb />
        </div>

        <div>
          <img src="/images/tapayz-top-logo.jpg" width="120" />
        </div>

        <div css={headerCss.headerRight}>
          <Dropdown
            trigger={
              <button css={headerCss.profileButton}>
                <span>{`tapadmin`}</span>
                {/* <span>{`${session?.name}`}</span> */}
                <ChevronDown size={14} color={theme.colors.coolGray700} />
              </button>
            }
          >
            <ul css={headerCss.profileList}>
              <li css={headerCss.profileItem}>
                <Button
                  buttonType="grayLine"
                  type="button"
                  size="small"
                  onClick={() => logout()}
                >
                  Logout
                </Button>
              </li>
            </ul>
          </Dropdown>
          <Dropdown
            trigger={
              <button css={headerCss.countryButton}>{country?.icon}</button>
            }
          >
            <ul>
              {countryData.map((country) => (
                <li key={`${country.id}-${country.code}`}>
                  <button
                    css={headerCss.countryItem}
                    onClick={() => handleChangeLocale(country.code)}
                  >
                    <span css={headerCss.countryItemIcon}>{country.icon}</span>
                    <p>{country.name}</p>
                  </button>
                </li>
              ))}
            </ul>
          </Dropdown>
        </div>
      </header>
    </>
  );
};

export default Header;
