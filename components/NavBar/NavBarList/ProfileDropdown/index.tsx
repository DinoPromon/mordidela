import React, { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import { getSession } from "next-auth/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

import Wrapper from "./styled";
import DropdownList from "./DropdownList";

const ProfileDropdown: React.FC = (props) => {
  const [sessionStatus, setSessionStatus] = useState<"loading" | "loggedin" | "loggedout">("loading");
  const [nome, setNome] = useState<string>();
  const [showDropdown, setShowDropdown] = useState(false);

  const getDropdownIcon = () => {
    return showDropdown ? faAngleUp : faAngleDown;
  };

  const showDropdownHandler = () => {
    setShowDropdown((prevState) => !prevState);
  };

  const getUserName = async (email: string) => {
    const response = await fetch(`/api/users?email=${email}&limit=1`);
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }

    return result;
  };

  const handleLoggedIn = async () => {
    try {
      const session = await getSession();
      if (session) {
        const { nome } = session.user as { nome: string };
        setNome(nome.split(" ")[0]);
        setSessionStatus("loggedin");
        return;
      }
      setSessionStatus("loggedout");
    } catch (e) {
      const error = e as Error;
    }
  };

  useEffect(() => {
    handleLoggedIn();
  }, [setSessionStatus]);

  return (
    <Wrapper onClick={showDropdownHandler}>
      <FontAwesomeIcon icon={faUser} size="lg" color="white" />
      {sessionStatus === "loggedin" && (
        <Fragment>
          <span>{nome}</span>
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
