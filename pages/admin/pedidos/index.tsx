import React from "react";
import { getSession } from "next-auth/client";
import { SessionValidator } from "@helpers/session";

import Orders from "@components/Admin/Orders";
import { Autorizacao } from "@models/usuario";
import { NavBarAdmin } from "@components/Layouts";
import { NextPageWithLayout } from "@my-types/next-page";

import type { ReactElement } from "react";
import type { GetServerSideProps } from "next";

const OrdersPage: NextPageWithLayout = () => {
  return <Orders />;
};

OrdersPage.getLayout = function getLayout(page: ReactElement) {
  return <NavBarAdmin>{page}</NavBarAdmin>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  try {
    const sessionValidator = new SessionValidator(session);
    sessionValidator.validate({ necessaryAuthorization: Autorizacao.ADMIN });
  } catch (err) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session: session,
    },
  };
};

export default OrdersPage;
