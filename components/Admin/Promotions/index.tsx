import { Button } from "@material-ui/core";
import React from "react";
import {
  PromotionsContainer,
  PromotionsTitle,
  PromotionsType,
  PromotionsTypeTitle,
  PromotionsCard,
  PromotionsCardContainer,
  PromotionsCardTitle,
  PromotionsCardContent,
  ButtonContainer,
  PromotionsCardContentContainer,
} from "./styled";

const Promotions: React.FC = () => {
  return (
    <PromotionsContainer>
      <PromotionsTitle>Promoções</PromotionsTitle>
      <PromotionsType>
        <PromotionsTypeTitle>Ativas</PromotionsTypeTitle>
        <PromotionsTypeTitle>Encerradas</PromotionsTypeTitle>
      </PromotionsType>
      <PromotionsCardContainer>
        <PromotionsCard>
          <PromotionsCardTitle>10% de desconto</PromotionsCardTitle>
          <PromotionsCardContent>
            Produto: <span>Mini salgados - 100 unidades</span>
          </PromotionsCardContent>
          <PromotionsCardContent>
            Data de início: <span>10/03/2022 20:00</span>
          </PromotionsCardContent>
          <PromotionsCardContent>
            Data de término: <span>11/03/2021 23:59</span>
          </PromotionsCardContent>
        </PromotionsCard>
        <PromotionsCard>
          <PromotionsCardTitle>10% de desconto</PromotionsCardTitle>
          <PromotionsCardContentContainer>
            <PromotionsCardContent>
              Categoria: <span>Pratos executivos</span>
            </PromotionsCardContent>
            <PromotionsCardContent>
              Data de início: <span>10/03/2022 20:00</span>
            </PromotionsCardContent>
            <PromotionsCardContent>
              Data de término: <span>11/03/2021 23:59</span>
            </PromotionsCardContent>
          </PromotionsCardContentContainer>
          <ButtonContainer>
            <Button variant="contained" color="secondary">
              Encerrar
            </Button>
          </ButtonContainer>
        </PromotionsCard>
        <PromotionsCard>
          <PromotionsCardTitle>10% de desconto</PromotionsCardTitle>
        </PromotionsCard>
        <PromotionsCard>
          <PromotionsCardTitle>10% de desconto</PromotionsCardTitle>
        </PromotionsCard>
        <PromotionsCard>
          <PromotionsCardTitle>10% de desconto</PromotionsCardTitle>
        </PromotionsCard>
      </PromotionsCardContainer>
    </PromotionsContainer>
  );
};

export default Promotions;
