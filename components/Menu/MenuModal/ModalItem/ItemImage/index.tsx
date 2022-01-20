import React from "react";
import Image from "next/image";

import { ItemImageContainer } from "./styled";

type Props = {
  src: string;
  alt: string;
};

const ItemImage: React.FC<Props> = (props) => {
  return (
    <ItemImageContainer>
      <Image
        src={props.src}
        alt={props.alt}
        loading="lazy"
        layout="fill"
        objectFit="scale-down"
        placeholder="empty"
      />
    </ItemImageContainer>
  );
};

export default ItemImage;
