import theme from "@/_theme";
import { css } from "@emotion/react";

export const SignInCss = {
  container: css`
    width: 100%;
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  `,
  wrapper: css`
    display: flex;
    z-index: 10;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    flex: 1;
  `,
  contentWrapper: css`
    padding: 30px 20px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: calc(100% - 40px);
    max-width: 500px;
    margin: 0 auto;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
    border-radius: 20px;

    ${theme.media.mobile} {
      padding: 30px;
    }
  `,
  header: css`
    display: flex;
    flex-direction: column;
    gap: 5px;
  `,
  title: css`
    font-weight: 700;
    text-transform: uppercase;
    font-size: 24px;
    color: #000;
  `,
  description: css`
    font-size: 14px;
    color: ${theme.colors.coolGray300};
  `,
  form: css`
    display: flex;
    flex-direction: column;
    max-width: 440px;
    width: 100%;
    gap: 20px;
    max-width: 440px;
    width: 100%;
  `,
  section: css`
    display: flex;
    flex-direction: column;
    gap: 5px;
    position: relative;
  `,
  sectionTitle: css`
    font-size: 14px;
    font-weight: 700;
    color: ${theme.colors.coolGray600};
  `,
  buttonWrapper: css`
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
    gap: 10px;
  `,
  inputSection: css`
    border: 1px solid ${theme.colors.coolGray100};
    border-radius: 5px;
    overflow: hidden;
    .heading {
      background-color: ${theme.colors.coolGray50};
    }

    .content {
      border-left: 1px solid ${theme.colors.coolGray100};
      padding: 5px 10px;
    }
  `,
  input: css`
    border: none;
    padding: 0;
    height: 30px;
    &:hover,
    &:focus,
    :focus-within,
    &:active {
      border: none;
    }
    input {
      &:focus {
        outline: none;
      }
    }
  `,
  button: css`
    width: 100%;
    border-radius: 5px;
    height: 40px;
    flex: 1;
  `,
  dropdownTrigger: css`
    position: relative;
  `,
  dropdown: css`
    width: 100%;
  `,
  dropdownWrapper: css`
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;

    > div {
      flex: 1;
    }
  `,
  dropdownList: css`
    width: 100%;
  `,
  countryButton: css`
    font-size: 13px;
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
  `,
  currentCountryIcon: css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);

    svg {
      width: 13px;
    }
  `,
  countryItem: css`
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 8px 15px;
    p {
      font-size: 13px;
      color: ${theme.colors.coolGray500};

      &:hover {
        color: black;
      }
    }
  `,
  countryItemIcon: css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    box-shadow: 1px 0 2px 1px rgba(0, 0, 0, 0.1);

    svg {
      width: 18px;
    }
  `,
  timeButton: css`
    border-radius: 100%;
    overflow: hidden;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    box-shadow: 1px 0 2px 1px rgba(0, 0, 0, 0.1);
    color: ${theme.colors.mainDefault};

    &:hover {
      background-color: ${theme.colors.mainPoint};
      color: ${theme.colors.mainText};
    }
    transition: all 0.3s ease;
  `,
  timeList: css`
    height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
    width: 100%;
  `,
  timeItem: css`
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 8px 15px;
    width: 100%;
    p {
      font-size: 13px;
      color: ${theme.colors.coolGray500};
    }

    &:hover {
      background-color: ${theme.colors.mainPoint};
      color: ${theme.colors.mainText};

      p {
        color: ${theme.colors.mainText};
      }
    }
  `,
  timeItemActive: css`
    background-color: ${theme.colors.mainPoint};
    color: ${theme.colors.mainText};

    p {
      color: ${theme.colors.mainText};
    }
  `,
  footer: css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    p {
      font-size: 14px;
      color: ${theme.colors.coolGray500};
    }
    a {
      font-size: 14px;
      text-decoration: underline;
      color: ${theme.colors.coolGray700};
      font-weight: 700;
      &:hover {
        color: black;
      }
    }
  `,
  signupLink: css`
    width: 100%;
    flex: 1;
    border: 1px solid ${theme.colors.coolGray100};
    border-radius: 5px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: ${theme.colors.coolGray500};
    font-size: 14px;
    font-weight: 500;
    &:hover {
      background-color: ${theme.colors.coolGray50};
    }
    &:active {
      background-color: ${theme.colors.coolGray100};
    }
  `,
  bgWrapper: css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    flex: 1;
    img {
      object-fit: cover;
    }

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      background: linear-gradient(to right, rgba(0, 0, 0, 0), black);
      height: 100%;
      z-index: 1;
    }

    ${theme.media.mobile} {
      position: relative;
    }
  `,
};
