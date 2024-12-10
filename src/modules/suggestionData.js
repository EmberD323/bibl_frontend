
    let queries = ["The%20Wedding%20People%20Alison%20Espach","The%20Women%20Kristin%20Hannah","Somewhere%20Beyond%20the%20Sea%20TJ%20Klune",
        "The%20Ministry%20of%20Time%20Kaliane%20Bradley","The%20Anxious%20Generation%20Jonathan%20Haidt",
        "The%20Third%20Gilmore%20Girl%20Kelly%20Bishop","The%20Bookshop%20Evan%20Friss","You%20Like%20It%20Darker%20Stephen King"
    ]

    const response1 = await fetch("https://www.googleapis.com/books/v1/volumes?q="+queries[0]+"&maxResults=2",{
    method: "GET",
    })
    let suggestion1 = (await response1.json()).items[1]

    const response2 = await fetch("https://www.googleapis.com/books/v1/volumes?q="+queries[1]+"&maxResults=1",{
    method: "GET",
    })
    let suggestion2 = (await response2.json()).items[0]

    const response3 = await fetch("https://www.googleapis.com/books/v1/volumes?q="+queries[2]+"&maxResults=1",{
    method: "GET",
    })
    let suggestion3 = (await response3.json()).items[0]

    const response4 = await fetch("https://www.googleapis.com/books/v1/volumes?q="+queries[3]+"&maxResults=1",{
    method: "GET",
    })
    let suggestion4 = (await response4.json()).items[0]

    const response5 = await fetch("https://www.googleapis.com/books/v1/volumes?q="+queries[4]+"&maxResults=1",{
    method: "GET",
    })
    let suggestion5 = (await response5.json()).items[0]

    const response6 = await fetch("https://www.googleapis.com/books/v1/volumes?q="+queries[5]+"&maxResults=1",{
    method: "GET",
    })
    let suggestion6 = (await response6.json()).items[0]

    const response7 = await fetch("https://www.googleapis.com/books/v1/volumes?q="+queries[6]+"&maxResults=1",{
    method: "GET",
    })
    let suggestion7 = (await response7.json()).items[0]

    const response8 = await fetch("https://www.googleapis.com/books/v1/volumes?q="+queries[7]+"&maxResults=1",{
    method: "GET",
    })
    let suggestion8 = (await response8.json()).items[0]
    //add to books
    //get from books db and put as outlet context    
    const suggestionData =[suggestion1,suggestion2,suggestion3,suggestion4,suggestion5,suggestion6,suggestion7,suggestion8]



export default suggestionData