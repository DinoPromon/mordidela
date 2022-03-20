import React from "react";
import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";

const NavBarFooter = dynamic(() => import("../../components/Layouts/NavBarFooter"));
const Orders = dynamic(() => import("../../components/UserProfile/Orders"));

import type { ReactElement } from "react";
import type { GetServerSideProps } from "next";

import type { NextPageWithLayout } from "@my-types/next-page";

const OrdersPage: NextPageWithLayout = () => {
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
      session,
    },
  };
};

export default OrdersPage;
