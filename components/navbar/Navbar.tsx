import React from "react";

const NavBar = ({ children }: { children?: React.ReactNode }) => {
  return (
    <nav className="w-24 h-screen sticky bg-white flex flex-col justify-between">
      <div className="w-10 h-10 bg-[]">logo</div>
      <ul>{children}</ul>
      <div>cart</div>
    </nav>
  );
};
export default NavBar;
