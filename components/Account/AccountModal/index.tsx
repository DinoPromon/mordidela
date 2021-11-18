import React, { useState } from "react";

import GeneralData from "./GeneralData";
import Modal from "@components/shared/Modal";
type Props = {
  id_usuario: string;
  onClose: () => void;
};

const AccountModal: React.FC<Props> = (props) => {
  const { id_usuario } = props;

  return (
    <Modal onClose={props.onClose}>
      <GeneralData id_usuario={id_usuario} />
    </Modal>
  );
};

export default AccountModal;
