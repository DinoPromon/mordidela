import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage } from "@fortawesome/free-solid-svg-icons";

import Wrapper from "./styled";


type Props = {
  src: string;
  alt: string;
  loading?: "lazy" | "eager";
};

const ItemImage: React.FC<Props> = (props) => {
  return (
    <Wrapper>
      <Image src={props.src} alt={props.alt} loading="lazy" width={240} height={240}/>
    </Wrapper>
  );
};

export default ItemImage;
