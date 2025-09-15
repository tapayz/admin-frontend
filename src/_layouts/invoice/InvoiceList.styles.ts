import { css } from "@emotion/react";
import theme from "@/_theme";

export const invoiceListStyles = {
  container: css`
    display: flex;
    gap: 10px;
    flex-direction: column;
  `,

  filtersSection: css`
    background: ${theme.colors.white};
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  `,

  filterRow: css`
    display: flex;
    gap: 10px;
    align-items: center;
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
};
