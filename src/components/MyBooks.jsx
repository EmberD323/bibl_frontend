import { useOutletContext,useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import CurrentList from "./Partials/CurrentList";

export default function MyBooks (){
    const [token,setToken,edit,setEdit,lists,setLists] = useOutletContext();
    console.log(lists)
    const [selectedList,setSelectedList] = useState(null); 
    if(lists == null) return;


    function handleListOpen(e){
        const listID = e.target.parentNode.id;
        let thisList = lists.filter((list) =>list.id == listID);
        setSelectedList(thisList[0])
    }
    return (
        <div className="myBooks">
            <h2>My Books</h2>
            <h3>Lists</h3>
            <ul>
                {lists.map((list) => {
                    return(
                        <li key={list.id} id ={list.id} >
                            <div className="name" onClick={handleListOpen} style={{cursor:"grab"}}>{list.name} ({list.books.length}) </div>
                        </li>
                    )
                })}
            </ul>
            <CurrentList selectedList={selectedList} setSelectedList={setSelectedList}/>
            
        </div>
        

    )
}


