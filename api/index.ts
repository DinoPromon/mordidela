import axios from "axios";

const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 20 * 1000,
  validateStatus: (status) => {
    return status >= 200 && status <= 300;
  },
});

export default Axios;
