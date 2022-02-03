import React from "react";
import type { ReactElement } from "react";

import Orders from "@components/UserProfile/Orders";
import { NavBarFooter } from "@components/Layouts";
import { NextPageWithLayout } from "@my-types/next-page";

import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { MyUser } from "@my-types/next-auth";

type Props = {
  user: MyUser;
};

const OrdersPage: NextPageWithLayout<Props> = (props) => {
  const { nome, id_usuario } = props.user;
  return <Orders></Orders>;
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

  return {
    props: {
      user: session.user as MyUser,
    },
  };
};

export default OrdersPage;
