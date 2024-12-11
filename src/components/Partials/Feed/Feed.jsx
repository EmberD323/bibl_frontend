import { useOutletContext} from "react-router-dom";
import FeedBook from "./FeedBook";

export default function Feed() {
    const [token,setToken,edit,setEdit,lists,setLists] = useOutletContext();
    if(lists == null){return}

    const allEvents=[];
    lists.map((list) =>{
        list.books.map((book)=>{
            allEvents.push(book);
            if(book.book.ratings[0] != undefined){
                allEvents.push({rated:book.book})
            }
        });
    });
    //order by date
    const sortedEvents = allEvents.sort((a, b) => new Date(a.assignedAt)- new Date(b.assignedAt));

    return (
       <div className="feed">
           <div className="title">My Feed</div>
           <ul>
                {sortedEvents.map((book) => {
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

