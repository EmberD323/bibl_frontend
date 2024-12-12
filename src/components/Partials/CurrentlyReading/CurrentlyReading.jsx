import { useNavigate,useOutletContext} from "react-router-dom";
import CurrentlyReadingBook from "./CurrentlyReadingBook";

export default function CurrentlyReading() {
    const [token,setToken,edit,setEdit,lists,setLists] = useOutletContext();
    const navigate = useNavigate()
    
    if(lists == null ) return

    const CurrentlyReadingList = (lists.filter((list) => list.name == "Currently reading"))[0];

    function handleCurrentlyReadingOpen(e){
        navigate('../myBooks',{state:{list:CurrentlyReadingList}});
    }
    if(CurrentlyReadingList.books[0] == undefined)return(
        <div className="currentlyReading">
           <h2 className="title" onClick={handleCurrentlyReadingOpen} style={{cursor:"grab"}}>Currently Reading</h2>
           <div className="empty">Add some books to your <span style={{cursor:"grab"}} className="underline">Currently Reading</span> list.</div>
       </div>
    )
    return (
       <div className="currentlyReading">
           <h2 className="title" onClick={handleCurrentlyReadingOpen} style={{cursor:"grab"}}>Currently Reading</h2>
           <ul>
                {CurrentlyReadingList.books.map((book) => {
                    return(
                        <li key={book.book.id} >
                            <CurrentlyReadingBook book={book}/>
                        </li>
                    )
                })}
            </ul>
       </div>
    )
}

