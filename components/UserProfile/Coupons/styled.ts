import styled from "styled-components";
import { motion } from "framer-motion";

import { PINK } from "@utils/colors";

export const CouponContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0 auto;
  padding-bottom: 50px;
`;

export const CouponTitle = styled.h3`
  text-align: center;
  font-weight: bold;
`;

export const UsedCouponTitle = styled(CouponTitle)`
  padding-top: 1rem;
`;

export const CouponGrid = styled.ul`
/*   display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 0 auto;
  list-style: none;
  gap: 2rem; */
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 1160px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

export const CouponDataContainer = styled(motion.li)`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  justify-content: flex-start;
  border: 2px solid ${PINK};
  padding: 1rem;
  border-radius: 50px;
  background-color: white;
  max-width: 340px;
  width: 100%;
`;

export const CouponData = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

export const CouponDataHighlight = styled.span`
  color: ${PINK};
  font-weight: bold;
`;