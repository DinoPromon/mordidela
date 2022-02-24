import React, { useContext, useState } from "react";
import Cart from "@components/Cart";
import Badge from "@material-ui/core/Badge";
import ProfileDropdown from "./ProfileDropdown";
import CustomAnimatePresence from "@components/shared/CustomAnimatePresence";
import { CartContext } from "@store/cart";
import { NavBarListContainer, NavBarListItem } from "./styled";
import { FaBars, FaShoppingCart } from "react-icons/fa/index";

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
      <CustomAnimatePresence exitBeforeEnter>
        {showModal && <Cart onCloseModal={closeModalHandler} />}
      </CustomAnimatePresence>
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
