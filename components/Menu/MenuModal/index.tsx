import React from "react";

import Modal from "@components/shared/Modal";

import ModalItem from "./ModalItem";

import type { RelatedProduct } from "@models/produto";

type Props = {
  onClose: () => void;
  item?: RelatedProduct;
};

const MenuModal: React.FC<Props> = ({ item, onClose }) => {
  return (
    <Modal onClose={onClose}>{item && <ModalItem item={item} onCloseModal={onClose} />}</Modal>
  );
};

export default MenuModal;
