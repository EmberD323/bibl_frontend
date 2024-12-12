import { useState,useEffect } from "react";
import Book from "./Book";

export default function CurrentList ({selectedList,setSelectedList}){
    if(selectedList == null) return;
    const [sortDate, setSortDate] = useState(true)
    const [sortTitle, setSortTitle] = useState(false)
    const [sortAuthor, setSortAuthor] = useState(false)
    const [sortRating, setSortRating] = useState(false)




    //if theres no books on the list
    function handleSortDate(){
        setSortDate(!sortDate)
        let sortedList = selectedList;
        let sortedBooks;
        if(sortDate == false){
            sortedBooks = selectedList.books.sort((a, b) => new Date(a.assignedAt)- new Date(b.assignedAt));  
        }
        else{
            sortedBooks = selectedList.books.sort((a, b) => new Date(b.assignedAt)- new Date(a.assignedAt));  

        }
        sortedList.books = sortedBooks;
        setSelectedList(sortedList)
    }
    function handleSortTitle(){
        setSortTitle(!sortTitle)
        let sortedList = selectedList;
        let sortedBooks;
        if(sortTitle==false){
            sortedBooks = selectedList.books.sort((a, b) => {
                let aArr = a.book.title.split(" ");
                let aNoSpace = aArr.join("");
                let bArr = b.book.title.split(" ");
                let bNoSpace = bArr.join("");
                if(aNoSpace < bNoSpace)return -1
                if(aNoSpace > bNoSpace) return 1
                else return 0
            });
        }
        else{
            sortedBooks = selectedList.books.sort((a, b) => {
                let aArr = a.book.title.split(" ");
                let aNoSpace = aArr.join("");
                let bArr = b.book.title.split(" ");
                let bNoSpace = bArr.join("");
                if(aNoSpace < bNoSpace)return 1
                if(aNoSpace > bNoSpace) return -1
                else return 0
            });

        }
        sortedList.books = sortedBooks;
        setSelectedList(sortedList)
    }
    function handleSortAuthor(){
        setSortAuthor(!sortAuthor)
        let sortedList = selectedList;
        let sortedBooks;
        if(sortAuthor==false){
            sortedBooks = selectedList.books.sort((a, b) => {
                let aArr = a.book.author_name.split(" ");
                let aNoSpace = aArr.join("");
                let bArr = b.book.author_name.split(" ");
                let bNoSpace = bArr.join("");
                if(aNoSpace < bNoSpace)return -1
                if(aNoSpace > bNoSpace) return 1
                else return 0
            });
        }
        else{
            sortedBooks = selectedList.books.sort((a, b) => {
                let aArr = a.book.author_name.split(" ");
                let aNoSpace = aArr.join("");
                let bArr = b.book.author_name.split(" ");
                let bNoSpace = bArr.join("");
                if(aNoSpace < bNoSpace)return 1
                if(aNoSpace > bNoSpace) return -1
                else return 0
            });

        }
        sortedList.books = sortedBooks;
        setSelectedList(sortedList)
    }
    function handleSortRating(){
        setSortRating(!sortRating)

        let sortedList = selectedList;
        let sortedBooks;
        if(sortRating == false){
            sortedBooks = selectedList.books.sort((a, b) =>{
                let bookARating,bookBRating;
                if(a.book.ratings[0] == undefined){
                    bookARating = 0
                }else{
                    bookARating =a.book.ratings[0].rating
                }
                if(b.book.ratings[0] == undefined){
                    bookBRating = 0
                }else{
                    bookBRating =b.book.ratings[0].rating
                }
                if(bookARating < bookBRating)return -1
                if(bookARating > bookBRating) return 1
                else return 0
            });  
        }
        else{
            sortedBooks = selectedList.books.sort((a, b) =>{
                let bookARating,bookBRating;
                if(a.book.ratings[0] == undefined){
                    bookARating = 0
                }else{
                    bookARating =a.book.ratings[0].rating
                }
                if(b.book.ratings[0] == undefined){
                    bookBRating = 0
                }else{
                    bookBRating =b.book.ratings[0].rating
                }
                if(bookARating < bookBRating)return 1
                if(bookARating > bookBRating) return -1
                else return 0
            }); 
        }
        sortedList.books = sortedBooks;
        setSelectedList(sortedList)
    }
    //sortByDate
    useEffect(()=>{
        let sortedList = selectedList;
        let sortedBooks = selectedList.books.sort((a, b) => new Date(b.assignedAt)- new Date(a.assignedAt));  
        sortedList.books = sortedBooks;
        setSelectedList(sortedList)
        
    },[])

    return (
        <>
            <h2>{selectedList.name}</h2>
            <table>
                <thead className="heading">
                    <tr>
                        <th></th>
                        <th>
                            <div>Title</div>
                            <img onClick={handleSortTitle} width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/f2d398/sort.png" alt="sort"/>

                        </th>
                        <th>
                            <div>Author</div>
                            <img onClick={handleSortAuthor} width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/f2d398/sort.png" alt="sort"/>

                        </th>
                        <th>
                            <div>Date Added</div>
                            <img onClick={handleSortDate} width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/f2d398/sort.png" alt="sort"/>
                        </th>
                        <th>
                            <div>Rating</div>
                            <img onClick={handleSortRating} width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/f2d398/sort.png" alt="sort"/>

                        </th>
                        <th>Remove from this list</th>
                        <th>Remove from all lists</th>
                        <th>Add to list</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedList.books.map((book) => {
                        return(
                    
                            <tr key={book.book.id} >
                                <Book book={book} selectedList={selectedList} setSelectedList={setSelectedList}/>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}


