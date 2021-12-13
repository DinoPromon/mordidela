import React from "react";

import CustomFooter from "./styled";
import MediaList from "./MediaList";
import { MordidelaLogoWithLabel } from "@components/shared";

const Footer: React.FC = () => {
  return (
    <CustomFooter>
      <MordidelaLogoWithLabel/>
      <h3>ENTRE EM CONTATO CONOSCO</h3>
      <MediaList />
    </CustomFooter>
  );
};

export default Footer;
