import React, { useState } from "react";

import Wrapper from "./styled";
import NavBarList from "./NavBarList";
import SideBar from "./SideBar";

const NavBar: React.FC = () => {
  const [showSideBar, setShowSideBar] = useState(false);

  return (
    <Wrapper>
      <NavBarList setShowSideBar={setShowSideBar} />
      {showSideBar && <SideBar setShowSideBar={setShowSideBar} isShowingSidebar={showSideBar} />}
    </Wrapper>
  );
};

export default NavBar;
