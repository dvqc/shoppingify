import Loader from "components/Loader";
import { CancelModal } from "components/modal";
import { useActiveListExpanded } from "hooks/queries";
import EditSvg from "public/images/edit.svg";
import { useEffect, useState } from "react";
import { useSWRConfig } from "swr";
import { updateActiveList } from "utils/fetch-helpers";
import { HttpException } from "utils/helpers";
import { getActiveListKey } from "utils/swr-keys";
import FadeInOut from "../../FadeInOut";
import AddItem from "./AddItem";
import Complete from "./Complete";
import EmptyList from "./EmptyList";
import ItemsList from "./ItemsList";
import NameInput from "./NameInput";

const ShoppingList = () => {
  const { data: list, error, mutate } = useActiveListExpanded();
  const apiError: HttpException = error?.message;

  const { cache } = useSWRConfig();

  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    !list ? setIsEditing(true) : setIsEditing(false);
  }, [list]);

  if (apiError && apiError?.statusCode != 404) {
    return <div>Failed to load</div>;
  }

  return (
    <div className="w-full min-h-screen m-0 p-0 flex flex-col ">
      {
        <>
          {apiError?.statusCode == 404 ? (
            <div className="w-full m-0 px-10 pt-8 grow flex flex-col">
              <AddItem></AddItem>
              <EmptyList></EmptyList>
            </div>
          ) : !list ? (
            <div className="h-screen">
              <Loader height="h-24" width="w-24"></Loader>
            </div>
          ) : (
            <div className="w-full m-0 px-10 pt-8 grow">
              <AddItem></AddItem>
              <div className="m-0 p-0 w-full">
                <div className="w-full flex flex-row justify-between items-center ">
                  <h2 className="my-10 text-2xl font-bold text-dark2">{list.name}</h2>
                  <button className="w-6 h-6" onClick={() => setIsEditing(!isEditing)}>
                    <EditSvg
                      className="w-full h-full hover:fill-blue-400 ease-in duration-200"
                      viewBox=" 0 0 48 48"
                    ></EditSvg>
                  </button>
                </div>
                <ItemsList list={list} isEditing={isEditing}></ItemsList>
              </div>
            </div>
          )}
          <div className="w-full h-28 px-10 py-8 bg-white mb-0 mt-auto relative">
            <FadeInOut
              show={!isEditing}
              className={`absolute w-5/6 inset-x-10 inset-y-1  bottom-0 right-0 
              flex justify-center items-center ${!isEditing ? "" : "translate-y-full duration-200 ease-in"} `}
            >
              <Complete
                onComplete={
                  list
                    ? async () => {
                        await mutate(
                          updateActiveList({
                            status: "COMPLETED"
                          })
                        );
                        cache.delete(getActiveListKey(true));
                      }
                    : () => {}
                }
                onCancel={() => setShowModal(true)}
              ></Complete>
            </FadeInOut>
            <FadeInOut
              show={isEditing}
              className={`absolute w-5/6 inset-x-10 inset-y-1  bottom-0 right-0
               flex justify-center items-center ${isEditing ? "" : "translate-y-full duration-200 ease-in"}`}
            >
              <NameInput
                disabled={!list || list.listItems?.length == 0}
                value={list?.name ?? ""}
                onSave={
                  list
                    ? async (newName: string) => {
                        await mutate(
                          updateActiveList({
                            name: newName
                          })
                        );
                        setIsEditing(false);
                      }
                    : async (newName: string) => {}
                }
              ></NameInput>
            </FadeInOut>
          </div>
          <CancelModal
            isOpen={showModal}
            setIsOpen={setShowModal}
            onSubmit={
              list
                ? async () => {
                    await mutate(
                      updateActiveList({
                        status: "CANCELED"
                      })
                    );
                    cache.delete(getActiveListKey(true));
                  }
                : () => {}
            }
          ></CancelModal>
        </>
      }
    </div>
  );
};

export default ShoppingList;
