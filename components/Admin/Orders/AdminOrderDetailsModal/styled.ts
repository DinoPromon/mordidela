import { PINK, PURPLE } from "@utils/colors";
import styled from "styled-components";

export const AdminOrdersModalTitle = styled.h3`
  text-align: center;

  & > p {
    font-weight: normal;
    font-size: 1rem;
  }
`;

export const AdminOrdersModalUserDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1.5rem 0;
`;

export const AdminOrdersPaymentValuesContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AdminOrdersPaymentValues = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px gray solid;
  padding: 0.25rem 0;

  & > p {
    font-weight: bold;

    & > span {
      color: ${PINK};
    }
  }
`;

export const LoadingContainer = styled.div`
  padding: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AdminPaymentType = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;

  & > p {
    font-weight: bold;
    color: ${PURPLE};
  }

  & > span {
    font-weight: bold;
    color: ${PINK};
  }
`;
