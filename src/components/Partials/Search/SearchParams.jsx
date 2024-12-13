import { useState } from "react";
import {useNavigate } from "react-router-dom";

export default function SearchParams({searchParams}) {
    let title = searchParams[0];
    if(title == undefined){title = ""}
    let author = searchParams[1];
    if(author == undefined){author = ""}

    let isbn = searchParams[2];
    if(isbn == undefined){isbn = ""}

    let returnedStatement;
    if(author =="" && title =="" && isbn==""){return}
    if(author =="" && title =="" && isbn !=""){returnedStatement = "ISBN: "+isbn}
    if(author =="" && isbn =="" && title !=""){returnedStatement = "Title: "+title}
    if(title =="" && isbn =="" && author !=""){returnedStatement = "Author: "+author}
    if(title =="" && isbn !="" && author !=""){returnedStatement = "Author: "+author + " & " + "ISBN: "+isbn}
    if(author =="" && title !="" && isbn !=""){returnedStatement = "Title: "+title+ " & " + "ISBN: "+isbn}
    if(isbn ==""&& title !=""&& author !=""){returnedStatement = "Title: "+title+ " & " +"Author: "+author }
    if(isbn !=""&& title !=""&& author !=""){returnedStatement = "Title: "+title+ " & " +"Author: "+author+ " & " + "ISBN: "+isbn}
    return (
       <div className="query">{returnedStatement}</div>
    )
}

