import { SelectOption } from "@/_components/Select/types/select.types";
import { useLocale } from "@/_hooks/useLocale"; // 사용 중인 locale hook 가정

// 함수형으로 변경하여 locale에 따라 동적으로 옵션을 생성
export const usePaginationOptions = (): SelectOption[] => {
  const { t } = useLocale(); // locale 번역 함수 사용

  return [
    {
      label: `50${t("filter.pagination.text")}`, // '50건 출력'에 해당하는 번역 키
      value: "50",
    },
    {
      label: `100${t("filter.pagination.text")}`,
      value: "100",
    },
    {
      label: `200${t("filter.pagination.text")}`,
      value: "200",
    },
    {
      label: `500${t("filter.pagination.text")}`,
      value: "500",
    },
    {
      label: `1000${t("filter.pagination.text")}`,
      value: "1000",
    },
  ];
};
