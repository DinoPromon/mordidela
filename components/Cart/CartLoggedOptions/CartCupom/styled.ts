import { PURPLE } from "@utils/colors";
import styled from "styled-components";

export const CartCupomContainer = styled.div``;

export const CartCupomInputButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export const CartCupomError = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
`;

export const CartCupomInput = styled.input`
  background-color: white;
  text-align: center;
  border-radius: 5px;
  border: 1px ${PURPLE} solid;
  width: clamp(200px, 350px, 100%);
  outline: none;
  font-size: 1rem;
`;
