import styled from "styled-components";

import { PURPLE } from "@utils/colors";

export const FooterContainer = styled.footer`
  background: ${PURPLE};
  margin-top: auto;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 0;

  & > h3 {
    text-align: center;
    letter-spacing: 3px;
    font-weight: 600;
  }
`;
