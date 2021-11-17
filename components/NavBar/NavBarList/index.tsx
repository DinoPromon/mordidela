import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import Wrapper from "./styled";
import ProfileDropdown from "./ProfileDropdown";

type Props = {
  setShowSideBar: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavBarList: React.FC<Props> = (props) => {
  const [sessionStatus, setSessionStatus] = useState<"loading" | "loggedin" | "loggedout">("loading");
  const openSideBar = () => {
    props.setShowSideBar(true);
  };

  useEffect(() => {
    getSession().then((session) => {
      if (session) setSessionStatus("loggedin");
      else setSessionStatus("loggedout");
    });
  }, [setSessionStatus]);

  return (
    <Wrapper>
      <li onClick={openSideBar}>
        <FontAwesomeIcon icon={faBars} size="lg" color="white" />
      </li>
      <li>
        <FontAwesomeIcon icon={faShoppingCart} size="lg" color="white" />
      </li>
      <li>
        {sessionStatus === "loggedout" && <Link href="/login">Login</Link>}
        {sessionStatus === "loggedin" && <ProfileDropdown />}
      </li>
    </Wrapper>
  );
};

export default NavBarList;
