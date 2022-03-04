import { PURPLE, PINK } from "@utils/colors";
import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 2rem;
`;

export const HomeTitle = styled.h1`
  color: ${PURPLE};
  padding: 1rem;
  font-size: 40pt;

  @media (max-width: 685px) {
    font-size: 30pt;
  }

  @media (max-width: 525px) {
    font-size: 25pt;
  }

  @media (max-width: 440px) {
    font-size: 22pt;
  }
`;

export const HomeMenuTitle = styled.h2`
  color: ${PURPLE};
  padding: 1rem;

  @media (max-width: 530px) {
    font-size: 13pt;
  }

  & > span {
    color: ${PINK};
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const BannerInitial = styled.div`
  position: relative;
  width: 820px;
  height: 312px;
  border-radius: 10px;
  overflow: hidden;
  padding: 1rem;
`;

export const DoubleBannerContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
`;

export const DoubleBanner = styled(BannerInitial)`
  width: 443px;
  height: 620.25px;
`;

export const BannerFinal = styled(BannerInitial)`
  width: 960px;
  height: 537px;
`;
