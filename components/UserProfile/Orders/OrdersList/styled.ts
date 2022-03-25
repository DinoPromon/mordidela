import styled from "styled-components";

export const OrdersDataContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const OrdersStatus = styled.span<{ color: string }>`
  color: ${({ color }) => color};
  font-weight: bold;
`;
