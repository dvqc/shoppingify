import { AuthGuard } from "components/auth";
import { HeadLayout, NavBarLayout, SideBarLayout } from "components/layouts";
import { Session } from "next-auth";
import { SessionProvider, SessionProviderProps } from "next-auth/react";
import { AppProps } from "next/app";
import "../styles/index.css";


const App = ({ Component, pageProps }: AppProps<{session: Session}>) => {
  return (
    <HeadLayout>
      <SessionProvider session={pageProps.session}>
        <AuthGuard>
          <NavBarLayout>
            <SideBarLayout>
              <Component {...pageProps} />
            </SideBarLayout>
          </NavBarLayout>
        </AuthGuard>
      </SessionProvider>
    </HeadLayout>
  );
};

export default App;
