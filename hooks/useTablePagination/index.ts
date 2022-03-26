import { useState } from "react";

type PaginationData = {
  itemsAmount: number;
  page: number;
};

const INIT_PAGINATION_DATA = {
  itemsAmount: 10,
  page: 0,
};

const INIT_SKIP = 0;

export const useTablePagination = (initialData?: PaginationData) => {
  const [paginationData, setPaginationData] = useState<PaginationData>(
    initialData || INIT_PAGINATION_DATA
  );
  const [skip, setSkip] = useState<number>(INIT_SKIP);

  const isValidItemsAmount = isValidPage;

  function isValidPage(page: number) {
    if (page < 0 || !Number.isInteger(page)) return false;

    return true;
  }

  function changePage(page: number) {
    if (!isValidPage(page)) return;

    setPaginationData((prevState) => ({
      ...prevState,
      page,
    }));

    setSkip(page * paginationData.itemsAmount);
  }

  function changeItemsAmount(itemsAmount: number) {
    if (!isValidItemsAmount(itemsAmount)) return;

    setSkip(0);
    setPaginationData((prevState) => ({
      page: INIT_PAGINATION_DATA.page,
      itemsAmount: itemsAmount,
    }));
  }

  return [paginationData, skip, changePage, changeItemsAmount] as [
    PaginationData,
    number,
    (page: number) => void,
    (itemsAmount: number) => void
  ];
};
