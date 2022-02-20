import React, { useEffect, useState } from "react";
import useComponentVisible from "@hooks/useComponenteVisible";
import { ScrollContainer, ModalContainer, CloseModalButton } from "./styled";

type Props = {
  onClose: () => void;
};

const Modal: React.FC<Props> = ({ onClose, children }) => {
  // const [offsetY, setOffsetY] = useState(window.scrollY);
  const { ref: modalRef, isComponentVisible, setIsComponentVisible } = useComponentVisible(true);

  const duration = 400;

  function buttonCloseHandler() {
    setIsComponentVisible(false);
  }

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  useEffect(() => {
    if (!isComponentVisible) {
      const timer = setTimeout(() => {
        onClose();

        return () => clearTimeout(timer);
      }, duration + 100);
    }
  }, [isComponentVisible, onClose]);

  return (
    <ModalContainer
      isCloseAnimation={!isComponentVisible}
      duration={duration}
      shouldShowComponent={isComponentVisible}
    >
      <div ref={modalRef as React.Ref<HTMLDivElement>} id="modal-content-container">
        <CloseModalButton onClick={buttonCloseHandler}>&times;</CloseModalButton>
        <ScrollContainer>{children}</ScrollContainer>
      </div>
    </ModalContainer>
  );
};

export default Modal;
