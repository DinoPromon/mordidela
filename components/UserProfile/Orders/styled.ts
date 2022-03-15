import styled from "styled-components";
import { motion } from "framer-motion";
import { PINK, PURPLE } from "@utils/colors";

export const OrdersContainer = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 0 auto;
  list-style: none;
  gap: 2rem;

  @media (max-width: 1300px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 890px) {
    grid-template-columns: 1fr;
  }
`;

export const OrdersContainerItem = styled(motion.li)`
  padding: 1rem;
  background-color: white;
  border: 2px ${PURPLE} solid;
  border-radius: 10px;
`;

export const OrdersContainerListHighlight = styled.span`
  font-weight: bold;
`;

export const MoreDetails = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.25rem;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  color: ${PINK};

  margin-top: 0.5rem;
  width: 75px;

  & > p:hover {
    text-decoration: underline;
  }
`;

export const LoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0;
`;
