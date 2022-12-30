import { AuthGuard } from "components/auth";
import { HeadLayout, NavBarLayout, SideBarLayout } from "components/layouts";
import { SessionProvider, SessionProviderProps } from "next-auth/react";
import { AppProps } from "next/app";
import "../styles/index.css";

type AppPropsWithAuth = AppProps & {
  pageProps: SessionProviderProps;
};

const App = ({ Component, pageProps }: AppPropsWithAuth) => {
  return (
    <SessionProvider session={pageProps.session}>
      <HeadLayout>
        <AuthGuard>
          <NavBarLayout>
            <SideBarLayout>
              <Component {...pageProps} />
            </SideBarLayout>
          </NavBarLayout>
        </AuthGuard>
      </HeadLayout>
    </SessionProvider>
  );
};

export default App;
