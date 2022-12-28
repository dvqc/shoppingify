import { NavBar, NavItem } from "components/navbar";
import { signOut } from "next-auth/react";
import HistorySvg from "public/images/history.svg";
import ItemsSvg from "public/images/items.svg";
import LogoutSvg from "public/images/logout.svg";
import StatsSvg from "public/images/stats.svg";

const NavBarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar>
        <NavItem link="/items" text="items" svg={<ItemsSvg />}></NavItem>
        <NavItem link="/history" text="history" svg={<HistorySvg />}></NavItem>
        <NavItem link="#" text="statistics" svg={<StatsSvg />}></NavItem>
        <NavItem link="#" text="logout" svg={<LogoutSvg />} onClick={() => signOut()}></NavItem>
      </NavBar>
      {children}
    </>
  );
};

export default NavBarLayout;
