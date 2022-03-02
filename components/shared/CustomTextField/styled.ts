import { makeStyles } from "@material-ui/core/styles";
import { PURPLE } from "@utils/colors";

export const useTextFieldStyles = makeStyles({
  root: {
    "& .MuiFormLabel-root": {
      color: "#3b3b3b",
    },
    '& .MuiOutlinedInput-root input:not([value=""])': {
      "& ~fieldset": {
        border: `2px ${PURPLE} solid`,
      },
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "5px",
      "&.Mui-focused fieldset": {
        borderColor: PURPLE,
      },
    },
    "& .MuiInputBase-root": {
      color: "#3b3b3b",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#bdbdbd",
    },
  },
});
