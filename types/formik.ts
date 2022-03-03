import type { FieldMetaProps } from "formik";

export type SetFieldValue<T> = (
  field: keyof T,
  value: any,
  shouldValidate?: boolean | undefined
) => void;
