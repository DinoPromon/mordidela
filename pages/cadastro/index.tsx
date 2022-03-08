import dynamic from "next/dynamic";

const Signup = dynamic(() => import("../../components/Signup"));
const Center = dynamic(() => import("../../components/Layouts/Center"));

import type { ReactElement } from "react";
import type { NextPageWithLayout } from "@my-types/next-page";

const SignupPage: NextPageWithLayout = () => {
  return <Signup />;
};

SignupPage.getLayout = function getLayout(page: ReactElement) {
  return <Center>{page}</Center>;
};

export default SignupPage;
