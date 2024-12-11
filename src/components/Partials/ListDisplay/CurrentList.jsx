import Book from "./Book";

export default function CurrentList ({selectedList,setSelectedList}){
    if(selectedList == null) return;
    //if theres no books on the list
    if(selectedList.books == "") return(
        <div className="currentList">
            <h2>{selectedList.name}</h2>
            <div>No books on the list yet, add some!</div>
        </div>
    )   
    return (
        <div className="currentList">
            <h2>{selectedList.name}</h2>
            <ul>
                {selectedList.books.map((book) => {
                    return(
                        <li key={book.book.id} >
                            <Book book={book} selectedList={selectedList} setSelectedList={setSelectedList}/>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}


