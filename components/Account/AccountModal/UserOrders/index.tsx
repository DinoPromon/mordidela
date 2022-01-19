import React, { Fragment, useEffect, useState } from "react";

import OrdersList from "./OrdersList";
import { RequestState } from "@my-types/request";
import { FormRequestStatus } from "@components/shared";

const UserOrders: React.FC = (props) => {
  const [request, setRequest] = useState<RequestState>({ error: "", isLoading: true, success: false });

  async function getUserOrders() {
    try {
      const response = await fetch(`/api/order`);
      const result = await response.json();
      setRequest({ error: "", success: true, isLoading: false });
    } catch (e) {
      const error = e as Error;
      console.log(error);
      setRequest({ error: error.message, success: false, isLoading: false });
    }
  }

  useEffect(() => {
    getUserOrders();
  }, []);

  return request.success ? (
    <OrdersList />
  ) : (
    <FormRequestStatus errorMessage={request.error} isLoading={request.isLoading} />
  );
};

export default UserOrders;
