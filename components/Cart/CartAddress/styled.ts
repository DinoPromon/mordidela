import { PINK, PURPLE } from "@utils/colors";
import styled from "styled-components";

export const CartAddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-top: dashed 2px ${PINK};
  border-bottom: dashed 2px ${PINK};
`;

export const CartAddressLoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
`;

export const CartAddAddress = styled.span`
  display: flex;
  flex-direction: row;
  padding-bottom: 0.25rem;
  padding-top: 0.25rem;
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
