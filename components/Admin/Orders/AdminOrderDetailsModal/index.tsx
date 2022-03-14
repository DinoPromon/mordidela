import React from "react";
import { Modal } from "@components/shared";

type AdminOrderDetailsModalProps = {
  onClose: () => void;
};

const AdminOrderDetailsModal: React.FC<AdminOrderDetailsModalProps> = ({onClose}) => {
  return(
    <Modal onClose={onClose} key="admin-order-relations-modal"></Modal>
  );
};

export default AdminOrderDetailsModal;