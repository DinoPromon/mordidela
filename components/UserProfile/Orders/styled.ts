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

export const OrdersContainerList = styled(motion.li)`
  padding: 1rem;
  background-color: white;
  border: 2px ${PURPLE} solid;
  /* box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; */
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
