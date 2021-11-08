import { placeholderAnimationDown, placeholderAnimationUp } from "./styled";

export const getInputColor = (
  isInputValid: boolean,
  isInputTouched: boolean,
  isOnFocus: boolean
) => {
  if (isInputValid) return "green";
  if (!isInputValid && isInputTouched) return "red";
  if (!isInputTouched && isOnFocus) return "blue";
  return "gray";
};

export const getAnimation = (isInitialState: boolean, isOnFocus: boolean, isInputTouched: boolean) => {
  if (isInitialState) return "";
  if (isOnFocus || isInputTouched) return placeholderAnimationUp;
  return placeholderAnimationDown;
};
