import React, { useState } from "react";

import CustomForm from "./styled";
import ItemFlavorsList from "./ItemFlavorsList";
import ItemAddsList from "./ItemAddsList";
import ItemCounter from "./ItemCounter";
import { ProductInfo, ProductOptions } from "@my-types/product";
import { FormButton } from "@components/shared";
import { transformPriceToString } from "@utils/transformation/price";

type Props = {
  image: string;
  options: ProductOptions;
  info: ProductInfo;
};

const ModalItem: React.FC<Props> = (props) => {
  const { options, info } = props;
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(props.info.preco_padrao);


  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(price);
  }

  return (
    <CustomForm onSubmit={submitHandler}>
      <h2>{info.nome}</h2>
      <img src={props.image} alt="Caixa de Batata" loading="lazy" />
      <p>{info.descricao}</p>
      {options.sabor.length > 0 && <ItemFlavorsList items={options.sabor} />}
      {options.adicional.length > 0 && <ItemAddsList items={options.adicional} />}
      <textarea name="observacao" placeholder="Alguma observação?" rows={2} />
      <div>
        <ItemCounter quantity={quantity} setQuantity={setQuantity}/>
        <FormButton type="submit">Adicionar - R${transformPriceToString(price*quantity)}</FormButton>
      </div>
    </CustomForm>
  );
};

export default ModalItem;
