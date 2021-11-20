// import { getSession } from "next-auth/client";
// import { useEffect } from "react";
import type { GetStaticProps } from "next";
import type { ReactElement } from "react";
import { NavBarFooter } from "@components/Layouts";
import Home from "@components/Home";
// import Head from 'next/head'

import { NextPageWithLayout } from "@my-types/next-page";

const HomePage: NextPageWithLayout = () => {
  return(
    <Home/>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <NavBarFooter>{page}</NavBarFooter>;
};

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {},
  };
};

export default HomePage;
