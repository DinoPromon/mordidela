import React from "react";
import Wrapper from "./styled";

type Props = {
  onClose: () => void;
};

const Modal: React.FC<Props> = (props) => {
  return (
    <Wrapper>
      <div>
        <span onClick={props.onClose}>&times;</span>
        {props.children}
      </div>
    </Wrapper>
  );
};

export default Modal;
