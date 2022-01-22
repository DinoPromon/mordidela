import React from "react";
import { CustomFadeContainer } from "./styled";
import useFadeAnimation from "@hooks/useFadeAnimation";

type CustomFadeProps = {
  triggerAnimation: boolean;
};

const CustomFade: React.FC<CustomFadeProps> = ({ triggerAnimation, children }) => {
  const shouldShowComponent = useFadeAnimation(triggerAnimation);

  return (
    <CustomFadeContainer triggerAnimation={triggerAnimation}>
      {shouldShowComponent && children}
    </CustomFadeContainer>
  );
};

export default CustomFade;
