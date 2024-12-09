import { useOutletContext,useLocation } from "react-router-dom";
import { useEffect, useState,useRef } from "react";
export default function Rate ({book}){
    const [token,setToken,edit,setEdit,lists,setLists] = useOutletContext();
    const [ratingClicked,setRatingClicked] = useState(undefined)
    useEffect(()=>{
        if(book.book.ratings[0] != undefined){
            setRatingClicked(book.book.ratings[0].rating)
        }
        
    },[])
   
    async function handleRating(e){
        console.log(e.target.id)
        setRatingClicked(e.target.id)
        const response = await fetch(import.meta.env.VITE_BACKEND+"/lists/book/"+book.book.id+"/rating", {
            method: "POST",
            mode:"cors",
            headers: {
              "Content-Type": "application/json",
              "authorization": "Bearer " +token
            },
            body: JSON.stringify({rating:e.target.id}),
        }); 

        console.log(response)
        if(response.status != 200){//if theres errors
            const errors = await response.json();
            console.log(errors)
        }
        else{
            setEdit(!edit);
        }
    }
    if(ratingClicked == undefined){
        return(
        <div className="rate">
            <h2>Rating</h2>
            <div>You haven't added a rating for this book yet, click below to add!</div>
            <div className="ratingStars">
                <img id="1" onClick={handleRating} width="50" height="50" src="https://img.icons8.com/ios/50/star--v1.png" alt="star--v1" />
                <img id="2" onClick={handleRating} width="50" height="50" src="https://img.icons8.com/ios/50/star--v1.png" alt="star--v1" />
                <img id="3" onClick={handleRating} width="50" height="50" src="https://img.icons8.com/ios/50/star--v1.png" alt="star--v1" />
                <img id="4" onClick={handleRating} width="50" height="50" src="https://img.icons8.com/ios/50/star--v1.png" alt="star--v1" />
                <img id="5" onClick={handleRating} width="50" height="50" src="https://img.icons8.com/ios/50/star--v1.png" alt="star--v1" />
            </div>
        </div>
        )
    }
    if(ratingClicked == "1"){
        return(
            <div className="rate">
                <h2>Rating</h2>
                <div>Click below to update your rating!</div>
                <div className="ratingStars">
                    <img id="1" onClick={handleRating} width="50" height="50" src="https://img.icons8.com/ios-filled/50/star--v1.png" alt="star--v1" />
                    <img id="2" onClick={handleRating} width="50" height="50" src="https://img.icons8.com/ios/50/star--v1.png" alt="star--v1" />
                    <img id="3" onClick={handleRating} width="50" height="50" src="https://img.icons8.com/ios/50/star--v1.png" alt="star--v1" />
                    <img id="4" onClick={handleRating} width="50" height="50" src="https://img.icons8.com/ios/50/star--v1.png" alt="star--v1" />
                    <img id="5" onClick={handleRating} width="50" height="50" src="https://img.icons8.com/ios/50/star--v1.png" alt="star--v1" />
                </div>
            </div>
            )
    }
    if(ratingClicked == "2"){
        return(
            <div className="rate">
                <h2>Rating</h2>
                <div>Click below to update your rating!</div>

                <div className="ratingStars">
                    <img id="1" onClick={handleRating} width="50" height="50" src="https://img.icons8.com/ios-filled/50/star--v1.png" alt="star--v1" />
                    <img id="2" onClick={handleRating} width="50" height="50" src="https://img.icons8.com/ios-filled/50/star--v1.png" alt="star--v1" />
                    <img id="3" onClick={handleRating} width="50" height="50" src="https://img.icons8.com/ios/50/star--v1.png" alt="star--v1" />
                    <img id="4" onClick={handleRating} width="50" height="50" src="https://img.icons8.com/ios/50/star--v1.png" alt="star--v1" />
                    <img id="5" onClick={handleRating} width="50" height="50" src="https://img.icons8.com/ios/50/star--v1.png" alt="star--v1" />
                </div>
            </div>
            )
    }
    if(ratingClicked == "3"){
        return(
            <div className="rate">
                <h2>Rating</h2>
                <div>Click below to update your rating!</div>

                <div className="ratingStars">
                    <img id="1" onClick={handleRating} width="50" height="50" src="https://img.icons8.com/ios-filled/50/star--v1.png" alt="star--v1" />
                    <img id="2" onClick={handleRating} width="50" height="50" src="https://img.icons8.com/ios-filled/50/star--v1.png" alt="star--v1" />
                    <img id="3" onClick={handleRating} width="50" height="50" src="https://img.icons8.com/ios-filled/50/star--v1.png" alt="star--v1" />
                    <img id="4" onClick={handleRating} width="50" height="50" src="https://img.icons8.com/ios/50/star--v1.png" alt="star--v1" />
                    <img id="5" onClick={handleRating} width="50" height="50" src="https://img.icons8.com/ios/50/star--v1.png" alt="star--v1" />
                </div>
            </div>
            )
    }
    if(ratingClicked == "4"){
        return(
            <div className="rate">
                <h2>Rating</h2>
                <div>Click below to update your rating!</div>

                <div className="ratingStars">
                    <img id="1" onClick={handleRating} width="50" height="50" src="https://img.icons8.com/ios-filled/50/star--v1.png" alt="star--v1" />
                    <img id="2" onClick={handleRating} width="50" height="50" src="https://img.icons8.com/ios-filled/50/star--v1.png" alt="star--v1" />
                    <img id="3" onClick={handleRating} width="50" height="50" src="https://img.icons8.com/ios-filled/50/star--v1.png" alt="star--v1" />
                    <img id="4" onClick={handleRating} width="50" height="50" src="https://img.icons8.com/ios-filled/50/star--v1.png" alt="star--v1" />
                    <img id="5" onClick={handleRating} width="50" height="50" src="https://img.icons8.com/ios/50/star--v1.png" alt="star--v1" />
                </div>
            </div>
        )
    }
    if(ratingClicked == "5"){
        return(
            <div className="rate">
                <h2>Rating</h2>
                <div>Click below to update your rating!</div>

                <div className="ratingStars">
                    <img id="1" onClick={handleRating} width="50" height="50" src="https://img.icons8.com/ios-filled/50/star--v1.png" alt="star--v1" />
                    <img id="2" onClick={handleRating} width="50" height="50" src="https://img.icons8.com/ios-filled/50/star--v1.png" alt="star--v1" />
                    <img id="3" onClick={handleRating} width="50" height="50" src="https://img.icons8.com/ios-filled/50/star--v1.png" alt="star--v1" />
                    <img id="4" onClick={handleRating} width="50" height="50" src="https://img.icons8.com/ios-filled/50/star--v1.png" alt="star--v1" />
                    <img id="5" onClick={handleRating} width="50" height="50" src="https://img.icons8.com/ios-filled/50/star--v1.png" alt="star--v1" />
                </div>
            </div>
        )
    }
    
    
}


