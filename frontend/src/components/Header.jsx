import Modalview from "./Modal";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { searchTitle } from "../app/features/todo/todoSlice";

const Header = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const handleModal = () => {
    setShow(!show);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      dispatch(searchTitle(searchTerm));
    }, 1500);

    return () => {
      clearTimeout(delayDebounce);
    };
  }, [searchTerm, dispatch]);

  return (
    <header className="p-4 text-gray-800 shadow fixed md:relative -mt-2 md:mt-0 z-50 bg-white w-full">
      <div className="container flex justify-between h-8 mx-auto">
        <h1 className="text-2xl">Todo</h1>
        <div className="flex items-center md:space-x-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <button
                type="submit"
                title="Search"
                className="p-1 focus:outline-none focus:ring"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 512 512"
                  className="w-4 h-4 text-gray-800"
                >
                  <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                </svg>
              </button>
            </span>
            <input
              type="search"
              name="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-44 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none bg-gray-100 text-gray-800 focus:bg-gray-50 mr-2"
            />
          </div>
          <button onClick={handleModal} className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>
      </div>
      <Modalview show={show} setShow={setShow} />
    </header>
  );
};

export default Header;
