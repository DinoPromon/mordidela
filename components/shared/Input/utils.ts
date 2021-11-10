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
