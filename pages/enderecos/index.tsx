import React from "react";
import type { ReactElement } from "react";

import { NavBarFooter } from "@components/Layouts";
import { NextPageWithLayout } from "@my-types/next-page";

import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import Addresses from "@components/Addresses";
import { MyUser } from "@my-types/next-auth";

type Props = {
  user: MyUser;
};

const GeneralDataPage: NextPageWithLayout<Props> = (props) => {
  const { nome, id_usuario } = props.user;
  return <Addresses></Addresses>;
};

GeneralDataPage.getLayout = function getLayout(page: ReactElement) {
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

export default GeneralDataPage;
