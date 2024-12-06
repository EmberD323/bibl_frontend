import { useNavigate,useOutletContext } from "react-router-dom";

export default function Book({book,selectedList,setSelectedList}) {
    const [token,setToken,edit,setEdit,lists,setLists] = useOutletContext();

    const dateTime = new Date((Date.parse(book.assignedAt)))
    const dayMonthYear = dateTime.getDay()+"/"+dateTime.getDate()+"/"+dateTime.getFullYear();

    const navigate = useNavigate()
    function handleBookOpen(e){
        navigate('../bookInfo',{state:{book}});

    }
    async function handleRemoveFromList(){
        const response = await fetch(import.meta.env.VITE_BACKEND+"/lists/"+selectedList.id+"/deleteBook/"+book.book.id, {
            method: "PUT",
            mode:"cors",
            headers: {
              "Content-Type": "application/json",
              "authorization": "Bearer " +token
            },
        }); 
        if(response.status != 200){//if theres errors
            const errors = await response.json();
            console.log(errors)
        }
        else{
            let newBookList = selectedList.books.filter((thisbook)=>thisbook.bookId != book.bookId)
            let newSelectedList = selectedList;
            newSelectedList.books = newBookList;
            setSelectedList(newSelectedList)
            setEdit(!edit);
        }
    }
    return(
        <>
        <img src={book.book.imageURL} alt="book_cover" onClick={handleBookOpen} style={{ cursor: "grab" }}/>
        <div className="title" onClick={handleBookOpen} style={{ cursor: "grab" }}>{book.book.title}</div>
        <div className="author" onClick={handleBookOpen} style={{ cursor: "grab" }}>{book.book.author_name}</div>
        <div>{dayMonthYear}</div>
        <button onClick={handleRemoveFromList}>Remove from list</button>
        </>
    )
 
}

 