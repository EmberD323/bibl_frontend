import { useNavigate,useOutletContext } from "react-router-dom";
import AddBook from "./AddBook";
import Rate from "./Rate";
export default function Book({book,selectedList,setSelectedList}) {
    const [token,setToken,edit,setEdit,lists,setLists] = useOutletContext();

    const dateTime = new Date((Date.parse(book.assignedAt)))
    const dayMonthYear = dateTime.getDay()+"/"+dateTime.getDate()+"/"+dateTime.getFullYear();

    const navigate = useNavigate()
    function handleBookOpen(e){
        navigate('../bookInfo',{state:{book}});

    }
    async function handleAuthorSearch(e){
        let searchTerm="https://www.googleapis.com/books/v1/volumes?q=inauthor:"+book.book.author_name;
        const response = await fetch(searchTerm,{
            method: "GET",
        })
        if(response.status != 200){//if theres errors
            const errors = await response.json();
            console.log(errors)
        }
        else{
            const thisSearchResult = await response.json()
            navigate('../searchResult',{state:{thisSearchResult}});

        }
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
    async function handleRemoveFromAllLists() {
        const response = await fetch(import.meta.env.VITE_BACKEND+"/lists/book/"+book.book.id, {
            method: "DELETE",
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
    if(book.book.ratings[0] != undefined){
        return(
        <>
        <img src={book.book.imageURL} alt="book_cover" onClick={handleBookOpen} style={{ cursor: "grab" }}/>
        <div className="title" onClick={handleBookOpen} style={{ cursor: "grab" }}>{book.book.title}</div>
        <div className="author" onClick={handleAuthorSearch} style={{ cursor: "grab" }}>{book.book.author_name}</div>
        <div>{dayMonthYear}</div>
        <div className="rating">{book.book.ratings[0].rating} star rating</div>
        <button onClick={handleRemoveFromList}>Remove from list</button>
        <button onClick={handleRemoveFromAllLists}>Remove from all lists</button>
        <AddBook book={book}/>
        </>
        )
    }
    return(
        <>
        <img src={book.book.imageURL} alt="book_cover" onClick={handleBookOpen} style={{ cursor: "grab" }}/>
        <div className="title" onClick={handleBookOpen} style={{ cursor: "grab" }}>{book.book.title}</div>
        <div className="author" onClick={handleAuthorSearch} style={{ cursor: "grab" }}>{book.book.author_name}</div>
        <div>{dayMonthYear}</div>
        <div className="rating">Not yet rated</div>

        <button onClick={handleRemoveFromList}>Remove from list</button>
        <button onClick={handleRemoveFromAllLists}>Remove from all lists</button>
        <AddBook book={book}/>
        </>
    )
 
}

 