import AdPagination from '../../components/Pagination/AdPagination'
const Orders = () => {
  const allProducts = [{id:1,title:"Batman",realesed:"12-04-2023",cant:10,total:90.00},{id:1,title:"Batman",realesed:"12-04-2023",cant:10,total:90.00},{id:1,title:"Batman",realesed:"12-04-2023",cant:10,total:90.00},{id:1,title:"Batman",realesed:"12-04-2023",cant:10,total:90.00},{id:1,title:"Batman",realesed:"12-04-2023",cant:10,total:90.00},{id:1,title:"Batman",realesed:"12-04-2023",cant:10,total:90.00},{id:1,title:"Batman",realesed:"12-04-2023",cant:10,total:90.00},{id:1,title:"Batman",realesed:"12-04-2023",cant:10,total:90.00},{id:1,title:"Batman",realesed:"12-04-2023",cant:10,total:90.00},{id:1,title:"Batman",realesed:"12-04-2023",cant:10,total:90.00},]
  return (
    <div className="bg-slate-100">
      <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          {/* <!-- Start coding here --> */}
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            
            {/* <AdHeader ModalCreate={ModalCreate} /> */}
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">Id</th>
                    <th scope="col" className="px-4 py-4">Product name</th>
                    <th scope="col" className="px-4 py-3">Realesed</th>
                    <th scope="col" className="px-4 py-3">Cant</th>
                    <th scope="col" className="px-4 py-3">Total</th>
                    <th scope="col" className="px-4 py-3">
                      <span className="not-sr-only">Status</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allProducts && allProducts.map(({ id, title, realesed, cant, total }) => (
                    <tr key={id} className="border-b dark:border-gray-700">
                      <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{id}</th>
                      <td className="px-4 py-3">{title}</td>
                      <td className="px-4 py-3">{realesed}</td>
                      <td className="px-4 py-3 max-w-[12rem] truncate">{cant}</td>
                      <td className="px-4 py-3">{total}$</td>
                      <td className="px-4 py-3 flex items-center justify-end">
                        {/* <button onClick={() => handleDropDown(id,available)} id={id} data-dropdown-toggle={id} className="inline-flex items-center text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5 dark:hover-bg-gray-800 text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" type="button">
                          <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                          </svg>
                        </button> */}
                        
                        {/* {dropDown[id] && <AdDropDrown id={id} ModalUpdate={ModalUpdate} ModalRead={ModalRead} ModalDelete={ModalDelete} />} */}
                      </td>
                    </tr>
                  )
                  )}
                </tbody>
              </table>
            </div>
            <AdPagination />
          </div>
        </div>
      </section>
    </div>
  )
}
export default Orders