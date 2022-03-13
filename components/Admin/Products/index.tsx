import React from "react";
import CentralizedLoading from "@components/shared/CentralizedLoading"
import { AdminProductsContainer } from "./styled";

const Products: React.FC = () => {
  return (
    <AdminProductsContainer>
      <CentralizedLoading/>
    </AdminProductsContainer>
  );
};

export default Products;