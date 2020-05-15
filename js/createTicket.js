function createTicket(){

    document.getElementById("submitbutton").disabled = true;
    setTimeout(function(){document.getElementById("submitbutton").disabled = false;},3000);
   
    var subject = document.getElementById("sub").value
    var type = document.getElementById("type").value
    var status = document.getElementById("status").value

    var numStatus = null
    if(status === "Open"){
        numStatus = 2
    } else if(status === "Pending"){
        numStatus = 3
    } else if(status === "Resolved"){
        numStatus = 4
    } else if(status === "Closed"){
        numStatus = 5
    } else if(status === "Waiting on Customer"){
        numStatus = 6
    } else {
        numStatus = 7
    }

    var priority1 = document.getElementById("priority").value

    var numPriority = null

    if(priority1 === "Low"){
        numPriority = 1
    } else if(priority1 === "Medium"){
        numPriority = 2
    } else if(priority1 === "High"){
        numPriority = 3
    } else {
        numPriority = 4
    }

    var description = document.getElementById("description").value

    fetch("https://rupam0912.freshdesk.com/api/v2/tickets", {
    method:'POST',
    headers: {
        "Authorization": "Basic " + btoa("XszxZyce5n6aQuuHJl6" + ":" + "x"),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        requester_id:81007079743,
        subject,
        type,
        status: numStatus,
        priority: numPriority,
        description
    })

})
.then((res)=> res.json())
.then((resJSON)=> {
    console.log(resJSON)
    alert('Your ticket is created!')
    document.getElementById("myForm").reset()
})

}

