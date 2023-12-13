import { useSelector } from "react-redux";
import { useState } from "react";
import AdPagination from "../../components/Pagination/AdPagination";
import Create from "../../components/Modals/Create";
import Update from "../../components/Modals/Update";
import Read from "../../components/Modals/Read";
import Delete from "../../components/Modals/Delete";
import AdHeader from "../../components/Header/AdHeader";
import ProductsTable from "../../components/Tables/ProductsTable";
import Enable from "../../components/Modals/Enable";

const ProductsView = () => {
  const adminProducts = useSelector(({ adminProducts }) => adminProducts);
  const adSearchProducts = useSelector(
    ({ adSearchProducts }) => adSearchProducts,
  );
  const [openModal, setOpenModal] = useState("");
  const handleOpenModal = (modal) => setOpenModal(modal);
  return (
    <>
      <section className="bg-gray-100 p-3 antialiased dark:bg-gray-900 sm:p-5">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
            <AdHeader handleOpenModal={handleOpenModal} />

            <ProductsTable handleOpenModal={handleOpenModal} />

            {adSearchProducts.length === 0 && (
              <AdPagination indexPage={adminProducts} />
            )}
          </div>
        </div>
      </section>

      {openModal === "create" && <Create handleOpenModal={handleOpenModal} />}
      {openModal === "preview" && <Read handleOpenModal={handleOpenModal} />}
      {openModal === "update" && <Update handleOpenModal={handleOpenModal} />}
      {openModal === "delete" && <Delete handleOpenModal={handleOpenModal} />}
      {openModal === "restore" && <Enable handleOpenModal={handleOpenModal} />}
    </>
  );
};
export default ProductsView;
