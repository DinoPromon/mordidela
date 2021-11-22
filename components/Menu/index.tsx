import React, { useState, Fragment } from "react";

import MenuHeader from "./MenuHeader";
import MenuList from "./MenuList";
import MenuModal from "./MenuModal";
import { Product } from "@my-types/product";

type Props = {
  products: Product[];
};

const Menu: React.FC<Props> = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [modalItemId, setModalItemId] = useState<string>('21');
  const [modalItemImage, setModalItemImg] = useState<string>("/images/logo.svg");


  const closeModalHandler = () => {
    setShowModal(false);
  };

  const changeModalItem = (itemId: string, image: string) => {
    setModalItemImg(image);
    setShowModal(true);
    setModalItemId(itemId);
  }

  return (
    <Fragment>
      {showModal && <MenuModal onClose={closeModalHandler} itemId={modalItemId} image={modalItemImage} />}
      <MenuHeader />
      <MenuList products={props.products} onItemClick={changeModalItem}/>
    </Fragment>
  );
};

export default Menu;
