import React, { useState } from "react";

import MenuHeader from "./MenuHeader";
import Wrapper from "./styled";

import MenuList from "./MenuList";
import MenuModal from "./MenuModal";

const Menu = () => {
  const [modalItem, setModalItem] = useState();
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
      <MenuList onShowModal={showModalHandler} />
    </Wrapper>
  );
};

export default Menu;
