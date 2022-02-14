import React, { useEffect, useState } from "react";

import { ItemDescriptionContainer, MenuItemContainer } from "./styled";
import ItemImage from "./ItemImage";
import { transformPriceToString } from "@utils/transformation";

import type { RelatedProduct } from "@models/produto";

type Props = {
  onClick: (item: RelatedProduct) => void;
  item: RelatedProduct;
};

const imgFallback = "/images/fallback.png";
const prefixImg = "/images/products";

const MenuItem: React.FC<Props> = ({ item, onClick }) => {
  const [imageSrc, setImageSrc] = useState(
    item.nome_imagem ? `${prefixImg}/${item.nome_imagem}` : imgFallback
  );

  const menuItemClickHandler = () => {
    if (imageSrc) onClick(item);
  };

  return (
    <MenuItemContainer onClick={menuItemClickHandler}>
      <ItemImage src={imageSrc} alt={`Imagem ilustrativa de ${item.nome}`} />
      <ItemDescriptionContainer>
        {" "}
        {item.tamanho !== null ? (
          <span>
            {item.nome.toLocaleLowerCase()} - {item.tamanho.toLocaleLowerCase()}
          </span>
        ) : (
          <span>{item.nome.toLocaleLowerCase()}</span>
        )}
        <span>R$ {transformPriceToString(item.preco_padrao)}</span>
      </ItemDescriptionContainer>
    </MenuItemContainer>
  );
};

export default MenuItem;
