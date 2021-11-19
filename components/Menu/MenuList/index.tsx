import React from "react";

import List from "./styled";
import MenuItem from "./MenuItem";
import { Product } from "@my-types/product";

type Props = {
  onShowModal: () => void;
  products: Product[];
};

const MenuList: React.FC<Props> = (props) => {
  const { products } = props;
  return (
    <List>
      {products.map((product) => (
        <MenuItem
          onClick={props.onShowModal}
          nome={product.nome}
          key={`${product.nome}-${product.id_produto}`}
        />
      ))}
    </List>
  );
};

export default MenuList;
