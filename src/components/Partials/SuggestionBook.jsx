import { useNavigate } from "react-router-dom";

export default function SuggestionBook({book}) {
    
    console.log(book)
    const navigate = useNavigate()
    function handleBookOpen(e){
        navigate('../bookInfo',{state:{book}});
    }
    return(
        <>
        <img src={book.imageURL} alt="book_cover" onClick={handleBookOpen} style={{cursor:"grab"}}/>
        <div className="title" onClick={handleBookOpen} style={{cursor:"grab"}}>{book.title}</div>
        <div className="author" onClick={handleBookOpen} style={{cursor:"grab"}}>{book.author_name} </div>
        </>
    )
 
}

 