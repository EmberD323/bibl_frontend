import { useOutletContext,useNavigate } from "react-router-dom";

export function BookOnLists({book}){
    const [token,setToken,edit,setEdit,lists,setLists] = useOutletContext();
    let listsFound=[];
    lists.map((list) => {
        if(list.books.length==0)return;
        for(let i=0;i<list.books.length;i++){
            if(list.books[i].book.author_name == book.book.author_name && list.books[i].book.title == book.book.title){
                listsFound.push(list);
            }
        }
    });
    const navigate = useNavigate()

    function handleListNavigation(e){
        let listID = e.target.id;
        console.log(listID)
        console.log(lists)
        let list = (lists.filter((listSearch)=>listSearch.id == listID))[0]
        console.log(list)
        navigate('../myBooks',{state:{list}});

    }
    console.log(book)
    console.log(listsFound)
    if(listsFound.length == 1){
        return <span  id={listsFound[0].id} style={{cursor:"grab"}} onClick={handleListNavigation}>{listsFound[0].name}</span>
        
    }
    // return(
        
        
    // )
}
{/* <ul>
                {lists.map((list) => {
                    return(
                        <li key={list.id} id ={list.id} >
                            <div className="name" onClick={handleListOpen} style={{cursor:"grab"}}>{list.name} ({list.books.length}) </div>
                            <ListDeleteButton list={list}/>
                        </li>
                    )
                })}
            </ul> */}