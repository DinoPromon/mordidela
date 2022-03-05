import { PURPLE, PINK } from "@utils/colors";
import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1rem 1rem 1rem;
`;

export const HomeTitle = styled.h1`
  color: ${PURPLE};
  padding: 1rem;
  font-size: 40pt;

  @media (max-width: 715px) {
    font-size: 30pt;
  }

  @media (max-width: 555px) {
    font-size: 25pt;
  }

  @media (max-width: 470px) {
    font-size: 22pt;
  }

  @media (max-width: 425px) {
    font-size: 20pt;
  }
`;

export const HomeMenuTitle = styled.h2`
  color: ${PURPLE};
  padding: 1rem;

  @media (max-width: 565px) {
    font-size: 13pt;
  }

  @media (max-width: 425px) {
    font-size: 11pt;
  }

  & > span {
    color: ${PINK};
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const BannerInitial = styled.img`
  border-radius: 10px;
  width: 100%;
  height: 100%;
  max-width: 820px;
  max-height: 312px;
`;

export const DoubleBannerContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;

  @media(max-width: 960px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const DoubleBanner = styled(BannerInitial)`
  max-width: 443px;
  max-height: 620.25px;
`;

export const BannerFinal = styled(BannerInitial)`
  max-width: 960px;
  max-height: 537px;
`;
