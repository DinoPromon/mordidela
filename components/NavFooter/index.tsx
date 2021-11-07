import React, { Fragment } from "react";

import Footer from "@components/Footer";
import NavBar from "@components/NavBar";

const NavFooter: React.FC = (props) => {
  return (
    <Fragment>
      <NavBar />
      {props.children}
      <Footer />
    </Fragment>
  );
};

export default NavFooter;
