import React from "react";
import Image from "next/image";

import CustomFooter from "./styled";
import MediaList from "./MediaList";

const Footer: React.FC = () => {
  return (
    <CustomFooter>
      <Image src="/images/label_logo.png" alt="Logo do mordidela." width={100} height={80} layout="intrinsic" />
      <h3>ENTRE EM CONTATO CONOSCO</h3>
      <MediaList />
    </CustomFooter>
  );
};

export default Footer;
