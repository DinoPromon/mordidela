import React, { useEffect } from "react";
import ModalItemDescription from "./ModalItemDescription";
import Modal from "@components/shared/Modal";

type Props = {
  onClose: () => void;
};

const MenuModal: React.FC<Props> = (props) => {
  return (
    <Modal onClose={props.onClose}>
      <ModalItemDescription></ModalItemDescription>
    </Modal>
  );
};

export default MenuModal;
