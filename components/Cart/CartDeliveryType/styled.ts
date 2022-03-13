import { PURPLE } from "@utils/colors";
import styled from "styled-components";

export const CartDeliveryTypeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > h4 {
    color: ${PURPLE};
  }
`;