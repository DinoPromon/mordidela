import React, { useState } from "react";

import CustomForm from "./styled";
import ItemSizesList from "./ItemSizesList";
import ItemFlavorsList from "./ItemFlavorsList";
import ItemAddsList from "./ItemAddsList";
import ItemCounter from "./ItemCounter";
import { ProductInfo, ProductOptions } from "@my-types/product";
import { FormButton } from "@components/shared";

type Props = {
  image: string;
  options: ProductOptions;
  info: ProductInfo;
};

const ModalItem: React.FC<Props> = (props) => {
  const { options, info } = props;
  const [quantity, setQuantity] = useState(1);

  const incrementHandler = () => {
    setQuantity((prevState) => prevState + 1);
  };

  const decrementHandler = () => {
    if (quantity > 1) setQuantity((prevState) => prevState - 1);
  };

  return (
    <CustomForm>
      <h2>{info.nome}</h2>
      <img src={props.image} alt="Caixa de Batata" loading="lazy" />
      <p>{info.descricao}</p>
      {options.tamanho.length > 0 && <ItemSizesList items={options.tamanho} />}
      {options.sabor.length > 0 && <ItemFlavorsList items={options.sabor} />}
      {options.adicional.length > 0 && <ItemAddsList items={options.adicional} />}
      <textarea name="observacao" placeholder="Alguma observação?" rows={2} />
      <div>
        <ItemCounter quantity={quantity} onDecrement={decrementHandler} onIncrement={incrementHandler} />
        <FormButton type="submit">Adicionar - R$20,90</FormButton>
      </div>
    </CustomForm>
  );
};

export default ModalItem;
