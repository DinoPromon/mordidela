import { PURPLE, PINK } from "@utils/colors";
import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  padding: 0 1rem;

  @media (max-width: 530px) {
    font-size: 13pt;
  }

  & > span {
    color: ${PINK};
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const BannerContainer = styled.div`
  padding: 1rem;
`;

export const DoubleBannerContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 1rem;
`;
