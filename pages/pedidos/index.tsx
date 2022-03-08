import React from "react";
import dynamic from "next/dynamic";
import { FindAllOrderRelationsByUserId } from "@controllers/order";

const NavBarFooter = dynamic(() => import("../../components/Layouts/NavBarFooter"));
const Orders = dynamic(() => import("../../components/UserProfile/Orders"));
import { NextPageWithLayout } from "@my-types/next-page";

import { getSession } from "next-auth/client";

import type { ReactElement } from "react";
import type { GetServerSideProps } from "next";
import type { MyUser } from "@my-types/next-auth";
import type { IOrderRelations } from "@models/pedido";

type Props = {
  user: MyUser;
  ordersRelations: IOrderRelations[];
};

const OrdersPage: NextPageWithLayout<Props> = ({ user, ordersRelations }) => {
  return <Orders ordersRelations={ordersRelations}></Orders>;
};

OrdersPage.getLayout = function getLayout(page: ReactElement) {
  return <NavBarFooter>{page}</NavBarFooter>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  try {
    const findAllOrderRelations = new FindAllOrderRelationsByUserId(session.user.id_usuario);
    const ordersRelations = await findAllOrderRelations.exec();

    return {
      props: {
        session,
        ordersRelations,
      },
    };
  } catch (err) {
    return {
      props: {
        session,
        redirect: {
          detinations: "/",
          permanent: false,
        },
      },
    };
  }
};

export default OrdersPage;
