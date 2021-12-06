import React, { useState, Fragment } from "react";

import MenuHeader from "./MenuHeader";
import MenuList from "./MenuList";
import MenuModal from "./MenuModal";
import { MenuProduct } from "@models/produto";


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

  const changeModalItem = React.useCallback((item: MenuProduct, image: string) => {
    setModalItemImg(image);
    setShowModal(true);
    setModalItem(item);
  }, []);

  const changeModalImage = React.useCallback((image: string) => {
    setModalItemImg(image);
  }, []);

  return (
    <Fragment>
      {showModal && <MenuModal onClose={closeModalHandler} item={modalItem} image={modalItemImage} />}
      <MenuHeader />
      <MenuList products={props.products} onItemClick={changeModalItem} changeModalImage={changeModalImage} />
    </Fragment>
  );
};

export default Menu;
