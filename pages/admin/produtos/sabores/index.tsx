import React from "react";
import dynamic from "next/dynamic";

const Flavors = dynamic(() => import("@components/Admin/Flavors"));
const NavBarAdmin = dynamic(() => import("@components/Layouts/NavBarAdmin"));

import type { ReactElement } from "react";
import type { NextPageWithLayout } from "@my-types/next-page";

const ProductsPage: NextPageWithLayout = () => {
  return <Flavors></Flavors>;
};

ProductsPage.getLayout = function getLayout(page: ReactElement) {
  return <NavBarAdmin>{page}</NavBarAdmin>;
};

export default ProductsPage;
