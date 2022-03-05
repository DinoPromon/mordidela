import styled from "styled-components";
import { motion } from "framer-motion";

import { PINK } from "@utils/colors";

export const ScrollContainer = styled.div`
  overflow-y: auto;
  padding: 1.25rem 1.5rem;
  max-height: 90vh;
  scroll-behavior: smooth;
  scrollbar-color: #c9bfd1 transparent;
  scrollbar-width: thin;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #c9bfd1;
    border-radius: 10px;
  }
`;

export const CloseModalButton = styled.span`
  font-size: 2rem;
  color: ${PINK};
  position: absolute;
  right: 12px;
  top: 5px;
  cursor: pointer;
`;

export const Backdrop = styled(motion.div)`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.35);
  overflow: hidden;
`;

export const ModalContentContainer = styled.div`
  position: relative;
  background-color: white;
  width: 90%;
  max-width: 600px;
  border-radius: 0.5rem;
  overflow: hidden;
`;
