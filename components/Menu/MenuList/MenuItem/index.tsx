import React from "react";

import { transformPriceToString } from "@utils/transformation";

import ItemImage from "./ItemImage";
import { ItemDescriptionContainer, MenuItemContainer } from "./styled";

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
    <MenuItemContainer
      onClick={menuItemClickHandler}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.06 }}
      transition={{ duration: 0.25 }}
    >
      <ItemImage src={imageSrc} alt={`Imagem ilustrativa de ${item.nome}`} />
      <ItemDescriptionContainer>
        <span>{getItemDescription()}</span>
        <span>R$ {transformPriceToString(item.preco_padrao)}</span>
      </ItemDescriptionContainer>
    </MenuItemContainer>
  );
};

export default MenuItem;
