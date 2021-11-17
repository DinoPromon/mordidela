import React, { useEffect } from "react";

import useComponentVisible from "@hooks/useComponenteVisible";
import Wrapper from "./styled";

type Props = {
  onClose: () => void;
};

const Modal: React.FC<Props> = (props) => {
  const { ref: modalRef, isComponentVisible, setIsComponentVisible } = useComponentVisible(true);

  useEffect(() => {
    if (!isComponentVisible) props.onClose();
  }, [isComponentVisible]);

  return (
    <Wrapper>
      <div ref={modalRef as React.Ref<HTMLDivElement>}>
        <span onClick={props.onClose}>&times;</span>
        {props.children}
      </div>
    </Wrapper>
  );
};

export default Modal;
