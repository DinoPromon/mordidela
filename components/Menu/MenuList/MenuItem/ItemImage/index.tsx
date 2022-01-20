import React from "react";
import Image from "next/image";

import { ItemImageContainer } from "./styled";

type Props = {
  src?: string;
  alt: string;
  loading?: "lazy" | "eager";
};

const ItemImage: React.FC<Props> = ({ src, alt, loading }) => {
  return (
    <ItemImageContainer>
      {src && (
        <Image
          src={src}
          alt={alt}
          loading={loading || "lazy"}
          layout="fill"
          objectFit="contain"
          blurDataURL={src}
          placeholder="blur"
        />
      )}
    </ItemImageContainer>
  );
};

export default ItemImage;
