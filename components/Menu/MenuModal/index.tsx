import React, { useEffect } from "react";
import ModalItem from "./ModalItem";
import Modal from "@components/shared/Modal";

type Props = {
  onClose: () => void;
};

const MenuModal: React.FC<Props> = (props) => {
  return (
    <Modal onClose={props.onClose}>
      <ModalItem />
    </Modal>
  );
};

export default MenuModal;
