export type FindAllCategoriesArg = {
  getDeleted: boolean;
};

export type RawFindAllCategoriesArg = {
  [key in keyof FindAllCategoriesArg]: string | string[] | undefined;
};
