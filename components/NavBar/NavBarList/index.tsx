import React, { useContext, useState } from "react";
import Cart from "@components/Cart";
import ProfileDropdown from "./ProfileDropdown";
import { FaBars, FaShoppingCart } from "react-icons/fa/index";
import { NavBarListContainer, NavBarListItem } from "./styled";
import Badge from "@material-ui/core/Badge";
import { CartContext } from "@store/cart";

type Props = {
  setShowSideBar: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavBarList: React.FC<Props> = (props) => {
  const { products } = useContext(CartContext);

  const [showModal, setShowModal] = useState(false);

  function itemCountQuantity() {
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
      {showModal && <Cart onCloseModal={closeModalHandler} />}
      <NavBarListItem onClick={openSideBar}>
        <FaBars size={24} color="white" />
      </NavBarListItem>
      <NavBarListItem className="float-right">
        <Badge badgeContent={itemCountQuantity()} color="primary">
          <FaShoppingCart size={24} color="white" onClick={openModalHandler} />
        </Badge>
      </NavBarListItem>
      <NavBarListItem className="float-right">
        <ProfileDropdown />
      </NavBarListItem>
    </NavBarListContainer>
  );
};

export default NavBarList;
