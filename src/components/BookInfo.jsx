import { useOutletContext,useLocation,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AddBook from "./Partials/AddBook";
import Rate from "./Partials/Rate";
import { BookOnLists } from "./Partials/BookOnLists";
export default function BookInfo (){
    const [token,setToken,edit,setEdit,lists,setLists] = useOutletContext();
    
    if(lists==undefined)return

    const{state} = useLocation();
    let selectedBook = state.book
    if(!selectedBook.assignedAt){ //check if it is on a user list, if it is reassign book to get list data.
        if(selectedBook.volumeInfo){
            lists.map((list) => {
                if(list.books.length == 0)return;
                for(let i=0;i<list.books.length;i++){
                    if(list.books[i].book.author_name == selectedBook.volumeInfo.authors[0] && list.books[i].book.title == selectedBook.volumeInfo.title){
                        selectedBook = list.books[i];
                    }
                }
            });
        }  
    }

   
    async function handleRemoveFromList(){
        const response = await fetch(import.meta.env.VITE_BACKEND+"/lists/"+selectedBook.list.id+"/deleteBook/"+selectedBook.book.id, {
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
            setEdit(!edit);
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
        if(response.status != 200){//if theres errors
            const errors = await response.json();
            console.log(errors)
        }
        else{
            setEdit(!edit);
        }
    }
    const navigate = useNavigate()

    async function handleAuthorSearch(e){
        console.log(e.target.textContent)
        let searchTerm="https://www.googleapis.com/books/v1/volumes?q=inauthor:"+e.target.textContent;
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
    window.scrollTo(0, 0);

    if(selectedBook.assignedAt) return (//if book is on a list
        <div className="bookInfo">
            <h2>Book Info</h2>
             <div className="bookData">
                <img src={selectedBook.book.imageURL} alt="book_cover"/>
                <div className="title">{selectedBook.book.title}</div>
                <div className="author"  style={{cursor:"grab"}}>By <span onClick={handleAuthorSearch}>{selectedBook.book.author_name}</span></div>
                <div className="category">Category: {selectedBook.book.category}</div>
                <div className="pageCount">Pages: {selectedBook.book.pageCount}</div>
                <div className="publishDate">Published: {selectedBook.book.publishDate}</div>
                <div className="description"> {selectedBook.book.description}</div>
            </div>
            <div className="userData">
                <div>This book is on your lists: <BookOnLists book={selectedBook} /> </div>
                <button onClick={handleRemoveFromList}>Remove from list</button>
                <button onClick={handleRemoveFromAllLists}>Remove from all lists</button>
                <AddBook book={selectedBook} />
                <Rate book={selectedBook}/>
            </div>
        </div>
    )
    if(selectedBook.author_name)return(//if suggested
        <div className="bookInfo">
            <h2>Book Info</h2>
                 <div className="bookData">
                    <img src={selectedBook.imageURL} alt="book_cover"/>
                    <div className="title">{selectedBook.title}</div>
                    <div className="author"style={{cursor:"grab"}}>By <span onClick={handleAuthorSearch}>{selectedBook.author_name}</span></div>
                    <div className="category">Category: {selectedBook.category}</div>
                    <div className="pageCount">Pages: {selectedBook.pageCount}</div>
                    <div className="publishDate">Published: {selectedBook.publishDate}</div>
                    <div className="description"> {selectedBook.description}</div>
                </div>
            <div className="userData">
                    <AddBook book={{book:selectedBook}}/>
            </div>
        </div>
    )
    return( //if not on list cjeck

        <div className="bookInfo">
            <h2>Book Info</h2>
             <div className="bookData">
                <img src={selectedBook.volumeInfo.imageLinks.thumbnail} alt="book_cover"/>
                <div className="title">{selectedBook.volumeInfo.title}</div>
                <div className="author"style={{cursor:"grab"}}>By <span onClick={handleAuthorSearch}>{selectedBook.volumeInfo.authors[0]}</span></div>
                <div className="category">Category: {selectedBook.volumeInfo.categories[0]}</div>
                <div className="pageCount">Pages {selectedBook.volumeInfo.pageCount}</div>
                <div className="publishDate">Published:{selectedBook.volumeInfo.publishedDate}</div>
                <div className="description">{selectedBook.volumeInfo.description}</div>
            </div>
            <div className="userData">
                <AddBook book={selectedBook}/>
            </div>
        </div>
    )


    

}


