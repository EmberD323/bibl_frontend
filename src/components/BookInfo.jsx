import { useOutletContext,useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import AddBook from "./Partials/AddBook";

export default function BookInfo (){
    const [token,setToken,edit,setEdit,lists,setLists] = useOutletContext();
    if(lists==undefined)return

    const{state} = useLocation();
    let book = state.book;
    if(!book.assignedAt){ //check if it is on a user list, if it is reassign book to get list data.
        lists.map((list) => {
            if(list.books ==[])return;
            for(let i=0;i<list.books.length;i++){
                if(list.books[i].book.author_name == book.author_name && list.books[i].book.title == book.title){
                    console.log("book on list")
                    book=list.books[i];
                }
            }
        });
    }
    if(book.assignedAt) return (//if book is on a list
        <div className="bookInfo">
            <h2>Book Info</h2>
             <div className="bookData">
                <img src={book.book.imageURL} alt="book_cover"/>
                <div className="title">{book.book.title}</div>
                <div className="author">By {book.book.author_name}</div>
                <div className="category">Category: {book.book.category}</div>
                <div className="pageCount">Pages: {book.book.pageCount}</div>
                <div className="publishDate">Published: {book.book.publishDate}</div>
                <div className="description"> {book.book.description}</div>
            </div>
            <div className="userData">
                <div>This book is on your {book.list.name} list</div>

            </div>
        </div>
    )
    console.log(book)
    return( //if not on list cjeck

        <div className="bookInfo">
            <h2>Book Info</h2>
             <div className="bookData">
                <img src={book.volumeInfo.imageLinks.thumbnail} alt="book_cover"/>
                <div className="title">{book.volumeInfo.title}</div>
                <div className="author">By {book.volumeInfo.authors[0]}</div>
                <div className="category">Category: {book.volumeInfo.categories[0]}</div>
                <div className="pageCount">Pages {book.volumeInfo.pageCount}</div>
                <div className="publishDate">Published:{book.volumeInfo.publishedDate}</div>
                <div className="description">{book.volumeInfo.description}</div>
            </div>
            <div className="userData">
                <AddBook book={book}/>
            </div>
        </div>
    )


    

}


