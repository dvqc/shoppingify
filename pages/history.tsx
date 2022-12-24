import { AuthGuard } from "components/auth";
import { NavBarLayout, SideBarLayout } from "components/layouts";
import { NextPage } from "next";

const History: NextPage = () => {
  return (
    <AuthGuard>
      <NavBarLayout>
        <SideBarLayout>
          <main className="grow px-20 bg-gray5">History</main>
        </SideBarLayout>
      </NavBarLayout>
    </AuthGuard>
  );
};

export default History;
