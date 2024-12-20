import SidebarNav from "../components/Sidebar";
import Header from "../components/Header";
import Todo from "../components/Todo";

const Dashboard = () => {
  return (
    <div className="grid md:place-items-center h-screen lg:px-10">
      <div className=" max-w-6xl  lg:h-[700px] bg-white p-2   lg:border-[3px] md:border-gray-600/[.4] rounded-3xl w-full">
        <Header />

        <div className="grid grid-cols-12 mt-16">
          <div className="md:col-span-2 col-span-12 ">
            <SidebarNav />
          </div>
          <div className="col-span-12 md:col-span-10 mx-5">
            <Todo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
