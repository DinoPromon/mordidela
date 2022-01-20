import React from "react";

import { MenuListContainer } from "./styled";
import MenuItem from "./MenuItem";
import { MenuProduct } from "@models/produto";

type Props = {
  onItemClick: (item: MenuProduct, img?: string) => void;
  changeModalImage: (
    id_produto: MenuProduct["id_produto"],
    img?: string
  ) => void;
  products: MenuProduct[];
};

const MenuList: React.FC<Props> = (props) => {
  const { products } = props;

  return (
    <MenuListContainer>
      {products.map((product) => (
        <MenuItem
          onClick={props.onItemClick}
          item={product}
          key={`${product.nome}-${product.id_produto}`}
          changeModalImage={props.changeModalImage}
        />
      ))}
    </MenuListContainer>
  );
};

export default React.memo(MenuList);
