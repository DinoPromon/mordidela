import { useState } from "react";

type RequestOptions = {
  method: "POST" | "GET" | "PUT" | "DELETE";
  body: string;
  headers: {
    [key: string]: string;
  };
};

const useRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [requestSuccess, setRequestSuccess] = useState(false);

  const sendRequest = async (url: string, options?: RequestOptions) => {
    setIsLoading(true);
    try {
      const response = await fetch(url, options);
      const result = await response.json();

      if (!response.ok) throw new Error(result.message);

      setRequestSuccess(true);
      return result;
    } catch (e) {
      const error = e as Error;
      setRequestSuccess(false);
      setError(error.message);
    }
    setIsLoading(false);
  };

  return { isLoading, error, requestSuccess, sendRequest };
};

export default useRequest;
