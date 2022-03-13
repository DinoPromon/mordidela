import React, { memo } from "react";
import { BsCheck2Circle } from "react-icons/bs/index";

import { IconContainer, SuccessRequestLayoutContainer, SuccessMessage } from "./styled";

type SuccessRequestLayoutProps = {
  successMessage: string;
};

type SuccessRequestLayoutType = (props: SuccessRequestLayoutProps) => JSX.Element;

const SuccessRequestLayout: SuccessRequestLayoutType = ({ successMessage }) => {
  return (
    <SuccessRequestLayoutContainer>
      <IconContainer>
        <BsCheck2Circle size={50} color="green" />
      </IconContainer>
      <SuccessMessage>{successMessage}</SuccessMessage>
    </SuccessRequestLayoutContainer>
  );
};

export default memo(SuccessRequestLayout);
