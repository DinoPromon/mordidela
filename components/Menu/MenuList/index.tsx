import React from "react";

import List from "./styled";
import MenuItem from "./MenuItem";
import MenuFilter from "./MenuFilter";

const MenuList: React.FC = () => {
  return (
    <List>
      <MenuFilter/>
      <MenuItem />
    </List>
  );
};

export default MenuList;