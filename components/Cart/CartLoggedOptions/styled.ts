import styled from "styled-components";
import { CartFormSubtotalText } from "../styled";
import { fadeIn, fadeDuration, fadeOut } from "@utils/animations";

type Props = {
  shouldShowComponent: boolean;
};

export const CartFormErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const CartFormErrorMessage = styled.p`
  color: red;
`;

export const CartFormTotalText = styled(CartFormSubtotalText)`
  font-size: 1.25rem;
  text-align: center;

  & > span {
    font-size: 1.25rem;
  }
`;

export const CartFormRightAlignText = styled(CartFormSubtotalText)<Props>`
  animation-name: ${(props) => (props.shouldShowComponent ? fadeIn : fadeOut)};
  animation-duration: ${fadeDuration}ms;
  animation-fill-mode: forwards;
  animation-timing-function: ease-out;
`;
