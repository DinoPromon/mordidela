import { useState } from "react";

import type { RequestState } from "@my-types/request";

const useRequestState = (initialStatus?: RequestState) => {
  const [requestStatus, setRequestStatus] = useState<RequestState>(
    initialStatus ? initialStatus : { error: "", isLoading: false }
  );

  function changeRequestStatus(status: Partial<RequestState>) {
    setRequestStatus((prevState) => ({ ...prevState, ...status }));
  }

  return { requestStatus, changeRequestStatus };
};

export default useRequestState;
