import React, { Fragment } from "react";

import Footer from "@components/Footer";
import NavBar from "@components/NavBar";
import { CartContextProvider } from "@store/cart";

const NavBarFooter: React.FC = (props) => {
  return (
    <CartContextProvider>
      <NavBar />
      {props.children}
      <Footer />
    </CartContextProvider>
  );
};

export default NavBarFooter;
