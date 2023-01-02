import Head from "next/head";
import { Fragment } from "react";
const HeadLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Fragment>
      <Head>
        <title>Shoppingify</title>
        <link rel="shortcut icon" href="/favicon.png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {children}
    </Fragment>
  );
};

export default HeadLayout;
