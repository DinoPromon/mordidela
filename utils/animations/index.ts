import { css } from "styled-components";

import fadeIn from "./fade-in";
import fadeOut from "./fade-out";

const fadeDuration = 250;

const fadeAnimation = (shouldShowComponent: boolean) => {
  const name = shouldShowComponent ? fadeIn : fadeOut;

  return css`
    animation-name: ${name};
    animation-duration: ${fadeDuration}ms;
    animation-fill-mode: forwards;
    animation-timing-function: linear;
  `;
};

export { fadeIn, fadeOut, fadeDuration, fadeAnimation };
