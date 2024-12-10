import { useOutletContext} from "react-router-dom";
import SuggestionBook from "./SuggestionBook";
//will come back to suggestions -on pause
export default  function Suggestions({suggestions}) {
    if(suggestions == null)return;
    const [token,setToken,edit,setEdit,lists,setLists] = useOutletContext();
    

    
    return (
       <div className="suggestions" >
           <div className="title" >Suggestions</div>
            {suggestions.map((book) => {
                    return(
                        <li key={book.id} >
                            <SuggestionBook book={book}/>
                        </li>
                    )
                })}
       </div>
    )

    
}

