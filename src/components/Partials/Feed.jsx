import { Link,useNavigate,useOutletContext} from "react-router-dom";
import FeedBook from "./FeedBook";
export default function Feed() {
    const [token,setToken,edit,setEdit,lists,setLists] = useOutletContext();
    if(lists == null){return}

    const allBooks=[];
    lists.map((list) =>{
        list.books.map((book)=>allBooks.push(book))
    });
    //order by date
    const sortedBooks = allBooks.sort((a, b) => new Date(a.assignedAt)- new Date(b.assignedAt));

    return (
       <div className="feed">
           <div className="title">My Feed</div>
           <ul>
                {sortedBooks.map((book) => {
                    return(
                        <li key={crypto.randomUUID()} >
                            <FeedBook book={book}/>
                        </li>
                    )
                })}
            </ul>
       </div>
    )

    
}

