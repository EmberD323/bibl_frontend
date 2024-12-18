import { useNavigate } from "react-router-dom";
import Authors from "../Authors";

export default function SearchBook({book}) {
 window.scroll(0,0)
    const navigate = useNavigate()
    function handleBookOpen(e){
        navigate('../bookInfo',{state:{book}});
    }
    return(
        <>
        <img src={book.volumeInfo.imageLinks.thumbnail} alt="book_cover" onClick={handleBookOpen} style={{cursor:"grab"}}/>
        <div className="title" onClick={handleBookOpen} style={{cursor:"grab"}}>{book.volumeInfo.title}</div>
        <div>{book.volumeInfo.authors[0]}</div>
        </>
    )
 
}

 