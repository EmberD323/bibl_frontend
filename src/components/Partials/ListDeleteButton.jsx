import { useOutletContext } from "react-router-dom";

export default function ListDeleteButton({list}){
    const [token,setToken,edit,setEdit,lists,setLists] = useOutletContext();

    async function handleListDelete(e) {
        const listID = e.target.parentNode.id;
        const response = await fetch(import.meta.env.VITE_BACKEND+"/lists/"+listID, {
            method: "DELETE",
            mode:"cors",
            headers: {
              "Content-Type": "application/json",
              "authorization": "Bearer " +token
            },
        }); 
        if(response.status != 200){//if theres errors
            const errors = await response.json();
            console.log(errors)
        }
        else{
            setEdit(!edit);       
        }        
    }
    if(list.name == "Currently reading" || list.name == "To be read" || list.name == "Read") return;
    return(
        <button onClick={handleListDelete}>Delete List</button>

    )
}