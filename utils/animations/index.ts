import { css } from "styled-components";

import fadeIn from "./fade-in";
import fadeOut from "./fade-out";

const fadeDuration = 200;

const fadeAnimation = (shouldShowComponent: boolean, duration: number) => css`
  animation-name: ${shouldShowComponent ? fadeIn : fadeOut};
  animation-duration: ${duration}ms;
  animation-fill-mode: forwards;
  animation-timing-function: ease-out;
`;

export { fadeIn, fadeOut, fadeDuration, fadeAnimation };