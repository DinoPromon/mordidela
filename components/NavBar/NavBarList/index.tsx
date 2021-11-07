import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import Wrapper from "./styled";
import ProfileDropdown from "./ProfileDropdown";

type Props = {
  setShowSideBar: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavBarList: React.FC<Props> = (props) => {
  const openSideBar = () => {
    props.setShowSideBar(true);
  };

  return (
    <Wrapper>
      <li onClick={openSideBar}>
        <FontAwesomeIcon icon={faBars} size="lg" color="white" />
      </li>
      <li>
        <FontAwesomeIcon icon={faShoppingCart} size="lg" color="white" />
      </li>
      <li>
        <ProfileDropdown />
      </li>
    </Wrapper>
  );
};

export default NavBarList;
