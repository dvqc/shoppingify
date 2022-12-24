import { AuthGuard } from "components/auth";
import { HeadLayout, NavBarLayout, SideBarLayout } from "components/layouts";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import "../styles/index.css";

const App = ({ Component, pageProps }: AppProps) => {
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
