import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { FaStoreAlt, FaBoxes, FaUsers } from "react-icons/fa";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { CiLogout } from "react-icons/ci";
import { useState } from "react";

const SideBar = ({handleProduct,handleOrder,handleUser}) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex bg-slate-100">
      <div className={`relative duration-400 ease-in-out bg-dark-purple h-screen p-5 pt-8 ${open ? "w-72" : "w-20"}`}>
        <BiArrowBack className={`bg-white  rounded-full absolute -right-3 top-9 text-dark-purple text-2xl border border-dark-purple cursor-pointer ${!open && "rotate-180"}`} onClick={() => setOpen(!open)} />

          <Link>
        <div className="flex items-center text-white rounded-md hover:bg-light-white mb-5">
          <FaStoreAlt className={`text-3xl  ${!open && "text-5xl"} ml-1`} />
          <h1 className={`origin-left font-medium text-white text-2xl ml-5 ${!open && "hidden"}`}>
            e-Geek Store
          </h1>
        </div>
          </Link>

        <ul className="pt-2">
          <Link>
            <li onClick={handleProduct} className={"text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2 mb-5"}>
              <span className="block float-left text-3xl text-white">
                <FaBoxes />
              </span>
              <span className={`text-base font-medium flex-1  ${!open && "hidden"}`}>Products</span>
            </li>
          </Link>

          <Link>
            <li onClick={handleOrder} className={"text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2 mb-5"}>
              <span className="block float-left text-white text-3xl">
                <BiPurchaseTagAlt />
              </span>
              <span className={`text-base font-medium flex-1  ${!open && "hidden"}`}>Orders</span>
            </li>
          </Link>

          <Link>
            <li onClick={handleUser} className={"text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2 mb-5"}>
              <span className="block float-left text-3xl text-white">
                <FaUsers className={""} />
              </span>
              <span className={`text-base font-medium flex-1  ${!open && "hidden"}`}>Users</span>
            </li>
          </Link>

          <Link>
            <li className={"text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2 mb-5"}>
              <span className="block float-left text-3xl text-white">
                <CiLogout className={""} />
              </span>
              <span className={`text-base font-medium flex-1  ${!open && "hidden"}`}>Log Out</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
