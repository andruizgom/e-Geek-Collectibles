import { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { filteredProducts } from "../../redux/actions";

import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Filters({ children }) {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    category: "",
    manufacturer: "",
    sortOrder: "",
    nameOrder: "",
  });

  const filtersData = {
    categories: [
      "All",
      "Comics",
      "Figures",
      "Games",
      "Outfit and Accessories",
      "Statues",
    ],
    manufacturer: [
      "All",
      "20th Century-Fox",
      "Amblin Entertainment",
      "Capcom",
      "Columbia Pictures",
      "DC",
      "Disney",
      "Golden Harvest Limelight Entertainment",
      "Hanna-Barbera",
      "Lucasfilm",
      "Marvel",
      "Metro Goldwyn Mayer",
      "Naughty Dog",
      "Netflix",
      "New Line Cinema",
      "Nickelodeon",
      "Nintendo",
      "Saban",
      "Toei Animation",
      "Universal Pictures",
      "Warner Bros",
    ],
    order: ["None", "A-Z", "Z-A", "Price: Low to High", "Price: High to Low"],
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value === "All" ? "" : value,
    }));
  };

  const handleFilter = () => {
    dispatch(filteredProducts(filters));
  };

  useEffect(() => {
    if (filters.sortOrder === "None") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        sortOrder: "",
      }));
    }

    if (filters.nameOrder === "None") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        nameOrder: "",
      }));
    }
  }, [filters]);

  const renderFilterItem = (item, filterType, isMobile) => (
    <div key={item} className="flex items-center">
      <span
        className={`ml-3 ${
          isMobile
            ? "min-w-0 flex-1 cursor-pointer text-gray-500 hover:text-gray-700"
            : "cursor-pointer text-sm text-gray-600 hover:text-gray-700"
        }`}
        onClick={() => {
          if (!item.current) {
            handleFilterChange(filterType, item);
            handleFilter();
          }
        }}
      >
        {item}
      </span>
    </div>
  );

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
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
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    <Disclosure
                      as="div"
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-700 hover:text-gray-900">
                                Categories
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {filtersData.categories.map((category) =>
                                renderFilterItem(category, "category", true),
                              )}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                    <Disclosure
                      as="div"
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-700 hover:text-gray-900">
                                Manufacturer
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {filtersData.manufacturer.map((manufacturer) =>
                                renderFilterItem(
                                  manufacturer,
                                  "manufacturer",
                                  true,
                                ),
                              )}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-8">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Products
            </h1>
            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {filtersData.order.map((action) => (
                        <Menu.Item key={action}>
                          {({ active }) => (
                            <a
                              className={classNames(
                                action.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-600",
                                active ? "bg-amber-500" : "",
                                "block cursor-pointer px-4 py-2 text-sm",
                              )}
                              onClick={() => {
                                if (
                                  (action === "A-Z" || action === "Z-A") &&
                                  filters.nameOrder !== action
                                ) {
                                  handleFilterChange(
                                    "nameOrder",
                                    action === "A-Z" ? "nameAsc" : "nameDesc",
                                  );
                                  handleFilterChange("sortOrder", "");
                                } else if (
                                  (action === "Price: Low to High" ||
                                    action === "Price: High to Low") &&
                                  filters.sortOrder !== action
                                ) {
                                  handleFilterChange(
                                    "sortOrder",
                                    action === "Price: Low to High"
                                      ? "priceAsc"
                                      : "priceDesc",
                                  );
                                  handleFilterChange("nameOrder", "");
                                } else if (action === "None") {
                                  handleFilterChange("sortOrder", "");
                                  handleFilterChange("nameOrder", "");
                                }
                                handleFilter();
                              }}
                            >
                              {action}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <Disclosure as="div" className="border-b border-gray-200 py-6">
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            Categories
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-4">
                          {filtersData.categories.map((category) =>
                            renderFilterItem(category, "category", false),
                          )}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Disclosure as="div" className="border-b border-gray-200 py-6">
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            Manufacturer
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-4">
                          {filtersData.manufacturer.map((manufacturer) =>
                            renderFilterItem(
                              manufacturer,
                              "manufacturer",
                              false,
                            ),
                          )}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </form>
              {/* Product grid */}
              <div className="lg:col-span-3">{children}</div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
