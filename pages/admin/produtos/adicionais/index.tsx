import React from "react";
import type { ReactElement } from "react";

import { NavBarAdmin } from "@components/Layouts";
import { NextPageWithLayout } from "@my-types/next-page";
import Additional from "@components/Admin/Additional";

const ProductsPage: NextPageWithLayout = () => {
  return <Additional></Additional>;
};

ProductsPage.getLayout = function getLayout(page: ReactElement) {
  return <NavBarAdmin>{page}</NavBarAdmin>;
};

export default ProductsPage;