import React, { useState, Fragment } from "react";

import MenuList from "./MenuList";
import MenuModal from "./MenuModal";
import { MenuProduct } from "@models/produto";
import { PageContainer, PageTitle } from "@components/shared";

type Props = {
  products: MenuProduct[];
};

const Menu: React.FC<Props> = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [modalItem, setModalItem] = useState<MenuProduct>();
  const [modalItemImage, setModalItemImg] = useState<string>("/images/logo.svg");

  const closeModalHandler = React.useCallback(() => {
    setShowModal(false);
  }, []);

  const changeModalItem = React.useCallback((item: MenuProduct, image?: string) => {
    setModalItemImg(image as string);
    setShowModal(true);
    setModalItem(item);
  }, []);

  const changeModalImage = React.useCallback(
    (id_produto: MenuProduct["id_produto"], image?: string) => {
      if (modalItem?.id_produto === id_produto) setModalItemImg(image as string);
    },
    [modalItem?.id_produto]
  );

  return (
    <PageContainer>
      {showModal && <MenuModal onClose={closeModalHandler} item={modalItem} image={modalItemImage} />}
      <PageTitle>Cardápio</PageTitle>
      <MenuList products={props.products} onItemClick={changeModalItem} changeModalImage={changeModalImage} />
    </PageContainer>
  );
};

export default Menu;
