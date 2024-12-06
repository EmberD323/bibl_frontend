import { useNavigate,useOutletContext } from "react-router-dom";
import Authors from "./Authors";
import { useState } from "react";

export default function AddBook({book}) {
    const [token,setToken,edit,setEdit,lists,setLists] = useOutletContext();
    const [selectedList, setSelectedList] = useState("")
    async function handleBookAdd(e){
        console.log(e.target)
        e.preventDefault()
        console.log(book)
        ///:listId/addBook
        //add in data base
        //let {title,name,imageURL,category,description,pageCount,publishDate} = req.body;
        let bookInfo=[book.volumeInfo.title,book.volumeInfo.authors[0],book.volumeInfo.imageLinks.thumbnail,
        book.volumeInfo.categories[0],book.volumeInfo.description,book.volumeInfo.pageCount,book.volumeInfo.publishedDate];

        const response = await fetch(import.meta.env.VITE_BACKEND+"/lists/"+selectedList.id+"/addBook", {
            method: "PUT",
            mode:"cors",
            headers: {
              "Content-Type": "application/json",
              "authorization": "Bearer " +token
            },
            body: JSON.stringify({title:bookInfo[0],name:bookInfo[1],imageURL:bookInfo[2],category:bookInfo[3],description:bookInfo[4],
                pageCount:bookInfo[5],publishDate:bookInfo[6]}),
        }); 
        if(response.status != 200){//if theres errors
            const errors = await response.json();
            console.log(errors)
        }
        else{
            setEdit(!edit);
        }
        console.log(response)


    }
     function handleListChange(e){
        let listName = e.target.value;
        let thisList = (lists.filter((list) =>list.name == listName))[0];
        setSelectedList(thisList)
    }
    
    return(
        <>
        <form onSubmit={handleBookAdd}>
            <label htmlFor="list-select">Choose a list:</label>

            <select name="list" id="list-select" onChange={handleListChange}>
            <option value="">--Please choose an option--</option>
                {lists.map((list) => {
                    return(
                        <option value={list.name} id={list.id}>{list.name}</option>
                    )
                })}
            </select>
            <button type="submit">Add to List</button>


        </form>
        
        </>
    )
 
}

 