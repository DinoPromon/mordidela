import { Provider as SessionProvider } from "next-auth/client";
import { theme } from "@utils/theme";
import { CartContextProvider } from "@store/cart";
import { ThemeProvider } from "@material-ui/core/styles";

import type { AppPropsWithLayout } from "@my-types/next-page";

import "./global-style.css";

function MyApp({ Component, pageProps, router }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <ThemeProvider theme={theme}>
      <CartContextProvider>
        <SessionProvider session={pageProps.session}>
          {getLayout(<Component {...pageProps} key={router.route} />)}
        </SessionProvider>
      </CartContextProvider>
    </ThemeProvider>
  );
}

export default MyApp;
