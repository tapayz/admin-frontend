import { css } from "@emotion/react";
import theme from "@/_theme";

export const memberFiltersCss = {
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
    gap: 12px;
    align-items: flex-end;
    flex-wrap: wrap;
    position: relative;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: stretch;
    }
  `,

  inputSection: css`
    flex: 1;
    min-width: 200px;
    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
      min-width: 100%;
    }
  `,

  label: css`
    font-size: 12px;
    font-weight: 500;
    color: ${theme.colors.coolGray600};
    margin-bottom: 2px;
  `,
  select: css`
    max-width: 150px;
    width: 100%;
  `,

  input: css`
    min-width: 200px;
    width: 100%;
  `,

  searchButton: css`
    padding: 0 24px;
    flex-shrink: 0;
    min-width: 80px;

    @media (max-width: 768px) {
      width: 100%;
    }
  `,

  resetButton: css`
    padding: 0 20px;
    flex-shrink: 0;
    min-width: 70px;

    @media (max-width: 768px) {
      width: 100%;
    }
  `,
};
