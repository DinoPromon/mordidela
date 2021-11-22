import React, { useEffect, useState } from "react";

// import Batata from "@images/caixa-batata.png";
import Item from "./styled";
import ItemImage from "./ItemImage";
import ItemDescription from "./ItemDescription";
import image from "next/image";

type Props = {
  onClick: (id: string, image: string) => void;
  id_produto: string;
  nome: string;
};

const MenuItem: React.FC<Props> = (props) => {
  const [imageSrc, setImageSrc] = useState("/images/logo.svg");

  const clickHandler = () => {
    props.onClick(props.id_produto, imageSrc);
  };

  const getImage = async () => {
    const response = await fetch(`/api/products/image/${props.id_produto}`, {
      method: "GET",
      headers: {
        "Content-Type": "text",
      },
    });
    const base64Image = await response.text();
    const url = `data:image/png;base64,${base64Image}`;
    if (base64Image) setImageSrc(url);
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <Item onClick={clickHandler}>
      {imageSrc && <ItemImage src={imageSrc} alt={`Imagem ilustrativa de ${props.nome}`} />}
      <ItemDescription nome={props.nome} />
    </Item>
  );
};

export default MenuItem;
