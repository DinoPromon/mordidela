import styled from "styled-components";
import { PURPLE } from "@utils/colors";
import { makeStyles } from "@material-ui/styles";
import { NONAME } from "dns";

export const HomeContainer = styled.div`
  padding: 2rem;
`;

export const useStyles = makeStyles({
  root: {
    // Nome da label
    '& .MuiFormLabel-root': {
      color: "#3b3b3b",
    },
    // Bordas arredondadas
    '& .MuiOutlinedInput-root': {
      borderRadius: "5px",
    },
    // Entrada dos dados
    '& .MuiInputBase-root': {
      color: "#3b3b3b",
    },
    // Cor das bordas
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: "#bdbdbd",
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      /* borderColor: "red", */
    },
  },
});
