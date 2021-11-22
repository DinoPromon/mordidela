import React from "react";

import List from "./styled";
import MenuItem from "./MenuItem";
import { Product } from "@my-types/product";

type Props = {
  onItemClick: (id: string, image: string) => void
  changeModalImage: (img: string)  => void
  products: Product[];
};

const MenuList: React.FC<Props> = (props) => {
  const { products } = props;
  return (
    <List>
      {products.map((product) => (
        <MenuItem
          onClick={props.onItemClick}
          nome={product.nome}
          key={`${product.nome}-${product.id_produto}`}
          id_produto={product.id_produto}
          changeModalImage={props.changeModalImage}
        />
      ))}
    </List>
  );
};

export default MenuList;
