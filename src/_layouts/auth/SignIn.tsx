"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { PencilLine, LockKeyhole, ChevronDown } from "lucide-react";
import TextInput from "@/_components/TextInput/TextInput";
import Button from "@/_components/Button/Button";
import InputSection from "@/_components/InputSection/InputSection";
import theme from "@/_theme";
import { SignInCss } from "./_styles/SignIn.styles";
import ErrorMessage from "@/_components/ErrorMessage/ErrorMessage";
import { useSignInForm } from "./_hooks/useSignInForm";
import Dropdown from "@/_components/Dropdown/Dropdown";
import { countryData } from "@/_datas/menu/country.data";
import { useLocale } from "@/_hooks/useLocale";
import { useUtcTimeStore } from "@/_stores/useUtcTimeStore";
import { timeData } from "@/_datas/menu/time.data";
import Link from "next/link";
import ImageWithSkeleton from "@/_components/common/ImageWithSkeleton";

const SignIn = () => {
  const { register, handleSubmit, errors, isSubmitting, onSubmit } =
    useSignInForm();
  const { locale, handleChangeLocale, t } = useLocale();
  const { currentUtcTime, setCurrentUtcTime } = useUtcTimeStore();
  const selectedRef = useRef<HTMLLIElement>(null);
  const currentCountry = useMemo(
    () => countryData.find((country) => country.code === locale),
    [locale]
  );
  const currentUtcTimeData = useMemo(
    () => timeData.find((time) => time.value === currentUtcTime),
    [currentUtcTime]
  );

  const [slideActiveIndex, setSlideActiveIndex] = useState(0);

  const handleDropdownOpen = () => {
    setTimeout(() => {
      selectedRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideActiveIndex((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section css={[SignInCss.container]}>
      <div css={SignInCss.bgWrapper}>
        <ImageWithSkeleton
          src="/assets/images/signin_bg.png"
          alt="signin_bg"
          fill
        />
      </div>
      <div css={SignInCss.wrapper}>
        <div css={SignInCss.contentWrapper}>
          <div css={SignInCss.header}>
            <h1 css={SignInCss.title}>Sign In</h1>
          </div>
          <form css={SignInCss.form} onSubmit={handleSubmit(onSubmit)}>
            <section css={SignInCss.section}>
              <h2 css={SignInCss.sectionTitle}>Your ID</h2>
              <InputSection
                headingText={
                  <PencilLine stroke={theme.colors.coolGray500} size={20} />
                }
                cssStyle={SignInCss.inputSection}
              >
                <TextInput
                  id="userId"
                  placeholder={t("signin.usernamePlaceholder")}
                  cssStyle={SignInCss.input}
                  {...register("id")}
                  disabled={isSubmitting}
                />
              </InputSection>
              {errors.id && (
                <ErrorMessage>{t(errors.id?.message || "")}</ErrorMessage>
              )}
            </section>
            <section css={SignInCss.section}>
              <h2 css={SignInCss.sectionTitle}>Password</h2>
              <InputSection
                headingText={
                  <LockKeyhole stroke={theme.colors.coolGray500} size={20} />
                }
                cssStyle={SignInCss.inputSection}
              >
                <TextInput
                  id="password"
                  placeholder={t("signin.passwordPlaceholder")}
                  type="password"
                  cssStyle={SignInCss.input}
                  {...register("password")}
                  disabled={isSubmitting}
                />
              </InputSection>
              {errors.password && (
                <ErrorMessage>{t(errors.password?.message || "")}</ErrorMessage>
              )}
            </section>
            <div css={SignInCss.dropdownWrapper}>
              <Dropdown
                triggerCssStyle={SignInCss.dropdownTrigger}
                dropdownCssStyle={SignInCss.dropdown}
                trigger={
                  <Button
                    type="button"
                    buttonType="grayLine"
                    cssStyle={SignInCss.countryButton}
                  >
                    {currentCountry ? (
                      <>
                        <span css={SignInCss.currentCountryIcon}>
                          {currentCountry.icon}
                        </span>
                        <span>{currentCountry?.name}</span>{" "}
                        <ChevronDown size={14} />
                      </>
                    ) : (
                      <>
                        <span>{t("profile.language")}</span>
                        <ChevronDown size={14} />
                      </>
                    )}
                  </Button>
                }
              >
                <ul css={SignInCss.dropdownList}>
                  {countryData.map((country) => (
                    <li key={`${country.id}-${country.code}`}>
                      <button
                        css={SignInCss.countryItem}
                        onClick={() => handleChangeLocale(country.code)}
                      >
                        <span css={SignInCss.countryItemIcon}>
                          {country.icon}
                        </span>
                        <p>{country.name}</p>
                      </button>
                    </li>
                  ))}
                </ul>
              </Dropdown>
            </div>
            {errors.root && (
              <ErrorMessage>{t(errors.root.message || "")}</ErrorMessage>
            )}
            <div css={SignInCss.buttonWrapper}>
              <Button
                buttonType="primary"
                cssStyle={SignInCss.button}
                disabled={isSubmitting}
              >
                {isSubmitting ? t("signin.submitting") : t("signin.login")}
              </Button>
              <Link href="/signup" css={SignInCss.signupLink}>
                {t("signup.button")}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
