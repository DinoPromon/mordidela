import { AppPropsWithLayout } from "@my-types/next-page";
import { CartContextProvider } from "@store/cart";
import { theme } from "@utils/theme";
import { ThemeProvider } from "@material-ui/core/styles";

import "./global-style.css";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <ThemeProvider theme={theme}>
      <CartContextProvider>{getLayout(<Component {...pageProps} />)}</CartContextProvider>
    </ThemeProvider>
  );
}

export default MyApp;
