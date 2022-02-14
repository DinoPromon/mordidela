import styled from "styled-components";
import { PURPLE } from "@utils/colors";

export const CartOrdersListContainer = styled.ul`
  display: flex;
  flex-direction: column;
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
  display: flex;
  width: 100%;
  font-size: inherit;
  gap: 0.25rem;

  & > span {
    font-weight: bold;
    font-size: inherit;
    color: ${PURPLE};
    margin-left: auto;
    flex-shrink: 0;
  }
`;
