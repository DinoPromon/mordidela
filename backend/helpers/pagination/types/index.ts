export type PaginationData = {
  itemsAmount?: number;
  skip?: number;
};

export type PaginatedSearchArg = {
  [key in keyof PaginationData]: string | string[];
};

export type PaginatedData<T> = {
  [key in keyof T]: T[key];
};
