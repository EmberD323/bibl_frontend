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
        let list = (lists.filter((listSearch)=>listSearch.id == listID))[0]
        navigate('../myBooks',{state:{list}});
    }

    return(
        <ul>
            {listsFound.map((list)=>{
                return(
                    <li  key ={list.id} id={list.id} style={{cursor:"grab"}} onClick={handleListNavigation}>{list.name} </li>
                )
            })}
        </ul>
    )
}
