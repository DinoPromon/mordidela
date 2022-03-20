import React from "react";
import Link from "next/link";
import {
  HomeContainer,
  HomeMenuTitle,
  HomeTitle,
  DoubleBannerContainer,
  BannerInitial,
  DoubleBanner,
  BannerFinal,
  HomeMenuTitleHighlight,
} from "./styled";

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <HomeTitle>Bem vindo ao Mordidela!</HomeTitle>
      <BannerInitial src="/images/banner_home.png" />
      <HomeMenuTitle>
        Visite nosso{" "}
        <Link passHref href={"/cardapio"}>
          <HomeMenuTitleHighlight>cardápio</HomeMenuTitleHighlight>
        </Link>{" "}
        e faça seu pedido!
      </HomeMenuTitle>
      <DoubleBannerContainer>
        <DoubleBanner src="/images/banner_01.jpg" />
        <DoubleBanner src="/images/banner_02.jpg" />
      </DoubleBannerContainer>
      <HomeMenuTitle>
        Quanto mais pedidos fizer em nosso site, mais cupons serão disponibilizados para você!
      </HomeMenuTitle>
      <BannerFinal src="/images/banner_03.png" />
    </HomeContainer>
  );
};

export default Home;
