import type { ReactElement } from "react";

import Signup from "@components/Signup";
import { Center } from "@components/Layouts";
import { NextPageWithLayout } from "@my-types/next-page";

const SignupPage: NextPageWithLayout = () => {
  return <Signup />;
};

SignupPage.getLayout = function getLayout(page: ReactElement) {
  return <Center>{page}</Center>;
};

export default SignupPage;
