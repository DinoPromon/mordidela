import React, { useState } from "react";
import { ProductCategory, RelatedProduct } from "@models/produto";
import MenuList from "./MenuList";
import MenuModal from "./MenuModal";
import MenuFilter from "./MenuFilter";
import { PageContainer, PageTitle } from "@components/shared";

type Props = {
  products: RelatedProduct[];
  error: boolean;
};

const Menu: React.FC<Props> = ({ products, error }) => {
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

  return (
    <PageContainer>
      {showModal && (
        <MenuModal onClose={closeModalHandler} item={modalItem} image={modalItemImage} />
      )}
      <PageTitle>Cardápio</PageTitle>
      <MenuFilter categories={getAllCategoriesFromProducts()} />
      {!error && (
        <MenuList
          products={products}
          onItemClick={changeModalItem}
          changeModalImage={changeModalImage}
        />
      )}
    </PageContainer>
  );
};

export default Menu;
