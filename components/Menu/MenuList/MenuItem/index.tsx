import React, { useEffect, useState } from "react";

import { MenuItemContainer } from "./styled";
import ItemImage from "./ItemImage";
import ItemDescription from "./ItemDescription";
import { RelatedProduct } from "@models/produto";

type Props = {
  onClick: (item: RelatedProduct, img?: string) => void;
  changeModalImage: (id_produto: RelatedProduct["id_produto"], img?: string) => void;
  item: RelatedProduct;
};

const imgFallback = "/images/fallback.png";

const MenuItem: React.FC<Props> = (props) => {
  const { item, onClick, changeModalImage } = props;
  const [imageSrc, setImageSrc] = useState("");

  const menuItemClickHandler = () => {
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
    <MenuItemContainer onClick={menuItemClickHandler}>
      <ItemImage src={imageSrc} alt={`Imagem ilustrativa de ${item.nome}`} />
      <ItemDescription name={`${item.nome} - ${item.tamanho}`} price={item.preco_padrao} />
    </MenuItemContainer>
  );
};

export default MenuItem;
