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

type Props = {
  image: string;
  options: ProductOptions;
  info: ProductInfo;
};

const ModalItem: React.FC<Props> = (props) => {
  const { options, info } = props;
  const [productOrder, setProductOrder] = useState<CartProduct>({ 
    adds: [], 
    flavors: [], 
    id: `${formatProductId(info.nome, 0, 0, info.id_produto)}`,
    name: info.nome,
    product_id: info.id_produto,
    quantity: 1,
    size: info.tamanho,
    standard_price: info.preco_padrao
  });
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(props.info.preco_padrao);
  const [flavors, setFlavors] = useState<number[]>([]);
  const [note, setNote] = useState<string>();
  const { addProductToCart } = useContext(CartContext);

  const canSubmit = options.sabor.length ? flavors.length > 0 : true;

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (canSubmit) console.log();
  }

  function addFlavor(flavorId: number) {
    setFlavors((prevState) => [...prevState, flavorId]);
  }

  function removeFlavor(flavorId: number) {
    setFlavors((prevState) => prevState.filter((id) => id !== flavorId));
  }

  function noteBlurHandler(event: React.FocusEvent<HTMLTextAreaElement>) {
    const { value } = event.target;
    setNote(value);
  }

  function changeQuantity(quantity: number) {
    setProductOrder({
      ...productOrder,
      quantity: quantity
    })
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
          flavorsAmount={flavors.length}
          onAddFlavor={addFlavor}
          onRemoveFlavor={removeFlavor}
        />
      )}
      {options.adicional.length > 0 && <ItemAddsList items={options.adicional} setPrice={setPrice} />}
      <textarea name="observacao" placeholder="Alguma observação?" rows={2} onBlur={noteBlurHandler} />
      <div>
        <ItemCounter quantity={quantity} setQuantity={setQuantity} />
        <FormButton type="submit" disabled={!canSubmit}>
          Adicionar - R${transformPriceToString(price * quantity)}
        </FormButton>
      </div>
    </CustomForm>
  );
};

export default ModalItem;
