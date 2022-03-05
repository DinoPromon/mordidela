import React, { useEffect } from "react";

import { ScrollContainer, Backdrop, CloseModalButton, ModalContentContainer } from "./styled";

type Props = {
  onClose: () => void;
};

const Modal: React.FC<Props> = ({ onClose, children }) => {
  function buttonCloseHandler() {
    onClose();
  }

  function getScrollbarWidth() {
    const outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.overflow = "scroll";
    document.body.appendChild(outer);

    const inner = document.createElement("div");
    outer.appendChild(inner);

    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
    outer.parentNode?.removeChild(outer);

    return scrollbarWidth;
  }

  function disableScroll() {
    const scrollbarWidth = getScrollbarWidth();
    document.body.style.overflowY = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }

  function enableScroll() {
    document.body.style.overflowY = "auto";
    document.body.style.paddingRight = "0";
  }

  useEffect(() => {
    disableScroll();
    return () => {
      enableScroll();
    };
  }, []);

  return (
    <Backdrop
      key="modal-backdrop"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <ModalContentContainer onClick={(event) => event.stopPropagation()}>
        <CloseModalButton onClick={buttonCloseHandler}>&times;</CloseModalButton>
        <ScrollContainer>{children}</ScrollContainer>
      </ModalContentContainer>
    </Backdrop>
  );
};

export default Modal;
