import React, { useEffect, useState } from "react";
import ModalItem from "./ModalItem";
import Modal from "@components/shared/Modal";

import { ProductOptions, ProductInfo } from "@my-types/product";
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
  const [itemOptions, setItemOptions] = useState<ProductOptions>({ adicional: [], sabor: [], tamanho: [] });
  const [itemInfo, setItemInfo] = useState<ProductInfo>({ nome: "", descricao: "", qtde_max_sabor: 0 });

  useEffect(() => {
    async function fetchProductData() {
      try {
        const response = await fetch(`/api/products/${props.itemId}`);
        const result = (await response.json()) as any;
        if (!response.ok) throw new Error(result.message);
        setItemOptions(result as ProductOptions);
        setItemInfo({
          nome: result.nome,
          descricao: result.descricao,
          qtde_max_sabor: result.qtde_max_sabor,
        });
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
      {requestStatus.success && <ModalItem image={props.image} options={itemOptions} info={itemInfo} />}
    </Modal>
  );
};

export default MenuModal;
