import type { GetStaticProps } from "next";
import type { ReactElement } from "react";

import Sabor from "@models/sabor";
import Menu from "@components/Menu";
import Adicional from "@models/adicional";
import Categoria from "@models/categoria";
import Produto, { MenuProduct } from "@models/produto";
import { NavBarFooter } from "@components/Layouts";
import { getAllProduto } from "@controllers/produto";
import { NextPageWithLayout } from "@my-types/next-page";
import { getAllRelatedAdds } from "@controllers/adicional";
import { getAllRelatedFlavors } from "@controllers/sabor";
import { ViewCategoriaAdicional, ViewProdutoSabor } from "@models/views";

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
    const adds: Adicional[] = [];
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
    const flavors: Sabor[] = [];
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
    const products = await getAllProduto();
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
