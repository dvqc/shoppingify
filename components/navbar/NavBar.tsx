import React from "react";
import Cart from "./Cart";
import Logo from "./Logo";

const NavBar = ({ children }: { children?: React.ReactNode }) => {
  return (
    <nav className="w-24 py-6 h-screen sticky bg-white flex flex-col justify-between">
      <Logo />
      <ul className="flex flex-col justify-between h-1/3">{children}</ul>
      <Cart />
    </nav>
  );
};
export default NavBar;
