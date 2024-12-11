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

    return (
       <div className="currentlyReading">
           <div className="title" onClick={handleCurrentlyReadingOpen} style={{cursor:"grab"}}>Currently Reading</div>
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
