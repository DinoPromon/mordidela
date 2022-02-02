import styled from "styled-components";
import { PURPLE } from "@utils/colors";

export const CartOrdersListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style: none;
`;

export const CartOrderAddsContainer = styled.div`
  display: flex;
  font-size: 13px;
  flex-direction: column;
  position: relative;
  padding: 2px 0 1.5rem 0;
  gap: 4px;
`;

export const CartOrderAddsText = styled.p`
  position: relative;
  width: 100%;
  font-size: inherit;

  & > span {
    font-weight: bold;
    font-size: inherit;
    color: ${PURPLE};
    position: absolute;
    right: 0;
  }
`;
