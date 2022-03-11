import React, { Fragment } from "react";

import NavBar from "@components/Admin/NavBar";

const NavBarAdmin: React.FC = (props) => {
  return (
    <Fragment>
      <NavBar />
      {props.children}
    </Fragment>
  );
};

export default NavBarAdmin;