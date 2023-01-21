import { AuthGuard } from "components/auth";
import { ErrMsg, Error } from "components/errors";
import { HeadLayout, NavBarLayout, SideBarLayout } from "components/layouts";
import { ErrorContext } from "contexts";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { useState } from "react";
import "../styles/index.css";

const App = ({ Component, pageProps }: AppProps<{ session: Session }>) => {
  const [error, setError] = useState("");

  return (
    <HeadLayout>
      <SessionProvider session={pageProps.session}>
        <ErrorContext.Provider value={{ error, setError }}>
          <AuthGuard>
            <NavBarLayout>
              <SideBarLayout>
                {error && error.length > 0 ? (
                  <div className="fixed top-5 left-1/2 -translate-x-1/2  md:w-72 w-1/2 z-50">
                    <ErrMsg errMessage={error} onHide={() => setError("")}></ErrMsg>
                  </div>
                ) : (
                  <></>
                )}
                <Component {...pageProps} />
              </SideBarLayout>
            </NavBarLayout>
          </AuthGuard>
        </ErrorContext.Provider>
      </SessionProvider>
    </HeadLayout>
  );
};

export default App;
