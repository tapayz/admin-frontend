"use client";

import React, { useEffect, useState } from "react";
import TextInput from "@/_components/TextInput/TextInput";
import Select from "@/_components/Select/Select";
import Button from "@/_components/Button/Button";
import { useLocale } from "@/_hooks/useLocale";
import { memberFiltersCss } from "./MemberFilters.styles";
import { useFilter } from "@/_hooks/useFilter";

interface MemberFiltersProps {
  // 검색 타입과 검색어
  searchType: "name" | "email" | "phone" | "id" | "";
  search: string;
  onSearchTypeChange: (value: "name" | "email" | "phone" | "id" | "") => void;
  onReset: () => void;
}

export const MemberFilters: React.FC<MemberFiltersProps> = ({
  searchType,
  search,
  onSearchTypeChange,
  onReset,
}) => {
  const { t } = useLocale();

  const { setSearch } = useFilter();

  const [searchData, setSearchData] = useState<string>("");

  const searchTypeOptions = [
    { value: "", label: t("common.all") },
    { value: "name", label: t("member.search.name.label") },
    { value: "email", label: t("member.search.email.label") },
    { value: "phone", label: t("member.search.phone.label") },
    { value: "id", label: t("member.search.id.label") },
  ];

  useEffect(() => {
    if (search) {
      setSearchData(search);
    }
  }, [search]);

  const handleReset = () => {
    setSearchData("");
    onReset();
  };

  const handleSearch = () => {
    setSearch(searchData);
  };

  return (
    <section css={memberFiltersCss.container}>
      <div css={memberFiltersCss.filtersSection}>
        <div css={memberFiltersCss.filterRow}>
          <Select
            value={searchTypeOptions.find(
              (option) => option.value === searchType
            )}
            onChange={(option) =>
              onSearchTypeChange(
                (option?.value as "name" | "email" | "phone" | "id" | "") || ""
              )
            }
            options={searchTypeOptions}
            placeholder={t("common.selectSearchType")}
            cssStyle={memberFiltersCss.select}
          />

          <div css={memberFiltersCss.inputSection}>
            <TextInput
              placeholder={t("common.searchPlaceholder")}
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
              cssStyle={memberFiltersCss.input}
            />
          </div>
          <Button
            type="button"
            buttonType="primary"
            onClick={handleSearch}
            css={memberFiltersCss.resetButton}
          >
            {t("common.search")}
          </Button>

          <Button
            type="button"
            buttonType="grayLine"
            onClick={handleReset}
            css={memberFiltersCss.resetButton}
          >
            {t("common.reset")}
          </Button>
        </div>
      </div>
    </section>
  );
};
