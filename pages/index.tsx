import Loader from "components/Loader";
import Signin from "components/Signin";
import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const user = session?.user;

  if (status == "loading") return <Loader />;

  if (user == undefined || status == "unauthenticated") {
    return <Signin></Signin>;
  }

  return (
    <div>
      welcome {user?.name}
      <button className="btn" onClick={() => signOut()}>
        signout
      </button>
    </div>
  );
};

export default Home;
