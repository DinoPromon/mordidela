import React from "react";

import Wrapper from './styled';

const Center: React.FC = (props) => {
  return (
    <Wrapper>
      {props.children}
    </Wrapper>
  );
};

export default Center;