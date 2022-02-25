import React from "react";
import Image from "next/image";
import { AboutInformation, AboutInformationTitle, MordidelaInformations } from "./styled";
import {
  DoubleBannerContainer,
  HomeContainer,
  HomeMenuTitle,
  HomeTitle,
} from "@components/Home/styled";
import image0 from "public/images/image0.jpeg";
import image2 from "public/images/image2.jpeg";

const About: React.FC = () => {
  return (
    <HomeContainer>
      <HomeTitle>Restaurante Mordidela</HomeTitle>
      <AboutInformation>
        <MordidelaInformations>
          <AboutInformationTitle>Endereço</AboutInformationTitle>
          <p>Rua Francisco Scarpari, 507</p>
          <p>Centro - Goioerê/PR</p>
        </MordidelaInformations>
        <MordidelaInformations>
          <AboutInformationTitle>Horário de funcionamento</AboutInformationTitle>
          <p>Segunda-feira: fechado</p>
          <p>Terça-feira: 11:30 - 15:00 | 18:00 - 21:50</p>
          <p>Quarta-feira: 11:30 - 15:00 | 18:00 - 21:50</p>
          <p>Quinta-feira: 11:30 - 15:00 | 18:00 - 21:50</p>
          <p>Sexta-feira: 11:30 - 15:00 | 18:00 - 21:50</p>
          <p>Sábado: 11:30 - 15:00 | 18:00 - 21:50</p>
          <p>Domingo: 16:00 - 21:50</p>
        </MordidelaInformations>
      </AboutInformation>
      <HomeMenuTitle>Visite nosso espaço físico!</HomeMenuTitle>
      <DoubleBannerContainer>
        <Image src={image0} width={443} height={620.25}/>
        <Image src={image2} width={443} height={620.25}/>
      </DoubleBannerContainer>
    </HomeContainer>
  );
};

export default About;
