import dynamic from "next/dynamic";

import { findManyRelatedProducts } from "@controllers/product";

const Menu = dynamic(() => import("@components/Menu"));
const NavBarFooter = dynamic(() => import("@components/Layouts/NavBarFooter"));

import type { ReactElement } from "react";
import type { GetStaticProps } from "next";
import type { NextPageWithLayout } from "@my-types/next-page";

import type { RelatedProduct } from "@models/produto";

type Props = {
  products: RelatedProduct[];
  error: boolean;
};

const MenuPage: NextPageWithLayout<Props> = ({ products, error }) => {
  return <Menu products={products} error={error} />;
};

MenuPage.getLayout = function getLayout(page: ReactElement) {
  return <NavBarFooter>{page}</NavBarFooter>;
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const products = await findManyRelatedProducts();

    return {
      props: {
        products: products,
        error: false,
      },
      revalidate: 600,
    };
  } catch (e) {
    const error = e as Error;

    return {
      props: {
        products: [],
        error: true,
      },
    };
  }
};

export default MenuPage;
