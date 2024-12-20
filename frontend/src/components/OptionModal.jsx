import { useSelector } from "react-redux";
import { useDeleteTodoMutation } from "../app/features/todo/todoApi";
import EditModal from "./EditModal";

// eslint-disable-next-line react/prop-types
const OptionModal = ({ showModal, setShowModal, show, setShow }) => {
  const { user } = useSelector((state) => state.auth);
  const [deleteTodo, { data, isLoading, isError }] = useDeleteTodoMutation();
  const { editTodo: selectedTodo } = useSelector((state) => state.todo);
  const { editedTodo } = selectedTodo || {};
  const handleDelete = () => {
    deleteTodo({ id: editedTodo?._id, email: user?.email });
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="absolute right-1 top-4 z-50">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full  bg-white outline-none focus:outline-none ">
              <div
                onClick={(e) => {
                  // do not close modal if anything inside modal content is clicked
                  e.stopPropagation();
                }}
                className="py-4 px-3 h-28 flex flex-col justify-around z-50"
              >
                <button
                  className="hover:bg-gray-100 px-4 py-1 rounded"
                  type="button"
                  onClick={() => {
                    setShow(true);
                  }}
                >
                  Edit ...
                </button>
                <hr className="bg-black-800 border-b[4px] w-full" />
                <button
                  className="hover:bg-gray-100 px-4 py-1 rounded"
                  type="button"
                  onClick={() => {
                    handleDelete();
                    setShowModal(false);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
            <div
              onClick={() => setShowModal(false)}
              className="opacity-0 fixed inset-0 z-40 bg-black"
            ></div>
          </div>
          <EditModal show={show} setShow={setShow} />
        </>
      ) : null}
    </>
  );
};

export default OptionModal;
