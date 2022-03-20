import React from "react";
import dynamic from "next/dynamic";
import type { ReactElement } from "react";

const About = dynamic(() => import("@components/About"));
const NavBarFooter = dynamic(() => import("@components/Layouts/NavBarFooter"));

import type { NextPageWithLayout } from "@my-types/next-page";

const AboutPage: NextPageWithLayout = () => {
  return <About></About>;
};

AboutPage.getLayout = function getLayout(page: ReactElement) {
  return <NavBarFooter>{page}</NavBarFooter>;
};

export default AboutPage;
