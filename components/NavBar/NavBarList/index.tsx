import React, { useContext, useState } from "react";
import Badge from "@material-ui/core/Badge";
import { FaBars, FaShoppingCart } from "react-icons/fa/index";

import Cart from "@components/Cart";
import CustomAnimatePresence from "@components/shared/CustomAnimatePresence";
import { CartContext } from "@store/cart";

import ProfileDropdown from "./ProfileDropdown";
import ClickableItem from "@components/shared/ClickableItem";

import { NavBarListContainer, NavBarListItem } from "./styled";

type Props = {
  setShowSideBar: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavBarList: React.FC<Props> = (props) => {
  const { products } = useContext(CartContext);

  const [showModal, setShowModal] = useState(false);

  function countItems() {
    const count = products.reduce((acc, product) => (acc += product.quantity), 0);
    return count;
  }

  function openSideBar() {
    props.setShowSideBar(true);
  }

  function closeModalHandler() {
    setShowModal(false);
  }

  function openModalHandler() {
    setShowModal(true);
  }

  return (
    <NavBarListContainer>
      <CustomAnimatePresence exitBeforeEnter>
        {showModal && <Cart onCloseModal={closeModalHandler} />}
      </CustomAnimatePresence>
      <NavBarListItem onClick={openSideBar}>
        <FaBars size={24} color="white" />
      </NavBarListItem>
      <NavBarListItem className="float-right">
        <ClickableItem title="Carrinho de compras" scale={1.12} onClick={openModalHandler}>
          <Badge badgeContent={countItems()} color="primary">
            <FaShoppingCart size={24} color="white" />
          </Badge>
        </ClickableItem>
      </NavBarListItem>
      <NavBarListItem className="float-right">
        <ProfileDropdown />
      </NavBarListItem>
    </NavBarListContainer>
  );
};

export default NavBarList;
