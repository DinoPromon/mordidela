import React, { useEffect, useState } from "react";
import useComponentVisible from "@hooks/useComponenteVisible";
import Wrapper from "./styled";
import Scroller from "./Scroller";

type Props = {
  onClose: () => void;
};

const Modal: React.FC<Props> = (props) => {
  const [offsetY, setOffsetY] = useState(0);
  const { ref: modalRef, isComponentVisible } = useComponentVisible(true);

  useEffect(() => {
    if (isComponentVisible) {
      setOffsetY(window.scrollY);
      document.body.setAttribute("style", `position: fixed; top: -${window.scrollY}px; left 0; right:0`);
    }
    if (!isComponentVisible) props.onClose();

    return () => {
      document.body.setAttribute("style", "");
      window.scrollTo(0, offsetY);
    };
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
