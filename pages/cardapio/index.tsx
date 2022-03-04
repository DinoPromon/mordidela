import type { GetStaticProps } from "next";
import type { ReactElement } from "react";

import Menu from "@components/Menu";
import { RelatedProduct } from "@models/produto";
import { NavBarFooter } from "@components/Layouts";
import { NextPageWithLayout } from "@my-types/next-page";
import { findManyRelatedProducts } from "@controllers/product";

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
