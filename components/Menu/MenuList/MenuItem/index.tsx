import React, { useEffect, useState } from "react";

import ListItem from "./styled";
import ItemImage from "./ItemImage";
import ItemDescription from "./ItemDescription";
import { MenuProduct } from "@models/produto";

type Props = {
  onClick: (item: MenuProduct, image: string) => void;
  changeModalImage: (id_produto: MenuProduct["id_produto"], img: string) => void;
  item: MenuProduct;
};

const imageFallback = "/images/fallback.png";

const MenuItem: React.FC<Props> = (props) => {
  const { item } = props;
  const [imageSrc, setImageSrc] = useState(imageFallback);

  const clickHandler = () => {
    props.onClick(item, imageSrc);
  };

  useEffect(() => {
    let isMounted = true;
    let url: string;
    async function getImage() {
      try {
        const response = await fetch(`/api/products/image/${item.id_produto}`, {
          method: "GET",
          headers: {
            "Content-Type": "blob",
          },
        });
        const blob = await response.blob();
        url = URL.createObjectURL(blob);
        if (blob) isMounted && blob.size && setImageSrc(url);
      } catch (e) {
        const error = e as Error;
      }
    }
    getImage();
    return () => {
      if(url) URL.revokeObjectURL(url);
      isMounted = false;
    };
  }, [item.id_produto]);

  useEffect(() => {
    props.changeModalImage(item.id_produto, imageSrc);
  }, [imageSrc]);

  return (
    <ListItem onClick={clickHandler}>
      <ItemImage src={imageSrc} alt={`Imagem ilustrativa de ${item.nome}`} />
      <ItemDescription name={`${item.nome} - ${item.tamanho}`} price={item.preco_padrao} />
    </ListItem>
  );
};

export default MenuItem;
