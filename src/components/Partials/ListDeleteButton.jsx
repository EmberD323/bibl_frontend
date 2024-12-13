import { useOutletContext,useNavigate } from "react-router-dom";

export default function ListDeleteButton({list,setSelectedList,selectedList}){
    const [token,setToken,edit,setEdit,lists,setLists] = useOutletContext();
    const navigate = useNavigate()
    async function handleListDelete(e) {
        console.log(e.target.parentNode.parentNode)
        const listID = e.target.parentNode.parentNode.id;
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
        <button onClick={handleListDelete}><img width="15" height="15" src="https://img.icons8.com/ios-filled/50/d78521/waste.png" alt="waste"/></button>

    )
}