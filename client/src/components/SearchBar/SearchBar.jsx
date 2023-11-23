import { useState } from "react"
import Data from "./Data.json"


export default function SearchBar(){
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const onSearch = (searchTerm) => {
    setValue(searchTerm)
    console.log("search ", searchTerm)
  }

  return(
    <div>
      <h1>SEARCHBAR</h1>
        <div>
          <div>
            <input type="text" value={value} onChange={onChange} />
            <button onClick={() => onSearch(value)}> Search</button>
          </div>
          <div>
            {Data.filter(item => {
              const searchTerm = value.toLowerCase()
              const tit =item.title.toLowerCase()

              return searchTerm && tit.startsWith(searchTerm) && tit !== searchTerm  

            })
            .slice(0,2)
            .map( (item) => (
            <div
            onClick={() => onSearch(item.title)}
            key={item.title}
            >
              {item.title}
            </div>
            ))}
          </div>
        </div>
    </div>
  )
}