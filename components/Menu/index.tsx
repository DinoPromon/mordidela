import React, { useState } from "react";

import CustomAnimatePresence from "@components/shared/CustomAnimatePresence";
import { PageContainer, PageTitle } from "@components/shared";

import MenuList from "./MenuList";
import MenuModal from "./MenuModal";
import MenuFilter from "./MenuFilter";

import type { ProductCategory, RelatedProduct } from "@models/produto";

type Props = {
  products: RelatedProduct[];
  error: boolean;
};

export const categoryAll: ProductCategory = {
  desconto: null,
  id_categoria: -1,
  nome: "Todas as categorias",
};

const Menu: React.FC<Props> = ({ products, error }) => {
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState(categoryAll);
  const [showModal, setShowModal] = useState(false);
  const [modalItem, setModalItem] = useState<RelatedProduct>();

  function closeModalHandler() {
    setShowModal(false);
  }

  function changeModalItem(item: RelatedProduct) {
    setShowModal(true);
    setModalItem(item);
  }

  function getAllCategoriesFromProducts() {
    const mappedCategories = products.reduce((allCategories, cur) => {
      if (!cur.categoria) return allCategories;

      allCategories[cur.categoria.nome] = cur.categoria;
      return allCategories;
    }, {} as { [key: string]: ProductCategory });
    const categories = Object.values(mappedCategories);
    return categories;
  }

  function filterClickHandler(category: ProductCategory) {
    setSelectedCategoryFilter(category);
  }

  return (
    <PageContainer>
      <CustomAnimatePresence>
        {showModal && <MenuModal onClose={closeModalHandler} item={modalItem} />}
      </CustomAnimatePresence>
      <PageTitle>Cardápio</PageTitle>
      <MenuFilter
        categories={[categoryAll, ...getAllCategoriesFromProducts()]}
        selectedCategoryFilter={selectedCategoryFilter}
        onFilterClick={filterClickHandler}
      />
      {!error && (
        <MenuList
          selectedCategoryFilter={selectedCategoryFilter}
          products={products}
          onItemClick={changeModalItem}
        />
      )}
    </PageContainer>
  );
};

export default Menu;
