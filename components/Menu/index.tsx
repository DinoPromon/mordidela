import React, { useState } from "react";
import MenuList from "./MenuList";
import MenuModal from "./MenuModal";
import MenuFilter from "./MenuFilter";
import { PageContainer, PageTitle } from "@components/shared";
import { ProductCategory, RelatedProduct } from "@models/produto";

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
  const [modalItemImage, setModalItemImg] = useState<string>("/images/logo.svg");

  function closeModalHandler() {
    setShowModal(false);
  }

  function changeModalItem(item: RelatedProduct, image?: string) {
    setModalItemImg(image as string);
    setShowModal(true);
    setModalItem(item);
  }

  function changeModalImage(id_produto: RelatedProduct["id_produto"], image?: string) {
    if (modalItem?.id_produto === id_produto) setModalItemImg(image as string);
  }

  function getAllCategoriesFromProducts() {
    const mappedCategories = products.reduce((allCategories, cur) => {
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
      {showModal && (
        <MenuModal onClose={closeModalHandler} item={modalItem} image={modalItemImage} />
      )}
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
          changeModalImage={changeModalImage}
        />
      )}
    </PageContainer>
  );
};

export default Menu;
