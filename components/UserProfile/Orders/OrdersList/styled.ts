import styled from "styled-components";
import { motion } from "framer-motion";

import { PURPLE } from "@utils/colors";

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

export const OrdersDataContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
