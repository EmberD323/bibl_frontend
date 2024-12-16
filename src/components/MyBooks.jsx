import { useOutletContext,useLocation,useNavigate } from "react-router-dom";
import { useState } from "react";

import CurrentList from "./Partials/ListDisplay/CurrentList";
import Errors from "./Partials/Errors";
import  ListDeleteButton  from "./Partials/ListDeleteButton";

export default function MyBooks (){
    const [token,setToken,edit,setEdit,lists,setLists,suggestions,setSuggestions] = useOutletContext();
    const navigate = useNavigate()

    //if user navigated here through clicking a list name, open that list on load
    const { state } = useLocation();
    let navigatedList = null;
    if(state){
        navigatedList = state.list
    }
    //state assignment
    const [selectedList,setSelectedList] = useState(navigatedList); 
    const [name,setName] = useState(""); 
    const [errors,setErrors] = useState(null)

    function handleListOpen(e){
        const listID = e.target.parentNode.id;
        let thisList = lists.filter((list) =>list.id == listID);
        setSelectedList(thisList[0])
    }
    //adding a list
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
        if(response.status == 403){//if token is expired - log out and nav to login
            localStorage.removeItem("token");
            setToken(null);
            navigate('../login');
        }
        if(response.status != 200 && response.status != 403){//if theres errors
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
            <div className="content">
                <div className="lists">
                    <h2 className="title">My Lists</h2>
                    <ul className="listCards">
                        {lists.map((list) => {
                            return(
                                <li key={list.id} id ={list.id} >
                                    <div className="name" onClick={handleListOpen} style={{cursor:"grab"}}>{list.name} ({list.books.length}) </div>
                                    <ListDeleteButton list={list} setSelectedList={setSelectedList} selectedList={selectedList}/>
                                </li>
                            )
                        })}
                    </ul>
                    <form className="newListForm"onSubmit={handleNewListAdd} >
                        <input type="text" name="name" id="name" value={name} onChange={handleNameChange} placeholder="New List" />
                        <button type="submit">+</button>
                    </form>
                    <Errors errors={errors}/>

                </div>
                <div className="currentList">
                    <CurrentList selectedList={selectedList} setSelectedList={setSelectedList}/>
                </div>
            </div>
        </div>
        
    )
}


