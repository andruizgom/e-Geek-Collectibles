// SearchBar.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, fetchProducts } from '../../redux/actions/index';

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.searchTerm);
  const products = useSelector((state) => state.products);

  const onChange = (event) => {
    dispatch(setSearchTerm(event.target.value));
  };

  const onSearch = () => {
    dispatch(fetchProducts(searchTerm));
  };

  return (
    <div>
      <h1>SEARCHBAR</h1>
      <div>
        <input type="text" value={searchTerm} onChange={onChange} />
        <button onClick={onSearch}>Search</button>
      </div>
      <div>
        {products.slice(0, 1).map((item) => (
          <div onClick={() => dispatch(setSearchTerm(item.title))} key={item.title}>
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;










// import { useState } from "react"
// import Data from "./Data.json"


// export default function SearchBar(){
//   const [value, setValue] = useState('')

//   const onChange = (event) => {
//     setValue(event.target.value)
//   }

//   const onSearch = (searchTerm) => {
//     setValue(searchTerm)
//     console.log("search ", searchTerm)
//   }

//   return(
//     <div>
//       <h1>SEARCHBAR</h1>
//         <div>
//           <div>
//             <input type="text" value={value} onChange={onChange} />
//             <button onClick={() => onSearch(value)}> Search</button>
//           </div>
//           <div>
//             {Data.filter(item => {
//               const searchTerm = value.toLowerCase()
//               const tit =item.title.toLowerCase()

//               return searchTerm && tit.startsWith(searchTerm) && tit !== searchTerm  

//             })
//             .slice(0,2)
//             .map( (item) => (
//             <div
//             onClick={() => onSearch(item.title)}
//             key={item.title}
//             >
//               {item.title}
//             </div>
//             ))}
//           </div>
//         </div>
//     </div>
//   )
// }