import React from "react";
import type { ReactElement } from "react";

import { NavBarAdmin } from "@components/Layouts";
import { NextPageWithLayout } from "@my-types/next-page";
import Additionals from "@components/Admin/Additionals";

const ProductsPage: NextPageWithLayout = () => {
  return <Additionals></Additionals>;
};

ProductsPage.getLayout = function getLayout(page: ReactElement) {
  return <NavBarAdmin>{page}</NavBarAdmin>;
};

export default ProductsPage;
