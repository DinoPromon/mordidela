import { PINK,PURPLE } from "@utils/colors";
import styled from "styled-components";

/* const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-top: dashed 2px ${PINK};
  border-bottom: dashed 2px ${PINK};

  & > h3 {
    color: ${PURPLE};
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
  }

  & > div {
    padding-left: 1.5rem;
    padding-bottom: 0.5rem;

    & > p {
      font-size: 13px;
      cursor: pointer;
    }
  }

.adicionar_endereco{
    display: flex;
    flex-direction: row;
    padding-left: 0;
    gap: 0.5rem;
    align-items: center;
    cursor: pointer;
  }
`;

export default Wrapper; */

export const CartAddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-top: dashed 2px ${PINK};
  border-bottom: dashed 2px ${PINK};

  & > h2 {
    color: ${PURPLE};
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
  }

  & > p {
    font-size: 13px;
    padding-left: 1.5rem;
    margin-bottom: 0.5rem;
    cursor: pointer;
  }
`;

export const CartAddAddress = styled.span`
  display: flex;
  flex-direction: row;
  margin-bottom: 0.5rem;
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
