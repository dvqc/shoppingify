import { signIn } from "next-auth/react";

const Signin = () => {
  return (
    <div className="m-0 p-0 h-screen flex justify-center items-center">
      <div
        className="m-0 p-5 w-96 h-40 flex flex-col justify-between items-center
       bg-gray-200 border[1px] border-0 rounded-xl absolute shadow-sm  "
      >
        <h1 className="mb-4 text-2xl font-medium text-slate-900">
          Please sign in to continue
        </h1>
        <button
          className="btn min-h-[2rem] w-20 text-slate-900 transition-all hover:bg-slate-400"
          onClick={() => signIn()}
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default Signin;
