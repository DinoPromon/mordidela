import React from "react";

import List from "./styled";
import MenuItem from "./MenuItem";
import { MenuProduct } from "@my-types/product";

type Props = {
  onItemClick: (item: MenuProduct, image: string) => void;
  changeModalImage: (img: string) => void
  products: MenuProduct[];
};

const MenuList: React.FC<Props> = (props) => {
  const { products } = props;

  console.log('renderizado');
  return (
    <List>
      {products.map((product) => (
        <MenuItem
          onClick={props.onItemClick}
          item={product}
          key={`${product.nome}-${product.id_produto}`}
          changeModalImage={props.changeModalImage}
        />
      ))}
    </List>
  );
};

export default React.memo(MenuList);
