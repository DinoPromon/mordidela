import React from "react";

import List from "./styled";
import MenuItem from "./MenuItem";
import MenuFilter from "./MenuFilter";

type Props = {
  onShowModal: () => void;
}

const MenuList: React.FC<Props> = (props) => {
  return (
    <List>
      <MenuFilter/>
      <MenuItem onClick={props.onShowModal}/>
    </List>
  );
};

export default MenuList;