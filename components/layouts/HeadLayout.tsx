import Head from "next/head";

const HeadLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>Shoppingify</title>
        <link rel="shortcut icon" href="/favicon.png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {children}
    </>
  );
};

export default HeadLayout;
