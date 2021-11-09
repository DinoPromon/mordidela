import React from "react";
import Wrapper from "./styled";

type Props = {
  onClose: () => void;
}

const Modal: React.FC<Props> = (props) => {
  return (
    <Wrapper>
      <h2>Modal Example</h2>
      <div>
        <span onClick={props.onClose}>&times;</span>
        <p>Some text in the Modal..</p>
      </div>
    </Wrapper>
  );
};

export default Modal;
