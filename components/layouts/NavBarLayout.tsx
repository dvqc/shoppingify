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
        <NavItem link="/statistics" svg={<StatsSvg />}></NavItem>
        <NavItem link="/logout" svg={<LogoutSvg />}></NavItem>
      </NavBar>
      <div className="pl-24">{children}</div>
    </Fragment>
  );
};

export default NavBarLayout;
