import Signin from "components/Signin";
import { useSession } from "next-auth/react";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const user = session?.user;

  if (status == "loading")
    return (
      <div className="w-screen h-screen bg-yellow1 flex items-center justify-center">
        <img src="/images/cart.svg" className="w-14 h-14 animate-glide"></img>
      </div>
    );

  if (user == undefined || status == "unauthenticated") {
    return <Signin></Signin>;
  }

  return <>{children}</>;
};
export default AuthGuard;
