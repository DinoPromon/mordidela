import React from "react";

import { MenuListContainer } from "./styled";
import MenuItem from "./MenuItem";
import { RelatedProduct } from "@models/produto";

type Props = {
  onItemClick: (item: RelatedProduct, img?: string) => void;
  changeModalImage: (id_produto: RelatedProduct["id_produto"], img?: string) => void;
  products: RelatedProduct[];
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
