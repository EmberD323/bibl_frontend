
export default function Feed({lists}) {
    if(lists == null){return}
    const allBooks=[];
    lists.map((list) =>{
        list.books.map((book)=>allBooks.push(book))
    });

   //want book to include list info
    return (
       <div className="currentlyReading">
           <div className="title">My Feed</div>
           <ul>
                {allBooks.map((book) => {
                    return(
                        <li key={book.book.id} >
                            <div>You added {book.book.title} to {book.list.name} </div>
                            <div>Date: {book.assignedAt}</div>
                            <img src={book.book.imageURL} alt="book_cover" />
                        </li>
                    )
                })}
            </ul>
       </div>
    )

    
}

