import { NextPage } from "next";
import { useRouter } from "next/router";

const ListHistory: NextPage = () => {
  const router = useRouter();
  const id = router.query["id"];
  return <div className="grow">{id}</div>;
};

export default ListHistory;
