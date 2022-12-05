import Loader from "components/Loader";
import { CancelModal } from "components/modal";
import EditSvg from "public/images/edit.svg";
import { useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { ListDataExpanded } from "types/prisma.types";
import { updateList } from "utils/api-helpers";
import { fetcher } from "utils/helpers";
import { getActiveListKey, getListKey } from "utils/swr-keys";
import FadeInOut from "../../FadeInOut";
import AddItem from "./AddItem";
import ItemsList from "./ItemsList";
import NameInput from "./NameInput";

const ShoppingList = () => {
  const actvieListKey = getActiveListKey({ expand: true });
  const { data: list, error } = useSWR<ListDataExpanded>(actvieListKey, fetcher);
  const { mutate } = useSWRConfig();
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  if (error) {
    return <div>failed to load</div>;
  }

  return (
    <div className="w-full min-h-screen m-0 p-0 flex flex-col hide-scroll">
      {!list ? (
        <div className="h-screen">
          <Loader height="h-24" width="w-24"></Loader>
        </div>
      ) : (
        <>
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
          <div className="w-full h-28 px-10 py-8 bg-white mb-0 mt-auto relative">
            <FadeInOut
              show={!isEditing}
              className={`absolute w-5/6 inset-x-10 inset-y-1  bottom-0 right-0 
              flex justify-center items-center ${!isEditing ? "" : "translate-y-full duration-200 ease-in"} `}
            >
              <div className="btn-group">
                <button onClick={() => setShowModal(true)} className="btn bg-gray5 text-dark2">
                  Cancel
                </button>
                <button
                  onClick={async () =>
                    await mutate(
                      actvieListKey,
                      updateList(getListKey(list.id), {
                        status: "COMPLETED"
                      })
                    )
                  }
                  className="btn bg-blue1 text-white"
                >
                  Complete
                </button>
              </div>
            </FadeInOut>
            <FadeInOut
              show={isEditing}
              className={`absolute w-5/6 inset-x-10 inset-y-1  bottom-0 right-0
               flex justify-center items-center ${isEditing ? "" : "translate-y-full duration-200 ease-in"}`}
            >
              <NameInput
                disabled={list.listItems.length == 0}
                value={list.name}
                onSave={async (newName: string) => {
                  await mutate(
                    actvieListKey,
                    updateList(getListKey(list.id), {
                      name: newName
                    })
                  );
                  setIsEditing(false);
                }}
              ></NameInput>
            </FadeInOut>
          </div>

          <CancelModal
            isOpen={showModal}
            setIsOpen={setShowModal}
            onSubmit={async () =>
              await mutate(
                actvieListKey,
                updateList(getListKey(list.id), {
                  status: "CANCELED"
                })
              )
            }
          ></CancelModal>
        </>
      )}
    </div>
  );
};

export default ShoppingList;
