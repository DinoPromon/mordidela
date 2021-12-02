import type { GetStaticProps } from "next";
import type { ReactElement } from "react";

import Menu from "@components/Menu";
import { NavBarFooter } from "@components/Layouts";
import { NextPageWithLayout } from "@my-types/next-page";
import { getAllProducts } from "@controllers/products";
import { Add, Flavor, MenuProduct } from "@my-types/product";
import { getAllRelatedAdds } from "@controllers/adds";
import Categoria from "@models/categoria";
import { ViewCategoriaAdicional, ViewProdutoSabor } from "@models/views";
import { getAllRelatedFlavors } from "@controllers/flavors";
import Produto from "@models/produto";

type Props = {
  products: MenuProduct[];
  error: boolean;
};

const MenuPage: NextPageWithLayout<Props> = (props) => {
  return <Menu products={props.products} />;
};

MenuPage.getLayout = function getLayout(page: ReactElement) {
  return <NavBarFooter>{page}</NavBarFooter>;
};

export const getStaticProps: GetStaticProps = async (context) => {
  function getCategoryAdds(relatedAdds: ViewCategoriaAdicional[], id: Categoria["id_categoria"]) {
    const adds: Add[] = [];
    for (const i in relatedAdds) {
      if (relatedAdds[i].id_categoria === id) {
        adds.push({
          id_adicional: relatedAdds[i].id_adicional,
          nome: relatedAdds[i].nome,
          preco: relatedAdds[i].preco,
        });
      }
      if (Number(relatedAdds[i].id_categoria) > Number(id)) return adds;
    }
    return adds;
  }

  function getProductFlavors(relatedFlavors: ViewProdutoSabor[], id: Produto["id_produto"]) {
    const flavors: Flavor[] = [];
    for (const i in relatedFlavors) {
      if (relatedFlavors[i].id_produto === id) {
        flavors.push({ id_sabor: relatedFlavors[i].id_sabor, nome: relatedFlavors[i].nome });
      }
      if (Number(relatedFlavors[i].id_produto) > Number(id)) return flavors;
    }
    return flavors;
  }
  let menuProducts: MenuProduct[] = [];
  let error = true;
  try {
    const products = await getAllProducts();
    const adds = await getAllRelatedAdds();
    const flavors = await getAllRelatedFlavors();

    for (const i in products) {
      menuProducts.push({
        ...products[i],
        adds: getCategoryAdds(adds, products[i].id_categoria),
        flavors: getProductFlavors(flavors, products[i].id_produto),
      });
    }
  } catch (e) {
    error = true;
  }
  return {
    props: {
      products: menuProducts,
      error,
    },
    revalidate: 600,
  };
};

export default MenuPage;
