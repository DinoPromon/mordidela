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
          loading="lazy"
          layout="fill"
          objectFit="contain"
          placeholder="empty"
        />
      )}
    </ItemImageContainer>
  );
};

export default ItemImage;
