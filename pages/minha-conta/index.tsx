import type { ReactElement } from "react";
import type { GetServerSideProps } from 'next';
import { getSession, useSession } from "next-auth/client";

import { NavBarFooter } from "@components/Layouts";
import { NextPageWithLayout } from "@my-types/next-page";
import Account from "@components/Account";

type Props = {
  email: string;
}

const AccountPage: NextPageWithLayout = (props) => {
  const [session, loading] = useSession();
  return <Account />;
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
      session
    },
  };
};

export default AccountPage;
