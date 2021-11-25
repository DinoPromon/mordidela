import React, { useState, useContext } from "react";

import CustomForm from "./styled";
import ItemFlavorsList from "./ItemFlavorsList";
import ItemAddsList from "./ItemAddsList";
import ItemCounter from "./ItemCounter";
import { CartContext } from "@store/cart";
import { ProductInfo, ProductOptions } from "@my-types/product";
import { CartProduct } from "@my-types/context";
import { FormButton } from "@components/shared";
import { transformPriceToString } from "@utils/transformation/price";
import { formatProductId } from "@utils/formatters/input-formatter";
import { Sabor } from "@my-types/database/models/sabor";
import { Adicional } from "@my-types/database/models/adicional";

type Props = {
  image: string;
  options: ProductOptions;
  info: ProductInfo;
  closeModal: () => void;
};

const ModalItem: React.FC<Props> = (props) => {
  const { options, info, closeModal } = props;
  const [productOrder, setProductOrder] = useState<CartProduct>({
    adds: [],
    flavors: [],
    id: `${formatProductId(info.nome, 0, 0, info.id_produto)}`,
    name: info.nome,
    product_id: info.id_produto,
    quantity: 1,
    size: info.tamanho,
    standard_price: info.preco_padrao,
    orderNote: ""
  });
  const [price, setPrice] = useState(props.info.preco_padrao);
  const { addProductToCart } = useContext(CartContext);

  const canSubmit = options.sabor.length ? productOrder.flavors.length > 0 : true;

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (canSubmit) {
      addProductToCart(productOrder);
      closeModal();
    }
  }

  function addFlavor(flavor: Sabor) {
    setProductOrder((prevState) => ({
      ...prevState,
      flavors: [...prevState.flavors, flavor],
    }));
  }

  function removeFlavor(flavor: Sabor) {
    setProductOrder((prevState) => ({
      ...prevState,
      flavors: prevState.flavors.filter((item) => item.id_sabor !== flavor.id_sabor),
    }));
  }

  function addAditional(add: Adicional) {
    setProductOrder((prevState) => ({
      ...prevState,
      adds: [...prevState.adds, add],
    }));
  }

  function removeAditional(add: Adicional) {
    setProductOrder((prevState) => ({
      ...prevState,
      adds: prevState.adds.filter((item) => item.id_adicional !== add.id_adicional),
    }));
  }

  function noteBlurHandler(event: React.FocusEvent<HTMLTextAreaElement>) {
    const { value } = event.target;
    setProductOrder((prevState) => ({
      ...prevState,
      orderNote: value,
    }));
  }

  function changeQuantity(quantity: number) {
    setProductOrder({
      ...productOrder,
      quantity: quantity,
    });
  }

  return (
    <CustomForm onSubmit={submitHandler}>
      <h2>{info.nome}</h2>
      <img src={props.image} alt="Caixa de Batata" loading="lazy" />
      <p>{info.descricao}</p>
      {options.sabor.length > 0 && (
        <ItemFlavorsList
          items={options.sabor}
          maxFlavor={info.qtde_max_sabor}
          flavorsAmount={productOrder.flavors.length}
          onAddFlavor={addFlavor}
          onRemoveFlavor={removeFlavor}
        />
      )}
      {options.adicional.length > 0 && (
        <ItemAddsList
          items={options.adicional}
          setPrice={setPrice}
          onAddAditional={addAditional}
          onRemoveAditional={removeAditional}
        />
      )}
      <textarea name="observacao" placeholder="Alguma observação?" rows={2} onBlur={noteBlurHandler} />
      <div>
        <ItemCounter quantity={productOrder.quantity} setQuantity={changeQuantity} />
        <FormButton type="submit" disabled={!canSubmit}>
          Adicionar - R${transformPriceToString(price * productOrder.quantity)}
        </FormButton>
      </div>
    </CustomForm>
  );
};

export default ModalItem;
