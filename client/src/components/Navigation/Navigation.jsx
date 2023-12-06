import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dialog, Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import logo from "../../assets/logo.svg";
import Loging from "../../components/Loging/Login";
import Logout from "../../components/Logout/Logout";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";



export default function Navigation() {
  const [open, setOpen] = useState(false);  
  const { isAuthenticated, user } = useAuth0();
  const [isAdminLocal, setIsAdminLocal] = useState(false);

  const checkUserRole = async (email) => {
      const endpoint = `/users/email`;

      try {
          const response = await axios.get(endpoint, { params: { email: email } });
          const data = response.data;
          if (!data) {
              throw new Error('There was no data');
          }
          return data.isAdmin;
      } catch (error) {
          throw new Error(error.message);
      }

  };


  useEffect(() => {
      const checkAuthentication = async () => {
          if (!isAuthenticated) {
              return;
          }

          try {
              const isAdmin = await checkUserRole(user?.email);
              setIsAdminLocal(isAdmin);
          } catch (error) {
              console.error('Error while verifying user role:', error.message);
          }
      };

      checkAuthentication();
  }, [isAuthenticated, user?.email]);
  
  const navigation = {
    pages: [
      { name: "Home", route: "/home" },
      isAuthenticated && isAdminLocal
        ? { name: "Admin Dashboard", route: "/admin" }
        : isAuthenticated
        ? { name: "User Dashboard", route: "/user" }
        : {name: null, route: null},
    ],
  };
  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="mb-4 flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <Link
                        to={page.route}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        {page.name}{" "}
                      </Link>
                    </div>
                  ))}
                </div>
                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    <Link
                      to="/home"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      {isAuthenticated ? <Logout /> : <Loging />}{" "}
                    </Link>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-red-700">
        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="flex h-16 items-center">
            <button
              type="button"
              className="relative rounded-md bg-amber-500 p-2 text-white lg:hidden"
              onClick={() => setOpen(true)}
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            {/* Logo */}
            <div className="ml-4 flex lg:ml-0">
              <Link to="/home">
                <span className="sr-only">e-Geek Store</span>
                <img
                  className="h-8 w-auto"
                  src={logo}
                  alt="e-Geek Store Logo"
                />
              </Link>
            </div>
            {/* Pages */}
            <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
              <div className="flex h-full space-x-8">
                {navigation.pages.map((page) => (
                  <Link
                    key={page.name}
                    to={page.route}
                    className="flex items-center text-sm font-medium text-white hover:text-gray-900"
                  >
                    {page.name}
                  </Link>
                ))}
              </div>
            </Popover.Group>
            {/* Sign in */}
            <div className="ml-auto flex items-center">
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                <Link
                  to="/home"
                  className="text-sm font-medium text-white hover:text-gray-900"
                >
                  {isAuthenticated ? <Logout /> : <Loging />}{" "}
                </Link>
              </div>
              {/* Cart */}
              <div className="ml-4 flow-root lg:ml-6">
                <Link to="/cart" className="group -m-2 flex items-center p-2">
                  <ShoppingBagIcon
                    className="h-6 w-6 flex-shrink-0 text-white group-hover:text-gray-900"
                    aria-hidden="true"
                  />
                  <span className="ml-2 text-sm font-medium text-white group-hover:text-gray-900"></span>
                  <span className="sr-only">items in cart, view bag</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
