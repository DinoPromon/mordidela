export type SetFieldValue<T> = <R extends keyof T>(
  field: R,
  value: T[R],
  shouldValidate?: boolean | undefined
) => void;
