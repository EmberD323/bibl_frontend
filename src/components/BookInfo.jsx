import { useOutletContext,useLocation,useNavigate } from "react-router-dom";

import AddBook from "./Partials/AddBook";
import Rate from "./Partials/Rate";
import { BookOnLists } from "./Partials/BookOnLists";

export default function BookInfo (){
    const [token,setToken,edit,setEdit,lists,setLists] = useOutletContext();
    const navigate = useNavigate()
    //get book from navigated state
    const{state} = useLocation();
    let selectedBook = state.book

    //check if the book is on the user lists and add save list data if it is
    if(!selectedBook.assignedAt){ 
        if(selectedBook.volumeInfo){
            listLoop: for(let y=0;y<lists.length;y++){

                for(let i=0;i<lists[y].books.length;i++){
                    if(lists[y].books[i].book.author_name == selectedBook.volumeInfo.authors[0] && lists[y].books[i].book.title == selectedBook.volumeInfo.title){
                        selectedBook = lists[y].books[i];
                        break listLoop;
                    }    
                }
            }  
        } 
        else if(selectedBook.ratings){

            listLoop2: for(let y=0;y<lists.length;y++){
                for(let i=0;i<lists[y].books.length;i++){
                    if(lists[y].books[i].book.author_name == selectedBook.author_name && lists[y].books[i].book.title == selectedBook.title){
                        selectedBook = lists[y].books[i];
                        break listLoop2;
                    }    
                }
            }
        } 
    }

    async function handleRemoveFromAllLists() {
        const response = await fetch(import.meta.env.VITE_BACKEND+"/lists/book/"+selectedBook.book.id, {
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
        }
        else{
            setEdit(!edit);
        }
    }
    
    //navigate to author search
    async function handleAuthorSearch(e){
        let searchTerm="https://www.googleapis.com/books/v1/volumes?q=inauthor:"+e.target.textContent;
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
            navigate('../searchResult',{state:{thisSearchResult,author:e.target.textContent}});
        }
    }
    //if book is on a user list
    if(selectedBook.assignedAt) return (

        <div className="bookInfo">
                <div className="userData">
                    <h2>Lists</h2>
                    <div className="lists"><span className="bookName">{selectedBook.book.title}</span> is on: <BookOnLists book={selectedBook} /> </div>
                    <button onClick={handleRemoveFromAllLists}>Remove book from all lists</button>
                    <AddBook book={selectedBook} />
                    <Rate book={selectedBook}/>
                </div>
                 <div className="bookData">
                    <div className="info">
                        <img src={selectedBook.book.imageURL} alt="book_cover"/>
                        <div>
                            <div className="title"><span style={{color:"var(--fulvous)"}}>Title: </span>{selectedBook.book.title}</div>
                            <div className="author" ><span style={{color:"var(--fulvous)"}}>Author:</span> <span style={{cursor:"grab",  textDecoration: "underline", color:"var(--powder-blue)"}} onClick={handleAuthorSearch}>{selectedBook.book.author_name}</span></div>
                            <div className="category"><span style={{color:"var(--fulvous)"}}>Category:</span> {selectedBook.book.category}</div>
                            <div className="pageCount"><span style={{color:"var(--fulvous)"}}>Pages:</span> {selectedBook.book.pageCount}</div>
                            <div className="publishDate"><span style={{color:"var(--fulvous)"}}>Published:</span> {selectedBook.book.publishDate}</div>
                        </div>
                    </div>
                    <div className="description"> {selectedBook.book.description}</div>
                </div>            
        </div>
    )
    //if user has navigated from a suggested book
    if(selectedBook.author_name)return(
        <div className="bookInfo">
                <div className="userData">
                    <h2>Lists</h2>
                    <AddBook book={{book:selectedBook}}/>
                </div>
                <div className="bookData">
                    <div className="info">
                        <img src={selectedBook.imageURL} alt="book_cover"/>
                        <div>
                            <div className="title"><span style={{color:"var(--fulvous)"}}>Title: </span>{selectedBook.title}</div>
                            <div className="author"style={{cursor:"grab"}}> <span style={{color:"var(--fulvous)"}}>Author:</span> <span onClick={handleAuthorSearch}>{selectedBook.author_name}</span></div>
                            <div className="category"><span style={{color:"var(--fulvous)"}}>Category:</span> {selectedBook.category}</div>
                            <div className="pageCount"><span style={{color:"var(--fulvous)"}}>Pages:</span> {selectedBook.pageCount}</div>
                            <div className="publishDate"><span style={{color:"var(--fulvous)"}}>Published:</span> {selectedBook.publishDate}</div>
                        </div>
                    </div>
                    <div className="description"> {selectedBook.description}</div>
                </div>
        </div>
    )
    return( //if user has navigated from a search result
        <div className="bookInfo">
                <div className="userData">
                    <h2>Lists</h2>
                    <AddBook book={selectedBook}/>
                </div>
                <div className="bookData">
                    <div className="info">
                        <img src={selectedBook.volumeInfo.imageLinks.thumbnail} alt="book_cover"/>
                        <div>
                            <div className="title"><span style={{color:"var(--fulvous)"}}>Title: </span>{selectedBook.volumeInfo.title}</div>
                            <div className="author"style={{cursor:"grab"}}><span style={{color:"var(--fulvous)"}}>Author:</span> <span onClick={handleAuthorSearch}>{selectedBook.volumeInfo.authors[0]}</span></div>
                            <div className="category"><span style={{color:"var(--fulvous)"}}>Category:</span> {selectedBook.volumeInfo.categories[0]}</div>
                            <div className="pageCount"><span style={{color:"var(--fulvous)"}}>Pages:</span> {selectedBook.volumeInfo.pageCount}</div>
                            <div className="publishDate"><span style={{color:"var(--fulvous)"}}>Published:</span>{selectedBook.volumeInfo.publishedDate}</div>
                        </div>
                    </div>
                    <div className="description">{selectedBook.volumeInfo.description}</div>
                </div>
            
        </div>
    )
}


