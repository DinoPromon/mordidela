import React from "react";

import Wrapper from './styled';

type Props = {
  color?: string
}

const Loading: React.FC<Props> = (props) => {
  return (
    <Wrapper color={props.color || 'blue'}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </Wrapper>
  );
};

export default Loading;
