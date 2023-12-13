import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { FaStoreAlt, FaBoxes, FaUsers } from "react-icons/fa";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { CiLogout } from "react-icons/ci";
import { useState } from "react";

const SideBar = () => {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={`duration-400 relative h-screen bg-dark-purple p-5 pt-8 ease-in-out ${
        open ? "w-72" : "w-20"
      }`}
    >
      <BiArrowBack
        className={`absolute  -right-3 top-9 cursor-pointer rounded-full border border-dark-purple bg-white text-2xl text-dark-purple ${
          !open && "rotate-180"
        }`}
        onClick={() => setOpen(!open)}
      />

      <Link to={"/admin1"}>
        <div className="mb-5 flex items-center rounded-md text-white hover:bg-light-white">
          <FaStoreAlt className={`text-3xl  ${!open && "text-5xl"} ml-1`} />
          <h1
            className={`ml-5 origin-left text-2xl font-medium text-white ${
              !open && "hidden"
            }`}
          >
            e-Geek Store
          </h1>
        </div>
      </Link>

      <ul className="pt-2">
        <Link to={"products"}>
          <li
            className={
              "mb-5 mt-2 flex cursor-pointer items-center gap-x-4 rounded-md p-2 text-sm text-gray-300 hover:bg-light-white"
            }
          >
            <span className="float-left block text-3xl text-white">
              <FaBoxes />
            </span>
            <span
              className={`flex-1 text-base font-medium  ${!open && "hidden"}`}
            >
              Products
            </span>
          </li>
        </Link>

        <Link to={"orders"}>
          <li
            className={
              "mb-5 mt-2 flex cursor-pointer items-center gap-x-4 rounded-md p-2 text-sm text-gray-300 hover:bg-light-white"
            }
          >
            <span className="float-left block text-3xl text-white">
              <BiPurchaseTagAlt />
            </span>
            <span
              className={`flex-1 text-base font-medium  ${!open && "hidden"}`}
            >
              Orders
            </span>
          </li>
        </Link>

        <Link to={"users"}>
          <li
            className={
              "mb-5 mt-2 flex cursor-pointer items-center gap-x-4 rounded-md p-2 text-sm text-gray-300 hover:bg-light-white"
            }
          >
            <span className="float-left block text-3xl text-white">
              <FaUsers className={""} />
            </span>
            <span
              className={`flex-1 text-base font-medium  ${!open && "hidden"}`}
            >
              Users
            </span>
          </li>
        </Link>

        <Link>
          <li
            className={
              "mb-5 mt-2 flex cursor-pointer items-center gap-x-4 rounded-md p-2 text-sm text-gray-300 hover:bg-light-white"
            }
          >
            <span className="float-left block text-3xl text-white">
              <CiLogout className={""} />
            </span>
            <span
              className={`flex-1 text-base font-medium  ${!open && "hidden"}`}
            >
              Log Out
            </span>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default SideBar;
