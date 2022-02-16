import { makeStyles } from "@material-ui/core";
import { PURPLE } from "@utils/colors";
import styled from "styled-components";

export const ModalItemContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 0.5rem;

  & > img {
    display: block;
    max-height: 180px;
    max-height: 180px;
    margin: 0 auto;
  }

  & > h2 {
    font-size: 20px;
    text-transform: uppercase;
    text-align: center;
    color: ${PURPLE};
  }

  & > ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    gap: 0.5rem;

    & > h3 {
      color: ${PURPLE};
    }
  }
`;

export const MenuItemActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`;

export const ItemPrice = styled.p`
  font-size: 1rem;
  font-weight: bold;
  color: ${PURPLE};
  flex-shrink: 0;
`;

export const useStyles = makeStyles({
  root: {
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