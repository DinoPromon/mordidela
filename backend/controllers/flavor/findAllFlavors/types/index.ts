export type FindAllFlavorsArg = {
  getDeleted?: boolean;
};

export type RawFindAllFlavorsArg = {
  [key in keyof FindAllFlavorsArg]: string | string[] | undefined;
};
