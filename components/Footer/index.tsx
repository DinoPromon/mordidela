import React from "react";
import Image from "next/image";

import Logo from '@images/label_logo.png';
import CustomFooter from "./styled";
import MediaList from "./MediaList";

const Footer: React.FC = () => {
  return (
    <CustomFooter>
      <Image src={Logo} alt="Logo do mordidela." width={100} height={80} layout="intrinsic" />
      <h3>ENTRE EM CONTATO CONOSCO</h3>
      <MediaList />
    </CustomFooter>
  );
};

export default Footer;
