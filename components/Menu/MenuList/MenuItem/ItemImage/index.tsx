import React from "react";
import Image from "next/image";

import { ItemImageContainer } from "./styled";

type Props = {
  src: string;
  alt: string;
};

const ItemImage: React.FC<Props> = ({ src, alt }) => {
  return (
    <ItemImageContainer>
      {src && (
        <Image
          src={src}
          alt={alt}
          layout="fill"
          objectFit="contain"
        />
      )}
    </ItemImageContainer>
  );
};

export default ItemImage;
