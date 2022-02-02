import styled from "styled-components";
import { fadeAnimation } from "@utils/animations";

type CustomFadeContainerProps = {
  triggerAnimation: boolean;
};

export const CustomFadeContainer = styled.div<CustomFadeContainerProps>`
  ${(props) => fadeAnimation(props.triggerAnimation)}
`;
