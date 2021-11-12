import React from "react";

import ItemImage from "@components/Menu/MenuList/";
import Modal from "@components/shared/Modal";

type Props = {
  onClose: () => void;
};

const AccountModal: React.FC<Props> = (props) => {
  return (
    <Modal onClose={props.onClose}>
      <ItemImage />
    </Modal>
  );
};

export default AccountModal;