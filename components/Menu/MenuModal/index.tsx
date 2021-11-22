import React, { useEffect, useState } from "react";
import ModalItem from "./ModalItem";
import Modal from "@components/shared/Modal";

import { RequestState } from "@my-types/request";
import FormRequestStatus from "@components/shared/FormRequestStatus";

type Props = {
  onClose: () => void;
  itemId?: string;
  image: string;
};

const MenuModal: React.FC<Props> = (props) => {
  const [requestStatus, setRequestStatus] = useState<RequestState>({
    error: "",
    isLoading: true,
    success: false,
  });

  useEffect(() => {
    async function fetchProductData() {
      try {
        const response = await fetch(`/api/products/${props.itemId}`);
        const result = await response.json();
        if (!response.ok) throw new Error(result.message);
        console.log(result);
        setRequestStatus({ success: true, error: "", isLoading: false });
      } catch (e) {
        const error = e as Error;
        setRequestStatus({ success: false, error: error.message, isLoading: false });
      }
    }
    fetchProductData();
  }, []);

  return (
    <Modal onClose={props.onClose}>
      {requestStatus.isLoading && (
        <FormRequestStatus isLoading={requestStatus.isLoading} errorMessage={requestStatus.error} />
      )}
      {requestStatus.success && <ModalItem image={props.image} />}
    </Modal>
  );
};

export default MenuModal;
