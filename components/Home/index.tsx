import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  HomeContainer,
  HomeMenuTitle,
  HomeTitle,
  DoubleBannerContainer,
  BannerInitial,
  DoubleBanner,
  BannerFinal,
} from "./styled";
import banner_home from "public/images/banner_home.png";
import banner_01 from "public/images/banner_01.jpg";
import banner_02 from "public/images/banner_02.jpg";
import banner_03 from "public/images/banner_03.png";

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <HomeTitle>Bem vindo à Mordidela!</HomeTitle>
      <BannerInitial>
        <Image
          src={banner_home}
          layout="fill"
          objectFit="cover"
          /* width={820} height={312} */
          alt="Banner com a mensagem paixão à primeira mordida"
        />
      </BannerInitial>
      <HomeMenuTitle>
        Visite nosso{" "}
        <Link href={"/cardapio"}>
          <span>cardápio</span>
        </Link>{" "}
        e faça seu pedido!
      </HomeMenuTitle>
      <DoubleBannerContainer>
        <DoubleBanner>
          <Image
            src={banner_01}
            layout="fill"
            objectFit="cover"
            /* width={443} height={620.25} */
            alt="Banner com alguns produtos do cardápio"
          />
        </DoubleBanner>
        <DoubleBanner>
          <Image
            src={banner_02}
            layout="fill"
            objectFit="cover"
            /* width={443} height={620.25} */
            alt="Banner com outros produtos do cardápio"
          />
        </DoubleBanner>
      </DoubleBannerContainer>
      <HomeMenuTitle>
        Quanto mais pedidos fizer em nosso site, mais cupons serão disponibilizados para você!
      </HomeMenuTitle>
      <BannerFinal>
        <Image
          src={banner_03}
          layout="fill"
          objectFit="cover"
          /* width={960} height={537} */
          alt="Banner com imagem de dino burguers e a mensagem amor à primeira mordidela"
        />
      </BannerFinal>
    </HomeContainer>
  );
};

export default Home;
