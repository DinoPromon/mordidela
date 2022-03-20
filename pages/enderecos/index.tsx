import React from "react";
import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";

import { FindAllAddressesByUserId } from "@controllers/address";

const Addresses = dynamic(() => import("@components/UserProfile/Addresses"));
const NavBarFooter = dynamic(() => import("@components/Layouts/NavBarFooter"));

import type { ReactElement } from "react";
import type { GetServerSideProps } from "next";

import type IEndereco from "@models/endereco";
import type { NextPageWithLayout } from "@my-types/next-page";

type Props = {
  addresses: IEndereco[];
};

const GeneralDataPage: NextPageWithLayout<Props> = ({ addresses }) => {
  return <Addresses addresses={addresses}></Addresses>;
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

  const userId = session.user.id_usuario;
  const findAllAddresses = new FindAllAddressesByUserId({ id_usuario: userId, getDeleted: false });
  const addresses = await findAllAddresses.exec();

  return {
    props: {
      session: session,
      addresses,
    },
  };
};

export default GeneralDataPage;
