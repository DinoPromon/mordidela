import { AppPropsWithLayout } from "@my-types/next-page";
import { CartContextProvider } from "@store/cart";

import './global-style.css';

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return <CartContextProvider>{getLayout(<Component {...pageProps} />)}</CartContextProvider>;
}

export default MyApp;
