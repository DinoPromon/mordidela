import React, { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getSession } from "next-auth/client";
import { FaAngleDown } from "react-icons/fa/index";

import ProductsDropdownList from "./ProductsDropdownList";
import ClickableItem from "@components/shared/ClickableItem";
import { ProfileDropdownContainer } from "./styled";

import type { Variants } from "framer-motion";

const angleUpVariants: Variants = {
  down: (isDown: boolean) => ({
    rotateX: isDown ? -180 : 0,
    transition: {
      duration: 0.25,
    },
  }),
};

const ProductsDropdown: React.FC = (props) => {
  const [sessionStatus, setSessionStatus] = useState<"loading" | "loggedin" | "loggedout">(
    "loading"
  );
  const [nome, setNome] = useState<string>();
  const [showDropdown, setShowDropdown] = useState(false);

  const showDropdownHandler = () => {
    setShowDropdown((prevState) => !prevState);
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
    <ProfileDropdownContainer onClick={showDropdownHandler}>
      {sessionStatus === "loggedin" && (
        <Fragment>
          <span>Produtos</span>
          <ClickableItem title="Menu de produtos">
            <motion.div custom={showDropdown} variants={angleUpVariants} animate="down">
              <FaAngleDown size={24} color="white" style={{ verticalAlign: "middle" }} />
            </motion.div>
          </ClickableItem>
        </Fragment>
      )}
      {sessionStatus === "loggedout" && <Link href="/login">Login</Link>}
      {showDropdown && sessionStatus === "loggedin" && (
        <ProductsDropdownList isShowingDropdown={showDropdown} setShowDropdown={setShowDropdown} />
      )}
    </ProfileDropdownContainer>
  );
};

export default ProductsDropdown;
