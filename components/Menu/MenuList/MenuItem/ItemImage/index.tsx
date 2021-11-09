import React from "react";
import Image from "next/image";

import Wrapper from "./styled";

type Props = {
  src: string;
  alt: string;
  loading?: "lazy" | "eager";
};

const ItemImage: React.FC<Props> = (props) => {
  return (
    <Wrapper>
      <img src={props.src} alt={props.alt} loading="lazy"/>
    </Wrapper>
  );
};

export default ItemImage;
