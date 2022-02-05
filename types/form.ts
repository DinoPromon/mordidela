export interface FormField<T> {
  name: keyof T;
  label: string;
  requiredErrorMessage?: string;
}
