export default function Authors ({authors}){

    return (
        <div className="authors">
            <ul >
                {authors.map((author) => {
                    return <li key={crypto.randomUUID()}>{author}</li>
                })}
            </ul>
        </div>
    )
}


