import React from "react";

import { FooterContainer } from "./styled";
import MediaList from "./MediaList";
import { MordidelaLogoWithLabel } from "@components/shared";

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <MordidelaLogoWithLabel />
      <h3>ENTRE EM CONTATO CONOSCO</h3>
      <MediaList />
    </FooterContainer>
  );
};

export default Footer;
