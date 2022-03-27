import styled from "styled-components";

export const CustomChipContainer = styled.div<{ color: string }>`
  & > .MuiChip-root {
    color: ${({ color }) => color};
    border-color: ${({ color }) => color};
  }
`;
