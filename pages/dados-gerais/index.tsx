import React from "react";
import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";

import { FindUserGeneralData } from "@controllers/users";
const NavBarFooter = dynamic(() => import("@components/Layouts/NavBarFooter"));
const GeneralData = dynamic(() => import("@components/UserProfile/GeneralData"));

import type { ReactElement } from "react";
import type { GetServerSideProps } from "next";
import type { NextPageWithLayout } from "@my-types/next-page";

import type { MyUser } from "@my-types/next-auth";
import type { UserGeneralData } from "@models/usuario";

type Props = {
  user: MyUser;
  userGeneralData: UserGeneralData;
};

const GeneralDataPage: NextPageWithLayout<Props> = ({ user, userGeneralData }) => {
  return <GeneralData user={user} userGeneralData={userGeneralData}></GeneralData>;
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

  const findUserGeneralData = new FindUserGeneralData(session.user.id_usuario);
  const userGeneralData = await findUserGeneralData.exec();

  return {
    props: {
      user: session.user as MyUser,
      userGeneralData: userGeneralData,
    },
  };
};

export default GeneralDataPage;
