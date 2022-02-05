import React from "react";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import { useTextFieldStyles } from "./styled";

interface CustomTextFieldProps extends Omit<TextFieldProps, "classes"> {}

const CustomTextField: React.FC<CustomTextFieldProps> = ({ children, ...textFieldProps }) => {
  const textFieldClasses = useTextFieldStyles();

  return <TextField classes={textFieldClasses} {...textFieldProps} />;
};

export default CustomTextField;
