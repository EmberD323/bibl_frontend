import { useNavigate,useOutletContext } from "react-router-dom";
import AddBook from "../AddBook";

export default function Book({book,selectedList,setSelectedList}) {
    const [token,setToken,edit,setEdit,lists,setLists] = useOutletContext();

    const dateTime = new Date((Date.parse(book.assignedAt)))
    const dayMonthYear = dateTime.getDate()+"/"+(dateTime.getUTCMonth()+1)+"/"+dateTime.getFullYear();
    const navigate = useNavigate()
    function handleBookOpen(e){
        navigate('../bookInfo',{state:{book}});
    }
    async function handleAuthorSearch(e){
        let searchTerm="https://www.googleapis.com/books/v1/volumes?q=inauthor:"+book.book.author_name;
        const response = await fetch(searchTerm,{
            method: "GET",
        })
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
            const thisSearchResult = await response.json()
            navigate('../searchResult',{state:{thisSearchResult,author:book.book.author_name}});
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
            <td><img src={book.book.imageURL} alt="book_cover" onClick={handleBookOpen} style={{ cursor: "grab" }}/></td>
            <td>
                <div className="title" onClick={handleBookOpen} style={{ cursor: "grab" }}>{book.book.title}</div>
            </td>
            <td>
                <div className="author" onClick={handleAuthorSearch} style={{ cursor: "grab" }}>{book.book.author_name}</div>
            </td>
            <td>{dayMonthYear}</td>
            <td className="rating">{book.book.ratings[0].rating}</td>
            <td>
                <button onClick={handleRemoveFromList}><img width="15" height="15" src="https://img.icons8.com/ios-filled/50/d78521/waste.png" alt="waste"/>
                </button>
                <div className="deleteText">From this list</div>
            </td>
            <td>
                <button onClick={handleRemoveFromAllLists}><img width="15" height="15" src="https://img.icons8.com/ios-filled/50/d78521/waste.png" alt="waste"/>
                </button>
                <div className="deleteText">From all lists</div>
            </td>
            <td>
                <AddBook book={book}/>
            </td>
        </>
        )
    }
    return(
        <>
            <td><img src={book.book.imageURL} alt="book_cover" onClick={handleBookOpen} style={{ cursor: "grab" }}/></td>
            <td>
                <div className="title" onClick={handleBookOpen} style={{ cursor: "grab" }}>{book.book.title}</div>
            </td>
            <td>
                <div className="author" onClick={handleAuthorSearch} style={{ cursor: "grab" }}>{book.book.author_name}</div>
            </td>
            <td>{dayMonthYear}</td>
            <td className="rating">N/A</td>
            <td>
                <button onClick={handleRemoveFromList}><img width="15" height="15" src="https://img.icons8.com/ios-filled/50/d78521/waste.png" alt="waste"/>
                </button>
                <div className="deleteText">From this list</div>
            </td>
            <td>
                <button onClick={handleRemoveFromAllLists}><img width="15" height="15" src="https://img.icons8.com/ios-filled/50/d78521/waste.png" alt="waste"/>
                </button>
                <div className="deleteText">From all lists</div>
            </td>
            <td>
                <AddBook book={book}/>
            </td>
        </>
    )
}

 