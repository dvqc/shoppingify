import { Error, Unauthorized } from "components/errors";
import NotFound from "components/errors/NotFound";
import Loader from "components/Loader";
import { useList } from "hooks/queries";
import { NextPage } from "next";
import { useRouter } from "next/router";

const ListHistory: NextPage = () => {
  const router = useRouter();
  const id = router.query["id"];

  if (!id || id instanceof Array) return <NotFound />;
  const { data: list, error } = useList(id);

  if (error) {
    if (error.message.statusCode == "401") return <Unauthorized />;
    if (error.message.statusCode == "404") return <NotFound />;
    return <Error errMsg={error.message.message} />;
  }

  if (!list) return <Loader classname="mt-16" />;

  return <div className="grow">{list?.name}</div>;
};

export default ListHistory;
