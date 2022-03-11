import React from "react";
import { AboutInformation, AboutInformationTitle, MordidelaInformations } from "./styled";
import {
  DoubleBannerContainer,
  HomeContainer,
  HomeMenuTitle,
  HomeTitle,
  DoubleBanner,
} from "@components/Home/styled";

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
        <DoubleBanner src="/images/image0.jpeg" alt="Primeira imagem dentro do estabelecimento"/>
        <DoubleBanner src="/images/image2.jpeg" alt="Segunda imagem dentro do estabelecimento"/>
      </DoubleBannerContainer>
    </HomeContainer>
  );
};

export default About;
