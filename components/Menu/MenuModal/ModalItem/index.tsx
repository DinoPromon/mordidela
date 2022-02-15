import React, { useState, useContext } from "react";

import { ModalItemContainer, MenuItemActionsContainer, ItemPrice } from "./styled";
import ItemImage from "./ItemImage";
import ItemFlavorsList from "./ItemFlavorsList";
import ItemAddsList from "./ItemAddsList";
import ItemCounter from "./ItemCounter";
import { CartContext } from "@store/cart";
import { CustomTextField, FormButton } from "@components/shared";
import { getProductImagePath } from "@utils/images";
import { formatProductId } from "@utils/formatters";
import { transformPriceToString } from "@utils/transformation";

import type ISabor from "@models/sabor";
import type IAdicional from "@models/adicional";
import type { CartProduct } from "@my-types/context";
import type { RelatedProduct } from "@models/produto";

type Props = {
  item: RelatedProduct;
  onCloseModal: () => void;
};

const ModalItem: React.FC<Props> = ({ item, onCloseModal }) => {
  const [productOrder, setProductOrder] = useState<CartProduct>({
    adds: [],
    flavors: [],
    total_price: item.preco_padrao,
    key: `${formatProductId(item.nome, item.id_produto, [], [])}`,
    name: item.nome,
    product_id: item.id_produto,
    quantity: 1,
    size: item.tamanho,
    standard_price: item.preco_padrao,
    orderNote: "",
  });
  const [price, setPrice] = useState(item.preco_padrao);
  const { addProductToCart } = useContext(CartContext);

  const canSubmit = item.sabores.length ? productOrder.flavors.length > 0 : true;

  const getProductKey = formatProductId.bind(null, item.nome, item.id_produto);

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (canSubmit) {
      addProductToCart(productOrder);
      onCloseModal();
    }
  }

  function addFlavor(flavor: ISabor) {
    setProductOrder((prevState) => {
      const flavors = [...prevState.flavors, flavor];
      return {
        ...prevState,
        key: getProductKey(prevState.adds, flavors),
        flavors,
      };
    });
  }

  function removeFlavor(flavor: ISabor) {
    setProductOrder((prevState) => {
      const flavors = prevState.flavors.filter((item) => item.id_sabor !== flavor.id_sabor);
      return {
        ...prevState,
        key: getProductKey(prevState.adds, flavors),
        flavors,
      };
    });
  }

  function addAditional(add: IAdicional) {
    setProductOrder((prevState) => {
      const adds = [...prevState.adds, add];
      return {
        ...prevState,
        total_price: prevState.total_price + add.preco,
        key: getProductKey(adds, prevState.flavors),
        adds,
      };
    });
  }

  function removeAditional(add: IAdicional) {
    setProductOrder((prevState) => {
      const adds = prevState.adds.filter((item) => item.id_adicional !== add.id_adicional);
      return {
        ...prevState,
        total_price: prevState.total_price - add.preco,
        key: getProductKey(adds, prevState.flavors),
        adds,
      };
    });
  }

  function noteBlurHandler(event: React.FocusEvent<HTMLTextAreaElement>) {
    const { value } = event.target;
    setProductOrder((prevState) => ({
      ...prevState,
      orderNote: value,
    }));
  }

  function changeQuantity(quantity: number) {
    setProductOrder((prevState) => ({
      ...prevState,
      quantity: quantity,
    }));
  }

  return (
    <ModalItemContainer onSubmit={submitHandler}>
      {" "}
      {item.tamanho !== null ? (
        <h2>
          {item.nome} - {item.tamanho}
        </h2>
      ) : (
        <h2>{item.nome}</h2>
      )}
      <ItemImage src={getProductImagePath(item.nome_imagem)} alt={item.nome} />
      <p>{item.descricao}</p>
      {item.sabores.length > 0 && (
        <ItemFlavorsList
          items={item.sabores}
          maxFlavor={item.qtde_max_sabor}
          flavorsAmount={productOrder.flavors.length}
          onAddFlavor={addFlavor}
          onRemoveFlavor={removeFlavor}
        />
      )}
      {item.adicionais.length > 0 && (
        <ItemAddsList
          items={item.adicionais}
          setPrice={setPrice}
          onAddAditional={addAditional}
          onRemoveAditional={removeAditional}
        />
      )}
      <CustomTextField
        variant="outlined"
        name="observacao"
        label="Observação"
        multiline
        onBlur={noteBlurHandler}
      />
      <MenuItemActionsContainer>
        <ItemCounter quantity={productOrder.quantity} setQuantity={changeQuantity} />
        <ItemPrice>R$ {transformPriceToString(price * productOrder.quantity)}</ItemPrice>
        <FormButton type="submit" disabled={!canSubmit}>
          Adicionar
        </FormButton>
      </MenuItemActionsContainer>
    </ModalItemContainer>
  );
};

export default ModalItem;
