import React from "react";
import {
  OrdersCard,
  OrdersCardContainer,
  ButtonContainer,
} from "../Orders/OrdersGeneralDataList/styled";
import { FiltersContainer, OrdersFilter } from "../Orders/styled";
import {
  AllProductsContainer,
  AllProductsTitle,
  ImageContainer,
  AllProductsData,
  Highlight,
  AllProductsDataContainer,
  AllProductsAvailability,
} from "./styled";
import { Button } from "@material-ui/core";

const AllProducts: React.FC = () => {
  return (
    <AllProductsContainer>
      <FiltersContainer>
        <OrdersFilter>Produtos disponíveis (32)</OrdersFilter>
        <OrdersFilter>Produtos indisponíveis (5)</OrdersFilter>
        <OrdersFilter>Cadastrar/editar produtos</OrdersFilter>
      </FiltersContainer>
      <OrdersCardContainer>
        <OrdersCard>
          <AllProductsTitle>Mini Salgados - 40 Unidades</AllProductsTitle>
          <ImageContainer>
            <p>imagem</p>
            <p>imagem</p>
            <p>imagem</p>
            <p>imagem</p>
          </ImageContainer>
          <AllProductsDataContainer>
            <AllProductsData>
              <Highlight>Valor:</Highlight>R$ 20,90
            </AllProductsData>
            <AllProductsData>
              <Highlight>Categoria:</Highlight>Mini salgados
            </AllProductsData>
          </AllProductsDataContainer>
          <ButtonContainer>
            <Button variant="outlined" color="primary" size="small">
              Visualizar produto
            </Button>
          </ButtonContainer>
          <ButtonContainer>
            <Button variant="contained" color="primary" size="small">
              Tornar indisponível
            </Button>
            <Button variant="contained" color="secondary" size="small">
              Editar
            </Button>
          </ButtonContainer>
        </OrdersCard>

        <OrdersCard>
          <AllProductsTitle>Mini Salgados - 40 Unidades</AllProductsTitle>
          <ImageContainer>
            <p>imagem</p>
            <p>imagem</p>
            <p>imagem</p>
            <p>imagem</p>
          </ImageContainer>
          <AllProductsDataContainer>
            <AllProductsData>
              <Highlight>Valor:</Highlight>R$ 20,90
            </AllProductsData>
            <AllProductsData>
              <Highlight>Categoria:</Highlight>Mini salgados
            </AllProductsData>
          </AllProductsDataContainer>
          <ButtonContainer>
            <Button variant="outlined" color="primary" size="small">
              Visualizar produto
            </Button>
          </ButtonContainer>

          <ButtonContainer>
            <Button variant="contained" color="primary" size="small">
              Tornar disponível
            </Button>
            <Button variant="contained" color="secondary" size="small">
              Editar
            </Button>
          </ButtonContainer>
        </OrdersCard>
      </OrdersCardContainer>
    </AllProductsContainer>
  );
};

export default AllProducts;
