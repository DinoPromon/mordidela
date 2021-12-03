import React, { Fragment, useEffect, useState } from "react";

import Loading from "@components/shared/Loading";
import { RequestState } from "@my-types/request";

const UserOrders: React.FC = (props) => {
  const [request, setRequest] = useState<RequestState>({ error: "", isLoading: true, success: false });

  async function getUserOrders() {
    try {
      const response = await fetch(`/api/order`);
      const result = await response.json();
      setRequest({ error: "", success: true, isLoading: false });
      console.log(result);
    } catch (e) {
      const error = e as Error;
      console.log(error);
      setRequest({ error: "", success: false, isLoading: false });
    }
  }

  useEffect(() => {
    getUserOrders();
  }, []);
  return (
    <Fragment>
      {request.isLoading && <Loading />}
      {request.success && <p>hello</p>}
    </Fragment>
  );
};

export default UserOrders;
