import React from "react";

import {CenterContainer} from './styled';

const Center: React.FC = (props) => {
  return (
    <CenterContainer>
      {props.children}
    </CenterContainer>
  );
};

export default Center;