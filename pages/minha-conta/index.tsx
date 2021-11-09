import type { ReactElement } from "react";
import { NavBarFooter } from "@components/Layouts";
import { NextPageWithLayout } from "@my-types/next-page";
import Account from "@components/Account";

const AccountPage: NextPageWithLayout = () => {
  return (
    <Account/>
  );
};

AccountPage.getLayout = function getLayout(page: ReactElement) {
  return <NavBarFooter>{page}</NavBarFooter>;
};

export default AccountPage;
