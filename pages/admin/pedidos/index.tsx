import React from "react";
import type { ReactElement } from "react";

import { NavBarAdmin } from "@components/Layouts";
import { NextPageWithLayout } from "@my-types/next-page";
import Orders from "@components/Admin/Orders";

const OrdersPage: NextPageWithLayout = () => {
  return <Orders></Orders>;
};

OrdersPage.getLayout = function getLayout(page: ReactElement) {
  return <NavBarAdmin>{page}</NavBarAdmin>;
};

export default OrdersPage;