import {  PURPLE } from "@utils/colors";
import styled from "styled-components";

export const CartCupomContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 0.5rem;
  gap: 0.5rem;
`;

export const CartCupomInput = styled.input`
  background-color: white;
  text-align: center;
  border-radius: 5px;
  border: 1px ${PURPLE} solid;
  width: clamp(200px, 350px, 100%);
  outline: none;
`;
