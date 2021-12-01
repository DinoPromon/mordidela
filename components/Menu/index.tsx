import React, { useState, Fragment } from "react";

import MenuHeader from "./MenuHeader";
import MenuList from "./MenuList";
import MenuModal from "./MenuModal";
import { MenuProduct } from "@my-types/product";

type Props = {
  products: MenuProduct[];
};

const Menu: React.FC<Props> = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [modalItem, setModalItem] = useState<MenuProduct>();
  const [modalItemImage, setModalItemImg] = useState<string>("/images/logo.svg");

  const closeModalHandler = () => {
    setShowModal(false);
  };

  const changeModalItem = (item: MenuProduct, image: string) => {
    setModalItemImg(image);
    setShowModal(true);
    setModalItem(item);
  };

  const changeModalImage = (itemId: string, image: string) => {
    if (showModal && modalItem?.id_produto === itemId) {
      setModalItemImg(image);
    }
  };

  return (
    <Fragment>
      {showModal && <MenuModal onClose={closeModalHandler} item={modalItem} image={modalItemImage} />}
      <MenuHeader />
      <MenuList
        products={props.products}
        onItemClick={changeModalItem}
        changeModalImage={changeModalImage}
        isShowingModal={showModal}
      />
    </Fragment>
  );
};

export default Menu;
