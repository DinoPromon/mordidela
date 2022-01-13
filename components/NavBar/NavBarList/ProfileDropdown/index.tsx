import React, { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import { getSession } from "next-auth/client";
import { FaUserAlt, FaAngleDown, FaAngleUp } from "react-icons/fa/index";

import Wrapper from "./styled";
import DropdownList from "./DropdownList";

const ProfileDropdown: React.FC = (props) => {
  const [sessionStatus, setSessionStatus] = useState<"loading" | "loggedin" | "loggedout">("loading");
  const [nome, setNome] = useState<string>();
  const [showDropdown, setShowDropdown] = useState(false);

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
      <FaUserAlt size={24} color="white" style={{ verticalAlign: "middle" }} />
      {sessionStatus === "loggedin" && (
        <Fragment>
          <span>{nome}</span>
          {showDropdown ? (
            <FaAngleUp size={24} color="white" style={{ verticalAlign: "middle" }} />
          ) : (
            <FaAngleDown size={24} color="white" style={{ verticalAlign: "middle" }} />
          )}
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
