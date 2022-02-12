import React from "react";
import ModalItem from "./ModalItem";
import Modal from "@components/shared/Modal";

import type { RelatedProduct } from "@models/produto";

type Props = {
  onClose: () => void;
  item?: RelatedProduct;
  image: string;
};

const MenuModal: React.FC<Props> = (props) => {
  const { item, onClose, image } = props;

  return (
    <Modal onClose={props.onClose}>
      {item && <ModalItem image={image} item={item} closeModal={onClose} />}
    </Modal>
  );
};

export default MenuModal;
