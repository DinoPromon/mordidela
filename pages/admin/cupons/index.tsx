import React from "react";
import type { ReactElement } from "react";

import { NavBarAdmin } from "@components/Layouts";
import { NextPageWithLayout } from "@my-types/next-page";
import Admin from "@components/Admin";

const CouponsPage: NextPageWithLayout = () => {
  return <Admin></Admin>;
};

CouponsPage.getLayout = function getLayout(page: ReactElement) {
  return <NavBarAdmin>{page}</NavBarAdmin>;
};

export default CouponsPage;