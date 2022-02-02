import { createTheme } from "@material-ui/core/styles";
import { PINK, PURPLE } from "./colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: PURPLE,
    },
    secondary: {
      main: PINK,
    },
  },
  typography: {
    fontFamily: "Poppins",
    body2: {
      fontFamily: "Poppins",
    },
  },
  overrides: {},
});
