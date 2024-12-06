import { useOutletContext,useLocation } from "react-router-dom";
import { useEffect, useState } from "react";


export default function BookInfo (){
    const [token,setToken,edit,setEdit,lists,setLists] = useOutletContext();
    const{state} = useLocation();
    const book = state.book;
    console.log(book)
    //get all lists by user
    //add later - new partials for if book is on users list and if not. this is if it is.

 
    return (
        <div className="bookInfo">
            <h2>Book Info</h2>
            <div className="bookData">
                <img src={book.book.imageURL} alt="book_cover"/>
                <div className="title">{book.book.title}</div>
                <div className="author">By {book.book.author_name}</div>
                <div className="category">Category: {book.book.category}</div>
                <div className="pageCount">Pages {book.book.pageCount}</div>
                <div className="publishDate">By {book.book.publishDate}</div>
                <div className="description">By {book.book.description}</div>
            </div>
            <div className="userData">
                <div>This book is on your {book.list.name} list</div>

            </div>
    
        </div>
        

    )
}


