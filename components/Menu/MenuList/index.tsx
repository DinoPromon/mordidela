import React from "react";

import MenuItem from "./MenuItem";
import { categoryAll } from "../index";
import { MenuListContainer } from "./styled";

import type { RelatedProduct } from "@models/produto";
import type { ProductCategory } from "@models/produto";

type Props = {
  products: RelatedProduct[];
  selectedCategoryFilter: ProductCategory;
  onItemClick: (item: RelatedProduct) => void;
};

const MenuList: React.FC<Props> = ({ products, selectedCategoryFilter, onItemClick }) => {
  function getFilteredCategories() {
    if (selectedCategoryFilter.id_categoria === categoryAll.id_categoria) {
      return products;
    }
    return products.filter(
      (product) => product.categoria?.id_categoria === selectedCategoryFilter.id_categoria
    );
  }

  return (
    <MenuListContainer>
      {getFilteredCategories().map((product) => (
        <MenuItem
          key={`${product.nome}-${product.id_produto}`}
          item={product}
          onClick={onItemClick}
        />
      ))}
    </MenuListContainer>
  );
};

export default React.memo(MenuList);
