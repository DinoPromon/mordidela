import React, { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import { getSession } from "next-auth/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

import Wrapper from "./styled";
import DropdownList from "./DropdownList";

const ProfileDropdown: React.FC = (props) => {
  const [sessionStatus, setSessionStatus] = useState<"loading" | "loggedin" | "loggedout">("loading");
  const [showDropdown, setShowDropdown] = useState(false);

  const getDropdownIcon = () => {
    return showDropdown ? faAngleUp : faAngleDown;
  };

  const showDropdownHandler = () => {
    setShowDropdown((prevState) => !prevState);
  };

  useEffect(() => {
    getSession().then((session) => {
      if (session) setSessionStatus("loggedin");
      else setSessionStatus("loggedout");
    });
  }, [setSessionStatus]);

  return (
    <Wrapper onClick={showDropdownHandler}>
      <FontAwesomeIcon icon={faUser} size="lg" color="white" />
      {sessionStatus === "loggedin" && (
        <Fragment>
          <span>Aristóteles</span>
          <FontAwesomeIcon icon={getDropdownIcon()} size="lg" color="white" />
        </Fragment>
      )}
      {sessionStatus === "loggedout" && <Link href="/login">Login</Link>}
      {showDropdown && sessionStatus === "loggedin" && (
        <DropdownList isShowingDropdown={showDropdown} setShowDropdown={setShowDropdown} />
      )}
    </Wrapper>
  );
};

export default ProfileDropdown;
