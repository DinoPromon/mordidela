import React, { useState } from "react";

import MenuHeader from "./MenuHeader";
import Wrapper from "./styled";

import MenuList from "./MenuList";
import MenuModal from "./MenuModal";
import { Product } from "@my-types/product";

type Props = {
  products: Product[]
}

const Menu: React.FC<Props> = (props) => {
  const [showModal, setShowModal] = useState(false);

  const showModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  return (
    <Wrapper>
      {showModal && <MenuModal onClose={closeModalHandler}/>}
      <MenuHeader />
      <MenuList onShowModal={showModalHandler} products={props.products}/>
    </Wrapper>
  );
};

export default Menu;
