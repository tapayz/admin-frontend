import { useSearchParams } from "next/navigation";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";

export const usePagination = (
  total: number,
  pageLimit: number,
  groupLimit: number = 10
) => {
  const searchParams = useSearchParams();
  const [page, setPage] = useQueryState("page", {
    parse: (value) => Number(value) || 0,
    serialize: (value) => value.toString(),
  });
  const [limit, setLimit] = useQueryState("limit", {
    parse: (value) => Number(value) || pageLimit,
    serialize: (value) => value.toString(),
  });
  const [inputPage, setInputPage] = useState(page ? page + 1 : 1);

  const currentPage = page || 0;
  const currentLimit = limit || pageLimit;
  const totalPages = Math.ceil(total / currentLimit);
  const currentPageGroup = Math.floor(currentPage / groupLimit);
  const startPage = currentPageGroup * groupLimit;
  const endPage = Math.min(startPage + groupLimit, totalPages);

  useEffect(() => {
    if (page && page <= 0) {
      setInputPage(1);
      setPage(0, { shallow: true });
    } else if (page && page > totalPages) {
      setInputPage(totalPages);
      setPage(totalPages - 1, { shallow: true });
    }
  }, [page]);

  const handlePageChange = (newPage: number) => {
    if (newPage > totalPages) {
      setInputPage(totalPages);
    } else if (newPage < 0) {
      setInputPage(1);
    } else {
      setInputPage(newPage);
    }

    if (!searchParams.has("limit")) {
      setPage(newPage - 1, { shallow: true });
      setLimit(currentLimit);
    } else {
      setPage(newPage - 1);
    }
  };

  const handleInputPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPage = Number(e.target.value);
    if (newPage > totalPages) {
      setInputPage(totalPages);
    } else if (newPage < 0) {
      setInputPage(1);
    } else {
      setInputPage(newPage);
    }
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit, { shallow: true });
  };

  const handlePrevGroup = () => {
    if (currentPage > 0) {
      const newPage = currentPage - 1;
      if (!searchParams.has("limit")) {
        setPage(newPage, { shallow: true });
        setLimit(currentLimit);
      } else {
        setPage(newPage);
      }
      setInputPage(newPage + 1);
    }
  };

  const handleFirstGroup = () => {
    if (currentPage > 0) {
      setPage(0, { shallow: true });
      setLimit(currentLimit);
    }
    setInputPage(1);
  };

  const handleNextGroup = () => {
    if (currentPage < totalPages - 1) {
      const newPage = currentPage + 1;
      if (!searchParams.has("limit")) {
        setPage(newPage, { shallow: true });
        setLimit(currentLimit);
      } else {
        setPage(newPage);
      }
      setInputPage(newPage + 1);
    }
  };

  const handleLastGroup = () => {
    if (currentPage < totalPages - 1) {
      setPage(totalPages - 1, { shallow: true });
      setLimit(currentLimit);
    }
    setInputPage(totalPages);
  };

  return {
    currentPage,
    currentLimit,
    totalPages,
    currentPageGroup,
    startPage,
    endPage,
    handlePageChange,
    handlePrevGroup,
    handleFirstGroup,
    handleNextGroup,
    handleLastGroup,
    handleLimitChange,
    inputPage,
    setInputPage,
    handleInputPageChange,
  };
};
