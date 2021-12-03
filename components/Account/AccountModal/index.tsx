import React, { useState } from "react";

import UserOrders from "./UserOrders";
import GeneralData from "./GeneralData";
import Modal from "@components/shared/Modal";
import { ProfileModalContent } from "@my-types/profile";

type Props = {
  id_usuario: string;
  onClose: () => void;
  content: ProfileModalContent;
};

const AccountModal: React.FC<Props> = (props) => {
  const { id_usuario, onClose, content } = props;

  return (
    <Modal onClose={onClose}>
      {content === "generalData" && <GeneralData id_usuario={id_usuario} />}
      {content === "order" && <UserOrders />}
    </Modal>
  );
};

export default AccountModal;
