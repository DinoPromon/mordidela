import React from "react";
import { categoryAll } from "..";
import { MenuListContainer } from "./styled";
import MenuItem from "./MenuItem";

import type { RelatedProduct } from "@models/produto";
import type { ProductCategory } from "@models/produto";

type Props = {
  selectedCategoryFilter: ProductCategory;
  onItemClick: (item: RelatedProduct, img?: string) => void;
  changeModalImage: (id_produto: RelatedProduct["id_produto"], img?: string) => void;
  products: RelatedProduct[];
};

const MenuList: React.FC<Props> = ({
  products,
  selectedCategoryFilter,
  onItemClick,
  changeModalImage,
}) => {
  function getFilteredCategories() {
    if (selectedCategoryFilter.id_categoria === categoryAll.id_categoria) {
      return products;
    }
    return products.filter(
      (product) => product.categoria.id_categoria === selectedCategoryFilter.id_categoria
    );
  }

  return (
    <MenuListContainer>
      {getFilteredCategories().map((product) => (
        <MenuItem
          onClick={onItemClick}
          item={product}
          key={`${product.nome}-${product.id_produto}`}
          changeModalImage={changeModalImage}
        />
      ))}
    </MenuListContainer>
  );
};

export default React.memo(MenuList);
