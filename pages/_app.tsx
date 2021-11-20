import { Fragment } from "react";
import { createGlobalStyle } from "styled-components";

import { AppPropsWithLayout } from "@my-types/next-page";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
    box-sizing: border-box;
    font-size: 1rem;
  }
  
  html, body, #__next {
    min-height: 100vh;
    min-width: 100vw;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #fafafa;
    color: #3b3b3b;
  }

  #__next {
    display: flex;
    flex-direction: column;
  }
`;

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <Fragment>
      <GlobalStyle />
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
