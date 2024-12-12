import { useOutletContext} from "react-router-dom";
import FeedBook from "./FeedBook";
import { useState } from "react";

export default function Feed() {
    const [token,setToken,edit,setEdit,lists,setLists] = useOutletContext();
    const [count, setCount] = useState(5)
    if(lists == null){return}
    function handleShowMore(){
        let newCount = count +5;
        setCount(newCount)
    }
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
    if(sortedEvents.length == 0)return(
        <div className="feed">
           <h2 className="title">My Feed</h2>
           <ul className="empty"><li>Add or rate some books!</li></ul>
       </div>
    )
    if(sortedEvents.length>sortedEvents.slice(-count).length) return (
       <div className="feed">
           <h2 className="title">My Feed</h2>
           <ul>
                {sortedEvents.slice(-count).map((book) => {
                    return(
                        <li key={crypto.randomUUID()} >
                            <FeedBook book={book}/>
                        </li>
                    )
                })}
            </ul>
            <button onClick={handleShowMore}>Show more</button>
       </div>
    )
    return(
        <div className="feed">
           <h2 className="title">My Feed</h2>
           <ul>
                {sortedEvents.map((book) => {
                    return(
                        <li key={crypto.randomUUID()} >
                            <FeedBook book={book}/>
                        </li>
                    )
                })}
            </ul>
            <div className="end">End of feed</div>
       </div>
    )
}

