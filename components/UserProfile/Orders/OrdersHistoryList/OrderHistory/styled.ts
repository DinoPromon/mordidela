import { PURPLE, PINK } from "@utils/colors";
import styled from "styled-components";

type ColoredTextProps = {
  color: string;
};

export const OrderHistoryItem = styled.li`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 5px;
  padding: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

export const ColoredText = styled.span<ColoredTextProps>`
  color: ${(props) => props.color};
  font-weight: bold;
`;

export const MoreDetails = styled.span`
  color: ${PURPLE};
  font-weight: bold;
  align-self: flex-start;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;


