import React from "react";

import CustomList from "./styled";
import AddOption from "./AddOption";
import { Add } from "@my-types/product";


type Props = {
  items: Add[];
};

const ItemAddsList: React.FC<Props> = (props) => {
  return (
    <CustomList>
      <h3>Adicionais</h3>
      {props.items.map((add) => (
        <AddOption
          key={`add-${add.id_adicional}`}
          id={add.id_adicional}
          label={add.nome}
          name={`input-${add.id_adicional}`}
          price={add.preco}
        />
      ))}
    </CustomList>
  );
};

export default ItemAddsList;
