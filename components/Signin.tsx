import { signIn } from "next-auth/react";
import Image from "next/image";

const Signin = () => {
  return (
    <div className="m-0 p-0 h-screen w-screen flex justify-center items-center bg-white">
      <div
        className="m-0 p-10 md:w-96 md:h-3/4 w-full h-full flex flex-col justify-between items-center
       bg-gradient-to-tr to-orange-50 from-orange-100 border[1px] border-0 rounded-xl absolute shadow-xl  "
      >
        <h1 className="w-full text-2xl font-medium text-dark1">
          <span className="text-yellow1 font-bold">Shoppingify&nbsp;</span>
          allows you to take your shopping list wherever you go
        </h1>
        <Image src="/images/shopping.svg" width={300} height={600} layout="fixed" />
        <button
          className="btn h-16 w-28  text-white font-bold text-lg transition-all bg-yellow1"
          onClick={() => signIn()}
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default Signin;
