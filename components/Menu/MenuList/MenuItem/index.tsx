import React, { useEffect, useState } from "react";

import ListItem from './styled';
import ItemImage from "./ItemImage";
import ItemDescription from "./ItemDescription";
import { Product } from "@my-types/product";

type Props = {
  onClick: (id: string, image: string) => void;
  changeModalImage: (id: string, img: string) => void;
  item: Product;
};

const MenuItem: React.FC<Props> = (props) => {
  const { item } = props;
  const [imageSrc, setImageSrc] = useState("");

  const clickHandler = () => {
    props.onClick(item.id_produto, imageSrc);
  };

  const getImage = async () => {
    const response = await fetch(`/api/products/image/${item.id_produto}`, {
      method: "GET",
      headers: {
        "Content-Type": "text",
      },
    });
    const base64Image = await response.text();
    const url = `data:image/png;base64,${base64Image}`;
    setImageSrc(base64Image ? url : "/images/fallback.png");
  };

  useEffect(() => {
    getImage();
    if (imageSrc !== "/images/logo.svg") props.changeModalImage(item.id_produto, imageSrc);
  }, [imageSrc]);

  return (
    <ListItem onClick={clickHandler}>
      <ItemImage src={imageSrc} alt={`Imagem ilustrativa de ${item.nome}`} />
      <ItemDescription name={`${item.nome} - ${item.tamanho}`} price={item.preco_padrao} />
    </ListItem>
  );
};

export default MenuItem;
