import { useNavigate } from "react-router-dom";

export default function FeedBook({book}) {
    
    const navigate = useNavigate()
    function handleBookOpen(e){
        navigate('../bookInfo',{state:{book}});
    }
    if(book.rated){
        const dateTime = new Date((Date.parse(book.rated.ratings[0].assignedAt)))
        const dayMonthYear = dateTime.getDay()+"/"+dateTime.getDate()+"/"+dateTime.getFullYear();
        return(
        <>
        <div>You rated <span onClick={handleBookOpen} style={{cursor:"grab"}}>{book.rated.title}</span> {book.rated.ratings[0].rating} Stars </div>
        <div>Date: {dayMonthYear}</div>
        <img src={book.rated.imageURL}onClick={handleBookOpen} style={{cursor:"grab"}} alt="book_cover" />
        </>
    )}
    const dateTime = new Date((Date.parse(book.assignedAt)))
    const dayMonthYear = dateTime.getDay()+"/"+dateTime.getDate()+"/"+dateTime.getFullYear();
    return(
        <>
        <div>You added <span onClick={handleBookOpen} style={{cursor:"grab"}}>{book.book.title}</span> to {book.list.name} </div>
        <div>Date: {dayMonthYear}</div>
        <img src={book.book.imageURL}onClick={handleBookOpen} style={{cursor:"grab"}} alt="book_cover" />
        </>
    )
 
}

 