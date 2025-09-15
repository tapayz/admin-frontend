import { css } from "@emotion/react";
import theme from "@/_theme";

export const WithdrawalsPageCss = {
  container: css`
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,

  header: css`
    margin-bottom: 32px;
  `,

  title: css`
    font-size: 28px;
    font-weight: 600;
    color: ${theme.colors.coolGray900};
    margin: 0;
  `,

  filtersSection: css`
    background: ${theme.colors.white};
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  `,

  filterRow: css`
    display: flex;
    gap: 16px;
    align-items: flex-end;
    flex-wrap: wrap;
    position: relative;
  `,

  inputSection: css`
    flex: 1;
    min-width: 200px;
    position: relative;

    /* DatePicker 드롭다운 위치 조정 */
    .react-datepicker-popper {
      z-index: 9999 !important;
    }

    .react-datepicker-popper[data-placement^="bottom-end"] {
      transform: translateX(-100%) !important;
    }

    .react-datepicker-popper[data-placement^="bottom-start"] {
      transform: translateX(0) !important;
    }

    /* 화면 오른쪽 경계에서 벗어나지 않도록 조정 */
    &:last-of-type .react-datepicker-popper {
      right: 0;
      left: auto !important;
    }

    /* 화면 왼쪽 경계에서 벗어나지 않도록 조정 */
    &:first-of-type .react-datepicker-popper {
      left: 0;
      right: auto !important;
    }
  `,

  input: css`
    min-width: 200px;
    width: 100%;
    flex: 1;
  `,

  searchButton: css`
    padding: 0 24px;
    flex-shrink: 0;
  `,

  resetButton: css`
    padding: 0 20px;
    flex-shrink: 0;
  `,

  tableSection: css`
    background: ${theme.colors.white};
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  `,

  sectionTitle: css`
    font-size: 20px;
    font-weight: 600;
    color: ${theme.colors.coolGray900};
    margin: 0 0 24px 0;
  `,

  loading: css`
    display: flex;
    justify-content: center;
    padding: 48px;
    font-size: 16px;
    color: ${theme.colors.coolGray500};
  `,

  empty: css`
    display: flex;
    justify-content: center;
    padding: 48px;
    font-size: 16px;
    color: ${theme.colors.coolGray500};
    text-align: center;
  `,
};
