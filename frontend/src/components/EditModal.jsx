import { useEffect, useState } from "react";
import {
 
  useEditTodoMutation,
  useGetCategoriesQuery,
} from "../app/features/todo/todoApi";
import { useDispatch, useSelector } from "react-redux";
import {
 
  addRemoveEditedTodoCategory,
} from "../app/features/todo/todoSlice";

// eslint-disable-next-line react/prop-types
const EditModal = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { data: totalCategory } = useGetCategoriesQuery();
  const {
    
    editTodo: selectedTodo,
  } = useSelector((state) => state.todo);
  const { editedTodo, editedTodoCategory } = selectedTodo || {};
  const { data: category } = useGetCategoriesQuery();
  const [editTodo, { data: editTodoresponse,  }] =
    useEditTodoMutation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setTitle(editedTodo?.title);
    setDescription(editedTodo?.description);
  }, [dispatch, editedTodo?.description, editedTodo?.title, editedTodo]);

  const handleEditTodo = () => {
    const finalCat = totalCategory.categories?.filter((item) =>
      editedTodoCategory.includes(item.name)
    );

    const data = {
      title,
      description,
      user: {
        name: user?.name,
        email: user?.email,
      },
      category: finalCat,
    };
    editTodo({ id: editedTodo?._id, data: data });
  };
  useEffect(() => {
    if (editTodoresponse?.status == "success") {
      setShow(false);
    }
  }, [editTodoresponse?.status, setShow]);

  return (
    <>
      {show ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-3xl px-3">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm">
                    <div className="grid grid-cols-6 gap-4 col-span-full ">
                      <div className="col-span-full ">
                        <label
                          htmlFor="website"
                          className=" font-semibold text-xl"
                        >
                          Title
                        </label>
                        <input
                          onChange={(e) => setTitle(e.target.value)}
                          id="website"
                          type="text"
                          value={title}
                          placeholder="add a title"
                          className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-600 text-gray-900  bg-gray-50 mt-2 "
                        />
                      </div>
                      <div className="col-span-full">
                        <label htmlFor="bio" className="text-xl font-semibold">
                          Description
                        </label>
                        <textarea
                          id="bio"
                          onChange={(e) => setDescription(e.target.value)}
                          value={description}
                          placeholder="add a description..."
                          className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-600 text-gray-900  bg-gray-50 mt-2"
                        ></textarea>
                      </div>
                      <div className="col-span-full">
                        <div className="grid grid-cols-3 gap-x-2">
                          {category?.categories?.map((c) => (
                            <button
                              onClick={() =>
                                dispatch(addRemoveEditedTodoCategory(c))
                              }
                              key={c.id}
                              className={`flex items-center justify-center py-2 ${
                                editedTodoCategory.includes(c.name) &&
                                `bg-${c?.color}-600 bg-opacity-10`
                              } space-x-1 md:space-x-2 rounded-md`}
                            >
                              <span
                                className={`w-4 h-4 md:w-7 md:h-7 bg-${c?.color}-600 bg-opacity-40 rounded-full`}
                              ></span>
                              <span>{c.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 ">
                  <button
                    className="background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShow(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-gray-800 text-white px-8 rounded-lg py-2"
                    type="button"
                    onClick={() => handleEditTodo()}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default EditModal;
