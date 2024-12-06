import { Link,useNavigate,useOutletContext} from "react-router-dom";

export default function Feed() {
    const [token,setToken,edit,setEdit,lists,setLists] = useOutletContext();
    if(lists == null){return}

    const allBooks=[];
    lists.map((list) =>{
        list.books.map((book)=>allBooks.push(book))
    });
    //order by date
    console.log(allBooks)
    const sortedBooks = allBooks.sort((a, b) => new Date(a.assignedAt)- new Date(b.assignedAt));
    console.log(sortedBooks)

   //want book to include list info
    return (
       <div className="feed">
           <div className="title">My Feed</div>
           <ul>
                {sortedBooks.map((book) => {
                    return(
                        <li key={book.book.id} >
                            <div>You added {book.book.title} to {book.list.name} </div>
                            <div>Date: {book.assignedAt}</div>
                            <img src={book.book.imageURL} alt="book_cover" />
                        </li>
                    )
                })}
            </ul>
       </div>
    )

    
}

