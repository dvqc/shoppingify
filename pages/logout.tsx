import { NextPage } from "next";
import { signOut } from "next-auth/react";
import Router from "next/router";

const Logout: NextPage = () => {
  signOut();
  Router.push("/");
  return <></>;
};
export default Logout;
