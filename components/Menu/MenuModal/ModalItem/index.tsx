import React, { useState } from "react";

import CustomForm from "./styled";
import ItemSizesList from "./ItemSizesList";
import ItemFlavorsList from "./ItemFlavorsList";
import ItemAddsList from "./ItemAddsList";
import ItemCounter from "./ItemCounter";
import { FormButton } from "@components/shared";

type Props = {
  image: string
};

const ModalItem: React.FC<Props> = (props) => {
  const [quantity, setQuantity] = useState(1);

  const incrementHandler = () => {
    setQuantity((prevState) => prevState + 1);
  };

  const decrementHandler = () => {
    if (quantity > 1) setQuantity((prevState) => prevState - 1);
  };

  return (
    <CustomForm>
      <h2>Caixa de batata</h2>
      <img src={props.image} alt="Caixa de Batata" loading="lazy" />
      <p>Porção de batata gourmet com tempero cítrico especial</p>
      <ItemSizesList />
      <ItemFlavorsList />
      <ItemAddsList />
      <textarea name="observacao" placeholder="Alguma observação?" rows={2} />
      <div>
        <ItemCounter
          quantity={quantity}
          onDecrement={decrementHandler}
          onIncrement={incrementHandler}
        />
        <FormButton type="submit">Adicionar - R$20,90</FormButton>
      </div>
    </CustomForm>
  );
};

export default ModalItem;
