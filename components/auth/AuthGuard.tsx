import Loader from "components/Loader";
import Signin from "components/Signin";
import { useSession } from "next-auth/react";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const user = session?.user;

  if (status == "loading") return <Loader height="h-24" width="w-24" />;

  if (user == undefined || status == "unauthenticated") {
    return <Signin></Signin>;
  }

  return <>{children}</>;
};
export default AuthGuard;
