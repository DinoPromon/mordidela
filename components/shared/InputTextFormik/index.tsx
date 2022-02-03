import React from "react";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import { useInputTextFormikStyles } from "./styled";

type InputTextFormikProps = TextFieldProps & {};

const InputTextFormik: React.FC<InputTextFormikProps> = ({ children, ...textFieldProps }) => {
  const textFieldClasses = useInputTextFormikStyles();
  return <TextField classes={textFieldClasses} {...textFieldProps} />;
};

export default InputTextFormik;
