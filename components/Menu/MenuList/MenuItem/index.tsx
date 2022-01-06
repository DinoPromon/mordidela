import React, { useEffect, useState } from "react";

import ListItem from "./styled";
import ItemImage from "./ItemImage";
import ItemDescription from "./ItemDescription";
import { MenuProduct } from "@models/produto";

type Props = {
  onClick: (item: MenuProduct, img?: string) => void;
  changeModalImage: (id_produto: MenuProduct["id_produto"], img?: string) => void;
  item: MenuProduct;
};

const imgFallback = "/images/fallback.png";

const MenuItem: React.FC<Props> = (props) => {
  const { item, onClick, changeModalImage } = props;
  const [imageSrc, setImageSrc] = useState<string>("");

  const clickHandler = () => {
    if (imageSrc) onClick(item, imageSrc);
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
        if (isMounted) setImageSrc(blob.size > 0 ? url : imgFallback);
      } catch (e) {
        const error = e as Error;
      }
    }
    getImage();
    return () => {
      if (url) URL.revokeObjectURL(url);
      isMounted = false;
    };
  }, [item.id_produto]);

  useEffect(() => {
    changeModalImage(item.id_produto, imageSrc);
  }, [changeModalImage, item.id_produto, imageSrc]);

  return (
    <ListItem onClick={clickHandler}>
      <ItemImage src={imageSrc} alt={`Imagem ilustrativa de ${item.nome}`} />
      <ItemDescription name={`${item.nome} - ${item.tamanho}`} price={item.preco_padrao} />
    </ListItem>
  );
};

export default MenuItem;
