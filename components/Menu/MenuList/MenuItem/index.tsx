import React, { useEffect, useState } from "react";

import { ItemDescriptionContainer, MenuItemContainer } from "./styled";
import ItemImage from "./ItemImage";
import { transformPriceToString } from "@utils/transformation";

import type { RelatedProduct } from "@models/produto";

type Props = {
  onClick: (item: RelatedProduct, img?: string) => void;
  changeModalImage: (id_produto: RelatedProduct["id_produto"], img?: string) => void;
  item: RelatedProduct;
};

const imgFallback = "/images/fallback.png";
const prefixImg = "/images/products";

const MenuItem: React.FC<Props> = (props) => {
  const { item, onClick, changeModalImage } = props;
  const [imageSrc, setImageSrc] = useState(
    item.nome_imagem ? `${prefixImg}/${item.nome_imagem}` : imgFallback
  );

  console.log(item.nome_imagem);

  const menuItemClickHandler = () => {
    if (imageSrc) onClick(item, imageSrc);
  };

  useEffect(() => {
    changeModalImage(item.id_produto, imageSrc);
  }, [changeModalImage, item.id_produto, imageSrc]);

  return (
    <MenuItemContainer onClick={menuItemClickHandler}>
      <ItemImage src={imageSrc} alt={`Imagem ilustrativa de ${item.nome}`} />
      <ItemDescriptionContainer>
        <span>{item.nome.toLocaleLowerCase()}</span>
        <span>R$ {transformPriceToString(item.preco_padrao)}</span>
      </ItemDescriptionContainer>

      {/* <ItemDescription name={`${item.nome} - ${item.tamanho}`} price={item.preco_padrao} /> */}
    </MenuItemContainer>
  );
};

export default MenuItem;
