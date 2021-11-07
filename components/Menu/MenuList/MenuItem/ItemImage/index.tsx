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
      <Image src={props.src} alt={props.alt} width={400} height={400} layout="responsive" />
    </Wrapper>
  );
};

export default ItemImage;
