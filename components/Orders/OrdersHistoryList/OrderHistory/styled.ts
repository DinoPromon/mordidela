import styled from "styled-components";

type ColoredTextProps = {
  color: string;
};

export const Item = styled.li`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const ColoredText = styled.span<ColoredTextProps>`
  color: ${(props) => props.color};
`;
