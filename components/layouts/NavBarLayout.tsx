import { NavBar, NavItem } from "components/navbar";
import { signOut } from "next-auth/react";
import HistorySvg from "public/images/history.svg";
import ItemsSvg from "public/images/items.svg";
import LogoutSvg from "public/images/logout.svg";
import StatsSvg from "public/images/stats.svg";
import { Fragment } from "react";

const NavBarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Fragment>
      <NavBar>
        <NavItem link="/items" svg={<ItemsSvg />}></NavItem>
        <NavItem link="/history" svg={<HistorySvg />}></NavItem>
        <NavItem link="#" svg={<StatsSvg />}></NavItem>
        <NavItem link="#" svg={<LogoutSvg />} onClick={() => signOut()}></NavItem>
      </NavBar>
      {children}
    </Fragment>
  );
};

export default NavBarLayout;
