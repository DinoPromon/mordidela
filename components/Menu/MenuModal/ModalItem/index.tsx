import React, { useState } from "react";
import Image from "next/image";
import ModalRadio from "./ModalRadio";
import CustomForm from './styled';
import ModalCheckboxSabor from "./ModalCheckboxSabor";
import ModalCheckboxAdicional from "./ModalCheckboxAdicional";
import ModalQuantityCounter from "./ModalQuantityCounter";
import { FormButton } from "@components/shared";

const ModalItem: React.FC = () => {
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
      <div>
        <Image src="/images/caixa-batata.png" alt="Caixa de Batata" width={200} height={200} />
      </div>
      <p>Porção de batata gourmet com tempero cítrico especial</p>
      <h3>Tamanho</h3>
      <ModalRadio />
      <h3>Sabores</h3>
      <ModalCheckboxSabor />
      <h3>Adicionais</h3>
      <ModalCheckboxAdicional />
      <textarea name="observacao" placeholder="Alguma observação?" rows={2} />
      <div>
        <ModalQuantityCounter
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
