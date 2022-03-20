import React from "react";
import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";

const Login = dynamic(() => import("@components/Login"));
const Center = dynamic(() => import("@components/Layouts/Center"));

import type { ReactElement } from "react";
import type { GetServerSideProps } from "next";

import { NextPageWithLayout } from "@my-types/next-page";

const LoginPage: NextPageWithLayout = (props) => {
  return <Login />;
};

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <Center>{page}</Center>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default LoginPage;
