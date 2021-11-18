import type { ReactElement } from "react";
import type { GetServerSideProps } from "next";
import type { Session } from "next-auth";
import { getSession } from "next-auth/client";

import { NavBarFooter } from "@components/Layouts";
import { NextPageWithLayout } from "@my-types/next-page";
import Account from "@components/Account";

type UserInSession = {
  nome: string,
  id_usuario: string
};

type Props = {
  user: UserInSession
};

const AccountPage: NextPageWithLayout<Props> = (props) => {
  const { nome, id_usuario } = props.user;
  return <Account nome={nome} id_usuario={id_usuario} />;
};

AccountPage.getLayout = function getLayout(page: ReactElement) {
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
      user: session.user as UserInSession,
    },
  };
};

export default AccountPage;
