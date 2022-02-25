import React from "react";
import type { ReactElement } from "react";

import { NavBarFooter } from "@components/Layouts";
import { NextPageWithLayout } from "@my-types/next-page";
import About from "@components/About";


const AboutPage: NextPageWithLayout = () => {
  return <About></About>;
};

AboutPage.getLayout = function getLayout(page: ReactElement) {
  return <NavBarFooter>{page}</NavBarFooter>;
};

export default AboutPage;
