import React from "react";
import Image from "next/image";

import CustomFigure from "./styled";
import Logo from "public/images/fallback.png";

const MordidelaLogoWithLabel = () => {
  return (
    <CustomFigure>
      <div>
        <Image src={Logo} alt="Logo do mordidela" width={130} height={85}/>
      </div>
      <figcaption>MORDIDELA</figcaption>
    </CustomFigure>
  );
};

export default MordidelaLogoWithLabel;
