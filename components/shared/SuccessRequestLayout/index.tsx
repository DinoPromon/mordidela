import React, { memo } from "react";
import { BsCheck2Circle } from "react-icons/bs/index";

import { IconContainer, SuccessRequestLayoutContainer, SuccessMessage } from "./styled";

type SuccessRequestLayoutProps = {
  successMessage: string;
};

const SuccessRequestLayout: React.FC<SuccessRequestLayoutProps> = ({
  successMessage,
  children,
}) => {
  return (
    <SuccessRequestLayoutContainer>
      <IconContainer>
        <BsCheck2Circle size={50} color="green" />
      </IconContainer>
      <SuccessMessage>{successMessage}</SuccessMessage>
      {children}
    </SuccessRequestLayoutContainer>
  );
};

export default SuccessRequestLayout;
