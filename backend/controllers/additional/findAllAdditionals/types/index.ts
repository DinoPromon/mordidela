export type FindAllAdditionalsArg = {
  getDeleted: boolean;
};

export type RawFindAllAdditionalsArg = {
  [key in keyof FindAllAdditionalsArg]: string | string[] | undefined;
};
