import { useOutletContext} from "react-router-dom";
import suggestionData from "../../modules/suggestionData"
import SuggestionBook from "./SuggestionBook";

export default function Suggestions({}) {
    const [token,setToken,edit,setEdit] = useOutletContext();

    return (
       <div className="suggestions">
           <div className="title" >Suggestions</div>
           {suggestionData.map((book) => {
                return(
                    <li key={book.id} >
                        <SuggestionBook book={book}/>
                    </li>
                )
            })}
       </div>
    )

    
}

