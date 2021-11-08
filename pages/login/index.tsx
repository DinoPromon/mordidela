import type { ReactElement } from "react";

import Login from "@components/Login";
import { Center } from "@components/Layouts";
import { NextPageWithLayout } from "@my-types/next-page";

const LoginPage: NextPageWithLayout = () => {
  return <Login />;
};

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <Center>{page}</Center>;
};

export default LoginPage;
