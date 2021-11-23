import React, { useEffect, useState } from "react";

// import Batata from "@images/caixa-batata.png";
import Item from "./styled";
import ItemImage from "./ItemImage";
import ItemDescription from "./ItemDescription";

type Props = {
  onClick: (id: string, image: string) => void;
  changeModalImage: (id: string, img: string) => void;
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
    if (base64Image) {
      setImageSrc(url);
    }
  };

  useEffect(() => {
    getImage();
    if (imageSrc !== "/images/logo.svg") props.changeModalImage(props.id_produto, imageSrc);
  }, [imageSrc]);

  return (
    <Item onClick={clickHandler}>
      <ItemImage src={imageSrc} alt={`Imagem ilustrativa de ${props.nome}`} />
      <ItemDescription nome={props.nome} />
    </Item>
  );
};

export default MenuItem;
