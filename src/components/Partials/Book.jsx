import { useNavigate } from "react-router-dom";

export default function Book({book}) {
    const dateTime = new Date((Date.parse(book.assignedAt)))
    const dayMonthYear = dateTime.getDay()+"/"+dateTime.getDate()+"/"+dateTime.getFullYear();

    const navigate = useNavigate()
    function handleBookOpen(e){
        navigate('../bookInfo',{state:{book}});

    }
    return(
        <>
        <img src={book.book.imageURL} alt="book_cover" onClick={handleBookOpen} style={{ cursor: "grab" }}/>
        <div className="title" onClick={handleBookOpen} style={{ cursor: "grab" }}>{book.book.title}</div>
        <div className="author" onClick={handleBookOpen} style={{ cursor: "grab" }}>{book.book.author_name}</div>
        <div>{dayMonthYear}</div>
        </>
    )
 
}

 