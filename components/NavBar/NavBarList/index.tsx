import React, { useState } from "react";
import Cart from "@components/Cart";
import ProfileDropdown from "./ProfileDropdown";
import { FaBars, FaShoppingCart } from "react-icons/fa/index";
import { NavBarListContainer, NavBarListItem } from "./styled";

type Props = {
  setShowSideBar: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavBarList: React.FC<Props> = (props) => {
  const [showModal, setShowModal] = useState(false);

  const openSideBar = () => {
    props.setShowSideBar(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  const openModalHandler = () => {
    setShowModal(true);
  };

  return (
    <NavBarListContainer>
      {showModal && <Cart onCloseModal={closeModalHandler} />}
      <NavBarListItem onClick={openSideBar}>
        <FaBars size={24} color="white" />
      </NavBarListItem>
      <NavBarListItem className="float-right">
        <FaShoppingCart size={24} color="white" onClick={openModalHandler} />
      </NavBarListItem>
      <NavBarListItem className="float-right">
        <ProfileDropdown />
      </NavBarListItem>
    </NavBarListContainer>
  );
};

export default NavBarList;
