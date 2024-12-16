
import loadingImage from "../assets/icons8-loading-60.png"
export default function Loading (){
    
    return (
        <div className="loading">
            <div>Loading</div>
            <img className="loadingImage" src={loadingImage} alt="loading" />
        </div>
    )
}


