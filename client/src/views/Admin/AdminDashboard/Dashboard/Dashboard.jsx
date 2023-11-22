// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';

// //import { getClientUsers } from '../../../../redux/actions/userActions'; 
// import { getAdminUsers } from '../../../../redux/actions/index'; 
// //import { getAllProducts } from '../../../../redux/actions/productActions'; 
// //import { getAllCategories } from '../../../../redux/actions/categoryActions';
// //import { getDeleteUsers } from '../../../../redux/actions/userActions';


// export default function Dashboard() {
//   const dispatch = useDispatch();

  
//   const adminCount = useSelector((state) => state.admin.adminUsers.length);


//   useEffect(() => {
  
//     dispatch(getAdminUsers());

//   }, [dispatch]);

//   return (
//     <main>
//         <div>
//           <h3>PANEL DE ADMINISTRADOR</h3>
//         </div>
//         <div>
//           <div>
//             <div>
//               <h3>PRODUCTOS</h3>
              
//             </div>
//             <h1></h1>
//           </div>
//           <div>
//             <div>
              
              
//             </div>
            
//           </div>
          
            
             
              
            
            
//           </div>
//           <div>
//             <div>
//               <h3>ADMINISTRADORES</h3>
              
//             <h1>{adminCount}</h1>
//           </div>
//         </div>
//       </main>
//   );
// }