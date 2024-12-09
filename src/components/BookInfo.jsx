import { useOutletContext,useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import AddBook from "./Partials/AddBook";
import Rate from "./Partials/Rate";
export default function BookInfo (){
    const [token,setToken,edit,setEdit,lists,setLists] = useOutletContext();
    if(lists==undefined)return
    const{state} = useLocation();
    const [selectedBook,setSelectedBook] = useState(state.book)
    if(!selectedBook.assignedAt){ //check if it is on a user list, if it is reassign book to get list data.
        lists.map((list) => {
            if(list.books.length == 0)return;
            for(let i=0;i<list.books.length;i++){
                if(list.books[i].book.author_name == selectedBook.volumeInfo.authors[0] && list.books[i].book.title == selectedBook.volumeInfo.title){
                    setSelectedBook(list.books[i]);
                }
            }
        });
    }

    let listNames = [];
    if(selectedBook.assignedAt){
        lists.map((list) => {
            if(list.books.length==0)return;
            for(let i=0;i<list.books.length;i++){
                if(list.books[i].book.author_name == selectedBook.book.author_name && list.books[i].book.title == selectedBook.book.title){
                    listNames.push(list.name);
                }
            }
        });
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
    
    if(selectedBook.assignedAt) return (//if book is on a list
        <div className="bookInfo">
            <h2>Book Info</h2>
             <div className="bookData">
                <img src={selectedBook.book.imageURL} alt="book_cover"/>
                <div className="title">{selectedBook.book.title}</div>
                <div className="author">By {selectedBook.book.author_name}</div>
                <div className="category">Category: {selectedBook.book.category}</div>
                <div className="pageCount">Pages: {selectedBook.book.pageCount}</div>
                <div className="publishDate">Published: {selectedBook.book.publishDate}</div>
                <div className="description"> {selectedBook.book.description}</div>
            </div>
            <div className="userData">
                <div>This book is on your {listNames.length} of your lists</div>
                <button onClick={handleRemoveFromList}>Remove from list</button>
                <button onClick={handleRemoveFromAllLists}>Remove from all lists</button>
                <AddBook book={selectedBook} />
                <Rate book={selectedBook}/>
            </div>
        </div>
    )
    return( //if not on list cjeck

        <div className="bookInfo">
            <h2>Book Info</h2>
             <div className="bookData">
                <img src={selectedBook.volumeInfo.imageLinks.thumbnail} alt="book_cover"/>
                <div className="title">{selectedBook.volumeInfo.title}</div>
                <div className="author">By {selectedBook.volumeInfo.authors[0]}</div>
                <div className="category">Category: {selectedBook.volumeInfo.categories[0]}</div>
                <div className="pageCount">Pages {selectedBook.volumeInfo.pageCount}</div>
                <div className="publishDate">Published:{selectedBook.volumeInfo.publishedDate}</div>
                <div className="description">{selectedBook.volumeInfo.description}</div>
            </div>
            <div className="userData">
                <AddBook book={selectedBook} setSelectedBook={setSelectedBook}/>
            </div>
        </div>
    )


    

}


