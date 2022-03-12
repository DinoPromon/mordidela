import React from "react";
import type { ReactElement } from "react";

import { getSession } from "next-auth/client";
import Addresses from "@components/UserProfile/Addresses";
import { NavBarFooter } from "@components/Layouts";
import { FindAllAddressesByUserId } from "@controllers/address";

import type IEndereco from "@models/endereco";
import type { GetServerSideProps } from "next";
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
