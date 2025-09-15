"use client";

import React, { useMemo } from "react";
import {
  PencilLine,
  LockKeyhole,
  ChevronDown,
  User,
  UserCheck,
} from "lucide-react";
import TextInput from "@/_components/TextInput/TextInput";
import Button from "@/_components/Button/Button";
import InputSection from "@/_components/InputSection/InputSection";
import theme from "@/_theme";
import { SignUpCss } from "./_styles/SignUp.styles";
import ErrorMessage from "@/_components/ErrorMessage/ErrorMessage";
import { useJoinForm } from "./_hooks/useJoinForm";
import { useCheckDuplicateForm } from "./_hooks/useCheckDuplicateForm";
import Dropdown from "@/_components/Dropdown/Dropdown";
import { countryData } from "@/_datas/menu/country.data";
import { useLocale } from "@/_hooks/useLocale";
import Link from "next/link";
import ImageWithSkeleton from "@/_components/common/ImageWithSkeleton";

const SignUp = () => {
  const { register, handleSubmit, errors, isSubmitting, onSubmit, watch } =
    useJoinForm();

  const currentId = watch("id");

  const {
    isLoading: isDuplicateLoading,
    checkDuplicate,
    isDuplicateAvailable,
    isChecked,
  } = useCheckDuplicateForm(currentId);

  const { locale, handleChangeLocale, t } = useLocale();

  const currentCountry = useMemo(
    () => countryData.find((country) => country.code === locale),
    [locale]
  );

  return (
    <section css={[SignUpCss.container]}>
      <div css={SignUpCss.bgWrapper}>
        <ImageWithSkeleton 
          src="/assets/images/signin_bg.png" 
          alt="signin_bg" 
          fill
        />
      </div>
      <div css={SignUpCss.wrapper}>
        <div css={SignUpCss.contentWrapper}>
          <div css={SignUpCss.header}>
            <h1 css={SignUpCss.title}>Sign Up</h1>
            <p css={SignUpCss.description}>{t("signup.description")}</p>
          </div>

          <form css={SignUpCss.form} onSubmit={handleSubmit(onSubmit)}>
            {/* ID Field with Duplicate Check */}
            <section css={SignUpCss.section}>
              <h2 css={SignUpCss.sectionTitle}>Your ID</h2>
              <div css={SignUpCss.checkDuplicateSection}>
                <InputSection
                  headingText={
                    <PencilLine stroke={theme.colors.coolGray500} size={20} />
                  }
                  cssStyle={SignUpCss.inputSection}
                >
                  <TextInput
                    id="userId"
                    placeholder={t("signup.id.placeholder")}
                    cssStyle={SignUpCss.input}
                    {...register("id")}
                    disabled={isSubmitting}
                  />
                </InputSection>
                <Button
                  type="button"
                  buttonType="grayLine"
                  cssStyle={SignUpCss.checkDuplicateButton}
                  onClick={checkDuplicate}
                  disabled={
                    isDuplicateLoading || !currentId || currentId.length < 5
                  }
                >
                  {isDuplicateLoading
                    ? t("signup.checkingDuplicate")
                    : t("signup.checkDuplicate")}
                </Button>
              </div>
              {errors.id && (
                <ErrorMessage>{t(errors.id?.message || "")}</ErrorMessage>
              )}
              {isChecked && (
                <div
                  css={[
                    SignUpCss.duplicateMessage,
                    isDuplicateAvailable
                      ? SignUpCss.duplicateSuccess
                      : SignUpCss.duplicateError,
                  ]}
                >
                  {isDuplicateAvailable
                    ? t("signup.id.available")
                    : t("signup.id.unavailable")}
                </div>
              )}
            </section>

            {/* Name Field */}
            <section css={SignUpCss.section}>
              <h2 css={SignUpCss.sectionTitle}>Your Name</h2>
              <InputSection
                headingText={
                  <User stroke={theme.colors.coolGray500} size={20} />
                }
                cssStyle={SignUpCss.inputSection}
              >
                <TextInput
                  id="userName"
                  placeholder={t("signup.name.placeholder")}
                  cssStyle={SignUpCss.input}
                  {...register("name")}
                  disabled={isSubmitting}
                />
              </InputSection>
              {errors.name && (
                <ErrorMessage>{t(errors.name?.message || "")}</ErrorMessage>
              )}
            </section>

            {/* Password Field */}
            <section css={SignUpCss.section}>
              <h2 css={SignUpCss.sectionTitle}>Password</h2>
              <InputSection
                headingText={
                  <LockKeyhole stroke={theme.colors.coolGray500} size={20} />
                }
                cssStyle={SignUpCss.inputSection}
              >
                <TextInput
                  id="password"
                  placeholder={t("signup.password.placeholder")}
                  type="password"
                  cssStyle={SignUpCss.input}
                  {...register("password")}
                  disabled={isSubmitting}
                />
              </InputSection>
              {errors.password && (
                <ErrorMessage>{t(errors.password?.message || "")}</ErrorMessage>
              )}
            </section>

            {/* Confirm Password Field */}
            <section css={SignUpCss.section}>
              <h2 css={SignUpCss.sectionTitle}>Confirm Password</h2>
              <InputSection
                headingText={
                  <UserCheck stroke={theme.colors.coolGray500} size={20} />
                }
                cssStyle={SignUpCss.inputSection}
              >
                <TextInput
                  id="rePassword"
                  placeholder={t("signup.rePassword.placeholder")}
                  type="password"
                  cssStyle={SignUpCss.input}
                  {...register("rePassword")}
                  disabled={isSubmitting}
                />
              </InputSection>
              {errors.rePassword && (
                <ErrorMessage>
                  {t(errors.rePassword?.message || "")}
                </ErrorMessage>
              )}
            </section>

            {/* Language Selection */}
            <div css={SignUpCss.dropdownWrapper}>
              <Dropdown
                triggerCssStyle={SignUpCss.dropdownTrigger}
                dropdownCssStyle={SignUpCss.dropdown}
                trigger={
                  <Button
                    type="button"
                    buttonType="grayLine"
                    cssStyle={SignUpCss.countryButton}
                  >
                    {currentCountry ? (
                      <>
                        <span css={SignUpCss.currentCountryIcon}>
                          {currentCountry.icon}
                        </span>
                        <span>{currentCountry?.name}</span>
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
                <ul css={SignUpCss.dropdownList}>
                  {countryData.map((country) => (
                    <li key={`${country.id}-${country.code}`}>
                      <button
                        css={SignUpCss.countryItem}
                        onClick={() => handleChangeLocale(country.code)}
                      >
                        <span css={SignUpCss.countryItemIcon}>
                          {country.icon}
                        </span>
                        <p>{country.name}</p>
                      </button>
                    </li>
                  ))}
                </ul>
              </Dropdown>
            </div>

            {errors.root && <ErrorMessage>{errors.root.message}</ErrorMessage>}

            <div css={SignUpCss.buttonWrapper}>
              <Link href="/signin" css={SignUpCss.loginLink}>
                {t("signin.login")}
              </Link>
              <Button
                buttonType="primary"
                cssStyle={SignUpCss.button}
                disabled={isSubmitting}
              >
                {isSubmitting ? t("signup.submitting") : t("signup.button")}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
