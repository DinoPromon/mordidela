import React, { useState } from "react";

import { NavBarContainer } from "./styled";
import NavBarList from "./NavBarList";
import SideBar from "./SideBar";

const NavBar: React.FC = () => {
  const [showSideBar, setShowSideBar] = useState(false);

  return (
    <NavBarContainer>
      <NavBarList setShowSideBar={setShowSideBar} />
      {showSideBar && (
        <SideBar
          setShowSideBar={setShowSideBar}
          isShowingSidebar={showSideBar}
        />
      )}
    </NavBarContainer>
  );
};

export default NavBar;
