import { useOutletContext,useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import CurrentList from "./Partials/CurrentList";
import Errors from "./Partials/Errors";
import { ListDeleteButton } from "./Partials/ListDeleteButton";

export default function MyBooks (){
    const [token,setToken,edit,setEdit,lists,setLists] = useOutletContext();
    if(lists ==null) return

    const currentlyReading = (lists.filter((list) =>list.name == "Currently reading"))[0];
    const [selectedList,setSelectedList] = useState(currentlyReading); 
    const [name,setName] = useState(""); 
    const [errors,setErrors] = useState(null)




    function handleListOpen(e){
        const listID = e.target.parentNode.id;
        let thisList = lists.filter((list) =>list.id == listID);
        setSelectedList(thisList[0])
    }
    
    function handleNameChange(e){
        setName(e.target.value)
    }
    async function handleNewListAdd(e){
        e.preventDefault()
        const response = await fetch(import.meta.env.VITE_BACKEND+"/lists/", {
            method: "POST",
            mode:"cors",
            headers: {
              "Content-Type": "application/json",
              "authorization": "Bearer " +token
            },
            body: JSON.stringify({name}),
        }); 
        if(response.status != 200){//if theres errors
            const errors = await response.json();
            setErrors(errors)
        }
        else{
            setEdit(!edit);    
            setName("")   
            setErrors(null)     
        }

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
                            <ListDeleteButton list={list}/>
                        </li>
                    )
                })}
            </ul>
            <form onSubmit={handleNewListAdd} >
                <label htmlFor="name">New List:</label>
                <input type="text" name="name" id="name" value={name} onChange={handleNameChange} placeholder="list name" />
                <button type="submit">+</button>
                <Errors errors={errors}/>
            </form>
            <CurrentList selectedList={selectedList} setSelectedList={setSelectedList}/>
            
        </div>
        

    )
}


