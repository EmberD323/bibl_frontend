export default function Errors ({errors}){
    if(errors == null){
        return
    }
    return (
        <div className="errorList">
            <ul >
                {errors.map((error) => {
                    return <li key={crypto.randomUUID()}>{error.msg}</li>
                })}
            </ul>
        </div>
    )
}


