import { useNavigate,useOutletContext } from "react-router-dom";
import Authors from "./Authors";
import { useState } from "react";

export default function AddBook({book,}) {
    const [token,setToken,edit,setEdit,lists,setLists] = useOutletContext();
    const [selectedList, setSelectedList] = useState("")
    const [hideAdded, setHideAdded] = useState(true)


    async function handleBookAdd(e){
        e.preventDefault()
        let response;
        console.log(book)
        if(book.volumeInfo){ //if its a new book
            let bookInfo=[book.volumeInfo.title,book.volumeInfo.authors[0],book.volumeInfo.imageLinks.thumbnail,
            book.volumeInfo.categories[0],book.volumeInfo.description,book.volumeInfo.pageCount,book.volumeInfo.publishedDate];
            response = await fetch(import.meta.env.VITE_BACKEND+"/lists/"+selectedList.id+"/addBook", {
                method: "PUT",
                mode:"cors",
                headers: {
                  "Content-Type": "application/json",
                  "authorization": "Bearer " +token
                },
                body: JSON.stringify({title:bookInfo[0],name:bookInfo[1],imageURL:bookInfo[2],category:bookInfo[3],description:bookInfo[4],
                    pageCount:bookInfo[5],publishDate:bookInfo[6]}),
            }); 
        }
        else{//if its already on the users lists
            let bookInfo=[book.book.title,book.book.author_name,book.book.imageURL,
            book.book.category,book.book.description,book.book.pageCount,book.book.publishDate];
            response = await fetch(import.meta.env.VITE_BACKEND+"/lists/"+selectedList.id+"/addBook", {
                method: "PUT",
                mode:"cors",
                headers: {
                  "Content-Type": "application/json",
                  "authorization": "Bearer " +token
                },
                body: JSON.stringify({title:bookInfo[0],name:bookInfo[1],imageURL:bookInfo[2],category:bookInfo[3],description:bookInfo[4],
                    pageCount:bookInfo[5],publishDate:bookInfo[6]}),
            });
             
        }

        if(response.status != 200){//if theres errors
            const errors = await response.json();
            console.log(errors)
        }
        else{
            setEdit(!edit);
            setHideAdded(!hideAdded)
            
        }
        

    }
     function handleListChange(e){
        let listName = e.target.value;
        let thisList = (lists.filter((list) =>list.name == listName))[0];
        setSelectedList(thisList)
    }
    
    return(
        <>
        <form onSubmit={handleBookAdd}>
            <label htmlFor="list-select">Add to a list:</label>

            <select name="list" id="list-select" onChange={handleListChange}>
            <option value="">--Please choose an option--</option>
            {lists.map((list) => {
                return(
                    <option key={list.id} value={list.name} id={list.id}>{list.name}</option>
                )
            })}
            </select>
            <button type="submit">Add to List</button>
            <div className="bookAddedAnnounce" id={String(hideAdded)}>Book added to {selectedList.name}!</div>


        </form>
        
        </>
    )
 
}

 