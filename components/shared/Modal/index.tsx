import React, { useEffect, useCallback } from "react";

import { ScrollContainer, Backdrop, CloseModalButton, ModalContentContainer } from "./styled";

type Props = {
  onClose: () => void;
};

const Modal: React.FC<Props> = ({ onClose, children }) => {
  const disableScroll = useCallback(() => {
    const scrollbarWidth = getScrollbarWidth();
    document.body.style.overflowY = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }, []);

  const enableScroll = useCallback(() => {
    document.body.style.overflowY = "auto";
    document.body.style.paddingRight = "0";
  }, []);

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

  useEffect(() => {
    disableScroll();
    return () => {
      enableScroll();
    };
  }, [disableScroll, enableScroll]);

  return (
    <Backdrop
      key="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <ModalContentContainer>
        <CloseModalButton onClick={buttonCloseHandler}>&times;</CloseModalButton>
        <ScrollContainer>{children}</ScrollContainer>
      </ModalContentContainer>
    </Backdrop>
  );
};

export default Modal;
