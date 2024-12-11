import { useOutletContext,useNavigate } from "react-router-dom";

export default function ListDeleteButton({list,setSelectedList,selectedList}){
    const [token,setToken,edit,setEdit,lists,setLists] = useOutletContext();
    const navigate = useNavigate()
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
            if(selectedList.id == list.id){
                setSelectedList(null)
            }
        }        
    }
    if(list.name == "Currently reading" || list.name == "To be read" || list.name == "Read") return;
    return(
        <button onClick={handleListDelete}>Delete List</button>

    )
}