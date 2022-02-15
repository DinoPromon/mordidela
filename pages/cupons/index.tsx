import React from "react";
import Coupons from "@components/UserProfile/Cupom";
import { getSession } from "next-auth/client";
import { NavBarFooter } from "@components/Layouts";
import { FindManyRelatedUserCouponByUserId } from "@controllers/usuario-cupom";

import type { ReactElement } from "react";
import type { GetServerSideProps } from "next";
import type { MyUser } from "@my-types/next-auth";
import type { RelatedUserCoupon } from "@models/cupom";
import type { NextPageWithLayout } from "@my-types/next-page";

type Props = {
  user: MyUser;
  relatedCoupons: RelatedUserCoupon[];
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
  const findManyRelatedCoupon = new FindManyRelatedUserCouponByUserId(session.user.id_usuario);
  const relatedCoupons = await findManyRelatedCoupon.exec();

  return {
    props: {
      user: session.user as MyUser,
      relatedCoupons,
    },
  };
};

export default GeneralDataPage;
