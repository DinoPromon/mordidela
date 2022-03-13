import React from "react";
import Coupons from "@components/UserProfile/Coupons";
import { getSession } from "next-auth/client";
import { NavBarFooter } from "@components/Layouts";
import { FindManyRelatedUserCouponByUserId } from "@controllers/userCoupon";

import type { ReactElement } from "react";
import type { GetServerSideProps } from "next";
import type { RelatedUserCoupon } from "@models/cupom";
import type { NextPageWithLayout } from "@my-types/next-page";

type Props = {
  relatedCoupons: RelatedUserCoupon[];
};

const GeneralDataPage: NextPageWithLayout<Props> = (props) => {
  const { relatedCoupons } = props;
  return <Coupons relatedCoupons={relatedCoupons} />;
};

GeneralDataPage.getLayout = function getLayout(page: ReactElement) {
  return <NavBarFooter>{page}</NavBarFooter>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
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
      relatedCoupons,
    },
  };
};

export default GeneralDataPage;
