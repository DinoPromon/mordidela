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
        <Image
          src={props.src}
          alt={props.alt}
          loading="lazy"
          layout="fill"
          objectFit="scale-down"
          placeholder="empty"
        />
    </Wrapper>
  );
};

export default ItemImage;
