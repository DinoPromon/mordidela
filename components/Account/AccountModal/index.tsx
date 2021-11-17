import React from "react";

import GeneralData from "./GeneralData";
import Modal from "@components/shared/Modal";

type Props = {
  onClose: () => void;
};

const AccountModal: React.FC<Props> = (props) => {
  return (
    <Modal onClose={props.onClose}>
      <GeneralData />
    </Modal>
  );
};

export default AccountModal;
