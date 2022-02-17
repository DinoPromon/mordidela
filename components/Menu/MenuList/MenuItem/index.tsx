import React from "react";

import { ItemDescriptionContainer, MenuItemContainer } from "./styled";
import ItemImage from "./ItemImage";
import { transformPriceToString } from "@utils/transformation";

import type { RelatedProduct } from "@models/produto";

type Props = {
  onClick: (item: RelatedProduct) => void;
  item: RelatedProduct;
};

const MenuItem: React.FC<Props> = ({ item, onClick }) => {
  const imgFallback = "/images/fallback.png";
  const prefixImg = "/images/products";
  const imageSrc = item.nome_imagem ? `${prefixImg}/${item.nome_imagem}` : imgFallback;

  const menuItemClickHandler = () => {
    if (imageSrc) onClick(item);
  };

  function getItemDescription() {
    if (item.tamanho) return `${item.nome} - ${item.tamanho}`;
    return item.nome;
  }

  return (
    <MenuItemContainer onClick={menuItemClickHandler}>
      <ItemImage src={imageSrc} alt={`Imagem ilustrativa de ${item.nome}`} />
      <ItemDescriptionContainer>
        <span>{getItemDescription()}</span>
        <span>R$ {transformPriceToString(item.preco_padrao)}</span>
      </ItemDescriptionContainer>
    </MenuItemContainer>
  );
};

export default MenuItem;
