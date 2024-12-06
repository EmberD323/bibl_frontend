import { Link,useNavigate,useOutletContext} from "react-router-dom";
import CurrentlyReadingBook from "./CurrentlyReadingBook";

export default function CurrentlyReading() {
    const [token,setToken,edit,setEdit,lists,setLists] = useOutletContext();

    if(lists == null){return}

    const CurrentlyReadingList = (lists.filter((list) => list.name == "Currently reading"))[0];

    const navigate = useNavigate()
    function handleCurrentlyReadingOpen(e){
        navigate('../myBooks');
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

