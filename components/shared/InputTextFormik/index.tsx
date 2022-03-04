import React from "react";
import CustomTextField from "../CustomTextField";
import { useField } from "formik";

import type { TextFieldProps } from "@material-ui/core/TextField";

interface InputTextFormikProps extends Partial<Omit<TextFieldProps, "classes">> {
  name: string;
  variant?: "standard" | "filled" | "outlined";
  [key: string]: unknown;
}

const InputTextFormik: React.FC<InputTextFormikProps> = ({ name, onChange, onBlur, ...rest }) => {
  const [field, meta] = useField(name);
  const errorText = meta.error && meta.touched ? meta.error : "";

  function defaultOnChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    field.onChange(event);
  }

  function defaultOnBlurHandler(event: React.FocusEvent<HTMLInputElement>) {
    field.onBlur(event);
  }

  return (
    <CustomTextField
      {...rest}
      {...field}
      onChange={onChange ? onChange : defaultOnChangeHandler}
      helperText={errorText}
      error={!!errorText}
      onBlur={onBlur ? onBlur : defaultOnBlurHandler}
    />
  );
};

export default InputTextFormik;
