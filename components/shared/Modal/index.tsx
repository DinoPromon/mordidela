import React, { useEffect, useState } from "react";
import useComponentVisible from "@hooks/useComponenteVisible";
import Wrapper from "./styled";
import Scroller from "./Scroller";

type Props = {
  onClose: () => void;
};

const Modal: React.FC<Props> = ({ onClose, children }) => {
  const [offsetY, setOffsetY] = useState(window.scrollY);
  const { ref: modalRef, isComponentVisible, setIsComponentVisible } = useComponentVisible(true);

  const duration = 400;

  function buttonCloseHandler() {
    setIsComponentVisible(false);
  }

  useEffect(() => {
    if (!isComponentVisible) {
      const timer = setTimeout(() => {
        onClose();

        return () => clearTimeout(timer);
      }, duration + 100);
    }
  }, [isComponentVisible, offsetY, onClose]);

  return (
    <Wrapper
      isCloseAnimation={!isComponentVisible}
      duration={duration}
      shouldShowComponent={isComponentVisible}
    >
      <div ref={modalRef as React.Ref<HTMLDivElement>} id="modal-content-container">
        <span onClick={buttonCloseHandler}>&times;</span>
        <Scroller>{children}</Scroller>
      </div>
    </Wrapper>
  );
};

export default Modal;
