import React from "react";

import { FiltersContainer, OrdersFilter } from "../Orders/styled";

import {
  AllProductsContainer,
  AllProductsTitle,
  ImageContainer,
  AllProductsData,
  Highlight,
  AllProductsDataContainer,
} from "./styled";

import { CardContainer, CardButtonContainer, Card } from "@components/shared/OrdersCard";

import Button from "@material-ui/core/Button";

const AllProducts: React.FC = () => {
  return (
    <AllProductsContainer>
      <FiltersContainer>
        <OrdersFilter>Produtos disponíveis</OrdersFilter>
        <OrdersFilter>Produtos indisponíveis</OrdersFilter>
      </FiltersContainer>
      <CardContainer>
        <Card>
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
          <CardButtonContainer>
            <Button variant="outlined" color="primary" size="small">
              Visualizar produto
            </Button>
          </CardButtonContainer>
          <CardButtonContainer>
            <Button variant="contained" color="primary" size="small">
              Tornar indisponível
            </Button>
            <Button variant="contained" color="secondary" size="small">
              Editar
            </Button>
          </CardButtonContainer>
        </Card>

        <Card>
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
          <CardButtonContainer>
            <Button variant="outlined" color="primary" size="small">
              Visualizar produto
            </Button>
          </CardButtonContainer>

          <CardButtonContainer>
            <Button variant="contained" color="primary" size="small">
              Tornar disponível
            </Button>
            <Button variant="contained" color="secondary" size="small">
              Editar
            </Button>
          </CardButtonContainer>
        </Card>
      </CardContainer>
    </AllProductsContainer>
  );
};

export default AllProducts;
