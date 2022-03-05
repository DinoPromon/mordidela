import styled from "styled-components";
import { motion } from "framer-motion";

import { PINK } from "@utils/colors";

export const MenuItemContainer = styled(motion.li)`
  display: grid;
  grid-template-rows: 2fr clamp(70px, 90px, 120px);
  padding-top: 0.5rem;
  border-radius: 0.5rem;
  background-color: white;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

export const ItemDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 0.5rem;
  color: white;
  padding: 1em 0;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  background-color: ${PINK};
  cursor: pointer;

  & > span {
    font-size: 1rem;
    font-weight: 500;
    padding: 0 0.25rem;
    text-transform: capitalize;
  }
`;
