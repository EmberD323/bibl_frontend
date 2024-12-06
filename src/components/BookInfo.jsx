import { useOutletContext,useLocation } from "react-router-dom";
import { useEffect, useState } from "react";


export default function BookInfo (){
    const [token,setToken,edit,setEdit,lists,setLists] = useOutletContext();
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
                <div className="pageCount">Pages {book.book.pageCount}</div>
                <div className="publishDate">By {book.book.publishDate}</div>
                <div className="description">By {book.book.description}</div>
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
                <img src={book.imageURL} alt="book_cover"/>
                <div className="title">{book.title}</div>
                <div className="author">By {book.author_name}</div>
                <div className="category">Category: {book.category}</div>
                <div className="pageCount">Pages {book.pageCount}</div>
                <div className="publishDate">By {book.publishDate}</div>
                <div className="description">By {book.description}</div>
            </div>
            <div className="userData">

            </div>
        </div>
    )


    

}


