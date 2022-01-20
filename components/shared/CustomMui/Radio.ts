import { makeStyles } from "@material-ui/core/styles";
import { PINK } from "@utils/colors";

export const radioStyles = makeStyles({
  root: {
    "&$checked": {
      color: PINK,
    },
  },
  checked: {
    color: PINK,
  },
});
