import { PURPLE, PINK } from "@utils/colors";
import styled from "styled-components";
import { motion } from "framer-motion";

export const CupomContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;
  padding-bottom: 50px;
`;

export const CupomTitle = styled.h3`
  display: flex;
  align-items: center;
  justify-content:center;
  font-weight: bold;
`;

export const UsedCupomTitle = styled(CupomTitle)`
  padding-top: 1rem;
`;

export const CupomDataContainer = styled(motion.div)`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  justify-content: flex-start;
  border: 2px solid ${PINK};
  padding: 1rem;
  border-radius: 50px;
  background-color: white;
`;

export const CupomData = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

export const CupomDataHighlight = styled.span`
  color: ${PINK};
  font-weight: bold;
`;

