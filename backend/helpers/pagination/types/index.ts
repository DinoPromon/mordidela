export type PaginatedSearchData = {
  itemsAmount?: number;
  skip?: number;
};

export type PaginatedSearchArg = {
  [key in keyof PaginatedSearchData]: string | string[];
};
