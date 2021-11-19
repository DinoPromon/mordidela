import React from "react";

import List from "./styled";
import MenuItem from "./MenuItem";
import { Product } from "@my-types/product";


type Props = {
  onShowModal: () => void;
  products: Product[]
}

const MenuList: React.FC<Props> = (props) => {
  const { products } = props;
  return (
    <List>
  
      <MenuItem onClick={props.onShowModal}/>
    </List>
  );
};

export default MenuList;