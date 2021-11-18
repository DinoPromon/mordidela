import React, { useEffect } from "react";

import useComponentVisible from "@hooks/useComponenteVisible";
import Wrapper from "./styled";
import Scroller from "./Scroller";

type Props = {
  onClose: () => void;
};

const Modal: React.FC<Props> = (props) => {
  const { ref: modalRef, isComponentVisible } = useComponentVisible(true);

  useEffect(() => {
    if (!isComponentVisible) props.onClose();
  }, [isComponentVisible]);

  return (
    <Wrapper>
      <div ref={modalRef as React.Ref<HTMLDivElement>}>
        <span onClick={props.onClose}>&times;</span>
        <Scroller>{props.children}</Scroller>
      </div>
    </Wrapper>
  );
};

export default Modal;
