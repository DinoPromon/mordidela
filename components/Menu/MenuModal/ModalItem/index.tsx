import React, { useState, useContext } from "react";

import { ModalItemContainer } from "./styled";
import ItemImage from "./ItemImage";
import ItemFlavorsList from "./ItemFlavorsList";
import ItemAddsList from "./ItemAddsList";
import ItemCounter from "./ItemCounter";
import Adicional from "@models/adicional";
import Sabor from "@models/sabor";
import { CartContext } from "@store/cart";
import { MenuProduct } from "@models/produto";
import { CartProduct } from "@my-types/context";
import { FormButton } from "@components/shared";
import { formatProductId } from "@utils/formatters";
import { transformPriceToString } from "@utils/transformation";

type Props = {
  image: string;
  item: MenuProduct;
  closeModal: () => void;
};

const ModalItem: React.FC<Props> = (props) => {
  const { item, closeModal, image } = props;
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

  const canSubmit = item.flavors.length
    ? productOrder.flavors.length > 0
    : true;

  const getProductKey = formatProductId.bind(null, item.nome, item.id_produto);

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (canSubmit) {
      addProductToCart(productOrder);
      closeModal();
    }
  }

  function addFlavor(flavor: Sabor) {
    setProductOrder((prevState) => {
      const flavors = [...prevState.flavors, flavor];
      return {
        ...prevState,
        key: getProductKey(prevState.adds, flavors),
        flavors,
      };
    });
  }

  function removeFlavor(flavor: Sabor) {
    setProductOrder((prevState) => {
      const flavors = prevState.flavors.filter(
        (item) => item.id_sabor !== flavor.id_sabor
      );
      return {
        ...prevState,
        key: getProductKey(prevState.adds, flavors),
        flavors,
      };
    });
  }

  function addAditional(add: Adicional) {
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

  function removeAditional(add: Adicional) {
    setProductOrder((prevState) => {
      const adds = prevState.adds.filter(
        (item) => item.id_adicional !== add.id_adicional
      );
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
      <h2>
        {item.nome} - {item.tamanho}
      </h2>
      <ItemImage src={image} alt={item.nome} />
      <p>{item.descricao}</p>
      {item.flavors.length > 0 && (
        <ItemFlavorsList
          items={item.flavors}
          maxFlavor={item.qtde_max_sabor}
          flavorsAmount={productOrder.flavors.length}
          onAddFlavor={addFlavor}
          onRemoveFlavor={removeFlavor}
        />
      )}
      {item.adds.length > 0 && (
        <ItemAddsList
          items={item.adds}
          setPrice={setPrice}
          onAddAditional={addAditional}
          onRemoveAditional={removeAditional}
        />
      )}
      <textarea
        name="observacao"
        placeholder="Alguma observação?"
        rows={2}
        onBlur={noteBlurHandler}
      />
      <div>
        <ItemCounter
          quantity={productOrder.quantity}
          setQuantity={changeQuantity}
        />
        <FormButton type="submit" disabled={!canSubmit}>
          Adicionar - R${transformPriceToString(price * productOrder.quantity)}
        </FormButton>
      </div>
    </ModalItemContainer>
  );
};

export default ModalItem;
