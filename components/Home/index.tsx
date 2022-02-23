import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  HomeContainer,
  HomeMenuTitle,
  HomeTitle,
  DoubleBannerContainer,
  BannerContainer,
} from "./styled";
import banner_home from "public/images/banner_home.png";
import banner_01 from "public/images/banner_01.jpg";
import banner_02 from "public/images/banner_02.jpg";
import banner_03 from "public/images/banner_03.png";

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <HomeTitle>Bem vindo à Mordidela!</HomeTitle>
      <BannerContainer>
        <Image src={banner_home} width={820} height={312} className="teste" />
      </BannerContainer>
      <HomeMenuTitle>
        Visite nosso{" "}
        <Link href={"/cardapio"}>
          <span>cardápio</span>
        </Link>{" "}
        e faça seu pedido!
      </HomeMenuTitle>
      <DoubleBannerContainer>
        <Image src={banner_01} width={443} height={620.25} className="teste" />
        <Image src={banner_02} width={443} height={620.25} className="teste" />
      </DoubleBannerContainer>
      <HomeMenuTitle>
        Quanto mais pedidos fizer em nosso site, mais cupons serão disponibilizados para você!
      </HomeMenuTitle>
      <BannerContainer>
        <Image src={banner_03} width={960} height={537} className="teste" />
      </BannerContainer>
    </HomeContainer>
  );
};

export default Home;
