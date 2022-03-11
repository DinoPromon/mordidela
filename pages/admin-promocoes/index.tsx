import React from "react";
import type { ReactElement } from "react";

import { NavBarAdmin } from "@components/Layouts";
import { NextPageWithLayout } from "@my-types/next-page";
import Promotions from "@components/Admin/Promotions";


const PromotionsPage: NextPageWithLayout = () => {
  return <Promotions></Promotions>;
};

PromotionsPage.getLayout = function getLayout(page: ReactElement) {
  return <NavBarAdmin>{page}</NavBarAdmin>;
};

export default PromotionsPage;