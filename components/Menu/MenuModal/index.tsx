import React, { useEffect } from "react";

import Modal from "@components/shared/Modal";

type Props = {
  onClose: () => void;
};

const MenuModal: React.FC<Props> = (props) => {
  return (
    <Modal onClose={props.onClose}>
      
    </Modal>
  );
};

export default MenuModal;
