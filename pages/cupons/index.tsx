import React from "react";
import type { ReactElement } from "react";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { MyUser } from "@my-types/next-auth";
import { NavBarFooter } from "@components/Layouts";
import Coupons from "@components/UserProfile/Cupom";
import { RelatedUserCupomReq } from "@models/cupom";
import { NextPageWithLayout } from "@my-types/next-page";
import { findCupomRelationsById } from "@controllers/usuario-cupom";

type Props = {
  user: MyUser;
  relatedCoupons: RelatedUserCupomReq;
};

const GeneralDataPage: NextPageWithLayout<Props> = (props) => {
  const { relatedCoupons, user } = props;
  return <Coupons relatedCoupons={relatedCoupons} user={user} />;
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

  const relatedCoupons = await findCupomRelationsById(session.user.id_usuario);

  return {
    props: {
      user: session.user as MyUser,
      relatedCoupons,
    },
  };
};

export default GeneralDataPage;
