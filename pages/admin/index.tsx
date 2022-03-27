import React from "react";
import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";

import { Autorizacao } from "@models/usuario";
import { SessionValidator } from "@helpers/session";

const Admin = dynamic(() => import("@components/Admin"));
const NavBarAdmin = dynamic(() => import("@components/Layouts/NavBarAdmin"));

import type { ReactElement } from "react";
import type { GetServerSideProps } from "next";
import type { NextPageWithLayout } from "@my-types/next-page";

const HomePage: NextPageWithLayout = () => {
  return <Admin></Admin>;
};

HomePage.getLayout = function getLayout(page: ReactElement) {
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

export default HomePage;
