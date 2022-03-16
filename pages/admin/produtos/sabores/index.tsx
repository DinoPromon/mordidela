import React from "react";
import type { ReactElement } from "react";

import { NavBarAdmin } from "@components/Layouts";
import { NextPageWithLayout } from "@my-types/next-page";
import Flavors from "@components/Admin/Flavors";

const ProductsPage: NextPageWithLayout = () => {
  return <Flavors></Flavors>;
};

ProductsPage.getLayout = function getLayout(page: ReactElement) {
  return <NavBarAdmin>{page}</NavBarAdmin>;
};

export default ProductsPage;