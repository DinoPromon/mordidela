import { makeStyles } from "@material-ui/core/styles";
import { PURPLE } from "@utils/colors";

export const useTextFieldStyles = makeStyles({
  root: {
    "& .MuiFormLabel-root": {
      color: "#3b3b3b",
    },
    "& .MuiOutlinedInput-root input[type='text']:valid": {
      "& ~fieldset": {
        border: `2px ${PURPLE} solid`,
      },
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "5px",
      "&:hover fieldset": {
        borderColor: "#bdbdbd",
      },
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
