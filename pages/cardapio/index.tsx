import type { GetStaticProps } from "next";
import type { ReactElement } from "react";

import Menu from "@components/Menu";
import { NavBarFooter } from "@components/Layouts";
import { NextPageWithLayout } from "@my-types/next-page";
import { getAllProducts } from "@controllers/products";
import { Product } from "@my-types/product";

type Props = {
  products: Product[];
  error: boolean;
};

const MenuPage: NextPageWithLayout<Props> = (props) => {
  return <Menu products={props.products} />;
};

MenuPage.getLayout = function getLayout(page: ReactElement) {
  return <NavBarFooter>{page}</NavBarFooter>;
};

export const getStaticProps: GetStaticProps = async (context) => {
  let products: Product[] = [];
  let error = false;

  try {
    products = await getAllProducts();
  } catch (e) {
    error = true;
  }

  return {
    props: {
      products: products as Product[],
      error: error,
    },
    revalidate: 600,
  };
};

export default MenuPage;
