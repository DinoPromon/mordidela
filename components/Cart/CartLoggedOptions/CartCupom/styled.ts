import { PINK, PURPLE } from "@utils/colors";
import styled from "styled-components";

export const CartCupomContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 0.5rem;
  gap: 0.5rem;

  & > button {
    padding: 0.5rem 1rem;
  }
`;

export const CartCupomInput = styled.input`
  background-color: white;
  text-align: center;
  border-radius: 5px;
  border: 1px ${PURPLE} solid;
  outline: none;
  width: 350px;
  font-size: 1rem;
`;
