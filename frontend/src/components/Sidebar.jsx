import { useDispatch, useSelector } from "react-redux";
import { useGetCategoriesQuery } from "../app/features/todo/todoApi";
import { userLoggedOut } from "../app/features/auth/authSlice";
import { addRemoveFilter } from "../app/features/todo/todoSlice";
import { Link } from "react-router-dom";
function SidebarNav() {
  const dispatch = useDispatch();
  const { data } = useGetCategoriesQuery();
  const { user } = useSelector((state) => state.auth);
  const handleLogOut = () => {
    dispatch(userLoggedOut());
    
  };
  const { filterCategory: category } = useSelector((state) => state.todo);
  const handleFilterCat = (item) => {
    dispatch(addRemoveFilter(item));
  };
  return (
    <div className="h-full p-3 space-y-2  text-gray-800">
      <div className="grid grid-cols-3  divide-y divide-gray-300">
        <div className="flex items-center p-2 space-x-4 col-span-2 md:col-span-3 order-1 md:order-1">
          <img
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt=""
            className="w-12 h-12 rounded-full bg-gray-500"
          />
          <div>
            <h2 className="text-sm font-semibold">{user?.name}</h2>
            <span className="flex items-center space-x-1">
              <Link to="/" className="text-xs hover:underline text-gray-600">
                View profile
              </Link>
            </span>
          </div>
        </div>
        <ul className="pt-2 pb-4 space-y-1 text-sm flex justify-center items-center md:flex-col col-span-3 order-3 mt-3 md:mt-0 md:order-2">
          {data?.categories.map((d) => (
            <li key={d.id} className=" text-gray-900">
              <button
                onClick={() => handleFilterCat(d)}
                className={`flex items-center p-2 space-x-3 rounded-md ${
                  category.includes(d.name) &&
                  `bg-${d?.color}-600 bg-opacity-10`
                }`}
              >
                <span
                  className={`w-7 h-7 bg-${d.color}-600 opacity-30 rounded-full`}
                ></span>
                <span>{d.name}</span>
              </button>
            </li>
          ))}
        </ul>
        <ul className="pt-4 pb-2 space-y-1 text-sm col-span-1 md:col-span-1 order-2 md:order-3">
          <li>
            <button
              onClick={() => handleLogOut()}
              className="flex items-center p-2 space-x-3 rounded-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-5 h-5 fill-current text-gray-600"
              >
                <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"></path>
                <rect width="32" height="64" x="256" y="232"></rect>
              </svg>
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SidebarNav;
