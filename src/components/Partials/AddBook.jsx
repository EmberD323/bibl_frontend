import { useOutletContext,useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AddBook({book}) {
    const [token,setToken,edit,setEdit,lists,setLists] = useOutletContext();
    const [selectedList, setSelectedList] = useState("")
    const [hideAdded, setHideAdded] = useState(true)
    const navigate = useNavigate()

    async function handleBookAdd(e){
        e.preventDefault()
        let response;
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
        if(response.status == 403){//if token is expired - log out and nav to login
            localStorage.removeItem("token");
            setToken(null);
            navigate('../login');
        }
        if(response.status != 200 && response.status != 403){//if theres errors
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
        if(hideAdded == false){
            setHideAdded(!hideAdded)
        }
    }
    //for each list, if book is already on the list dont display on options
    let listsToAdd =[];
    lists.map((list)=>{
        const found = list.books.find((findBook) => book.bookId == findBook.bookId );
        if(found == undefined){
            listsToAdd.push(list);
        }
    })
    return(
        <><form className="addBook" onSubmit={handleBookAdd}>
            <select name="list" id="list-select" onChange={handleListChange}>
                <option value="">--Please choose an option--</option>
                {listsToAdd.map((list) => {
                    return (
                        <option key={list.id} value={list.name} id={list.id}>{list.name}</option>
                    );
                })}
            </select>
            <button type="submit">Add to List</button>

        </form><div className="bookAddedAnnounce" id={String(hideAdded)}>Book added to {selectedList.name}!</div></>
    )
}

 