import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import Wrapper from "./styled";
import Modal from "@components/shared/Modal";
import Cart from "@components/Cart";
import ProfileDropdown from "./ProfileDropdown";

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
    <Wrapper>
      {showModal && (
        <Modal onClose={closeModalHandler}>
          <Cart />
        </Modal>
      )}
      <li onClick={openSideBar}>
        <FontAwesomeIcon icon={faBars} size="lg" color="white" />
      </li>
      <li>
        <FontAwesomeIcon icon={faShoppingCart} size="lg" color="white" onClick={openModalHandler} />
      </li>
      <li>
        <ProfileDropdown />
      </li>
    </Wrapper>
  );
};

export default NavBarList;
