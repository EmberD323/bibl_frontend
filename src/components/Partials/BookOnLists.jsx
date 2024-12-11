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
    async function handleRemoveFromList(e){
        let listID = e.target.id;

        const response = await fetch(import.meta.env.VITE_BACKEND+"/lists/"+listID+"/deleteBook/"+book.book.id, {
            method: "PUT",
            mode:"cors",
            headers: {
              "Content-Type": "application/json",
              "authorization": "Bearer " +token
            },
        }); 
        if(response.status == 403){//if token is expired - log out and nav to login
            localStorage.removeItem("token");
            setToken(null);
            navigate('../login');
        }
        if(response.status != 200 && response.status != 403){//if theres errors
            const errors = await response.json();
            console.log(errors)
        }
        else{
            setEdit(!edit);
        }
    }

    return(
        <ul>
            {listsFound.map((list)=>{
                return(
                    <li  key ={list.id} >
                        <div className="listName" id={list.id} style={{cursor:"grab"}} onClick={handleListNavigation}>{list.name} </div>
                        <button id={list.id} onClick={handleRemoveFromList}>Remove from list</button>

                    </li>
                )
            })}
        </ul>
    )
}
