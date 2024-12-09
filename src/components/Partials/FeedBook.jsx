import { useNavigate } from "react-router-dom";

export default function FeedBook({book}) {
    const dateTime = new Date((Date.parse(book.assignedAt)))
    const dayMonthYear = dateTime.getDay()+"/"+dateTime.getDate()+"/"+dateTime.getFullYear();
    const navigate = useNavigate()
    function handleBookOpen(e){
        console.log(book)
        navigate('../bookInfo',{state:{book}});


    }
    return(
        <>
        <div>You added <span onClick={handleBookOpen} style={{cursor:"grab"}}>{book.book.title}</span> to {book.list.name} </div>
        <div>Date: {dayMonthYear}</div>
        <img src={book.book.imageURL}onClick={handleBookOpen} style={{cursor:"grab"}} alt="book_cover" />
        </>
    )
 
}

 