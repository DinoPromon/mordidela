import React, { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import CircularProgress from "@material-ui/core/CircularProgress";
import { motion } from "framer-motion";
import { getSession } from "next-auth/client";
import { FaUserAlt, FaAngleDown } from "react-icons/fa/index";

const DropdownList = dynamic(() => import("./DropdownList"));
import ClickableItem from "@components/shared/ClickableItem";

import { SessionStatus } from "./constants/sessionStatus";
import { ProfileDropdownContainer, LoadingContainer } from "./styled";

import type { Variants } from "framer-motion";
import type { Session } from "next-auth";

const angleUpVariants: Variants = {
  down: (isDown: boolean) => ({
    rotateX: isDown ? -180 : 0,
    transition: {
      duration: 0.25,
    },
  }),
};

const ProfileDropdown: React.FC = (props) => {
  const [sessionStatus, setSessionStatus] = useState<SessionStatus>(SessionStatus.LOADING);
  const [userFirstName, setUserFirstName] = useState<string>();
  const [showDropdown, setShowDropdown] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  const showDropdownHandler = () => {
    setShowDropdown((prevState) => !prevState);
  };

  const handleLoggedIn = async () => {
    try {
      const session = await getSession();

      if (!session) return setSessionStatus(SessionStatus.LOGGED_OUT);
      setSession(session);

      const { nome } = session.user as { nome: string };

      setUserFirstName(nome.split(" ")[0]);
      setSessionStatus(SessionStatus.LOGGED_IN);
    } catch (e) {
      const error = e as Error;
      setSessionStatus(SessionStatus.LOGGED_OUT);
      console.log(error);
    }
  };

  useEffect(() => {
    handleLoggedIn();
  }, [setSessionStatus]);

  return (
    <ProfileDropdownContainer onClick={showDropdownHandler}>
      <FaUserAlt size={24} color="white" style={{ verticalAlign: "middle" }} />

      {sessionStatus === SessionStatus.LOADING && (
        <LoadingContainer>
          <CircularProgress color="primary" size={20} />
        </LoadingContainer>
      )}

      {sessionStatus === SessionStatus.LOGGED_IN && (
        <Fragment>
          <span>{userFirstName}</span>
          <ClickableItem title="Menu de usuário">
            <motion.div custom={showDropdown} variants={angleUpVariants} animate="down">
              <FaAngleDown size={24} color="white" style={{ verticalAlign: "middle" }} />
            </motion.div>
          </ClickableItem>
        </Fragment>
      )}

      {sessionStatus === SessionStatus.LOGGED_OUT && <Link href="/login">Login</Link>}

      {showDropdown && sessionStatus === SessionStatus.LOGGED_IN && session && (
        <DropdownList
          isShowingDropdown={showDropdown}
          setShowDropdown={setShowDropdown}
          session={session}
        />
      )}
    </ProfileDropdownContainer>
  );
};

export default ProfileDropdown;
