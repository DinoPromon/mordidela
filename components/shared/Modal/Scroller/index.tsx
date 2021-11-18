import React from "react";

import Wrapper from './styled';

const Scroller: React.FC = (props) => {
  return <Wrapper>{props.children}</Wrapper>;
};

export default Scroller;
