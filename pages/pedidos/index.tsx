import React from "react";
import type { ReactElement } from "react";

import Orders from "@components/Orders";
import { NavBarFooter } from "@components/Layouts";
import { NextPageWithLayout } from "@my-types/next-page";

type Props = {

}

const OrdersPage: NextPageWithLayout<Props> = (props) => {
  return <Orders></Orders>;
};

OrdersPage.getLayout = function getLayout(page: ReactElement) {
  return <NavBarFooter>{page}</NavBarFooter>;
};

export default OrdersPage;