import { PINK, PURPLE } from "@utils/colors";
import styled from "styled-components";

export const CartAddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-top: dashed 2px ${PINK};
  border-bottom: dashed 2px ${PINK};
`;

export const CartAddressTitle = styled.h2`
  color: ${PURPLE};
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
`;

export const CartAddressComplement = styled.p`
  font-size: 13px;
  cursor: pointer;
`;

export const CartAddAddress = styled.span`
  display: flex;
  flex-direction: row;
  margin: 1rem 0;
  gap: 0.25rem;
  align-items: center;

  & > p {
    font-size: 13px;
  }

  &:hover {
    cursor: pointer;
    color: ${PURPLE};
    text-decoration: underline;
  }
`;
