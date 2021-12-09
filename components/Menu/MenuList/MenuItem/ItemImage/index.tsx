import React from "react";
import Image from "next/image";

import Wrapper from "./styled";

type Props = {
  src?: string;
  alt: string;
  loading?: "lazy" | "eager";
};

const ItemImage: React.FC<Props> = ({ src, alt, loading }) => {
  return (
    <Wrapper>
      {src && (
        <Image
          src={src}
          alt={alt}
          loading={loading || "lazy"}
          layout="fill"
          objectFit="scale-down"
          blurDataURL={src}
          placeholder="blur"
        />
      )}
    </Wrapper>
  );
};

export default ItemImage;
