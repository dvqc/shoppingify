import { HeadLayout } from "components/layouts";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import "../styles/index.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <HeadLayout>
        <Component {...pageProps} />
      </HeadLayout>
    </SessionProvider>
  );
};

export default App;
