

function fetchPriority(pr){
    if(pr === 1){
        return "Low"
    } else if(pr === 2){
        return "Medium"
    } else if(pr === 3){
        return "High"
    } else {
        return "Urgent"
    }
}

function fetchStatus(st){
    if(st === 2){
        return "Open"
    } else if(st === 3){
        return "Pending"
    } else if(st === 4){
        return "Resolved"
    } else if(st === 5){
        return "Closed"
    } else if(st === 6){
        return "Waiting on Customer"
    } else {
        return "Waiting on Third Party"
    }
}

function hideForm(){
    var x = document.getElementById("formDiv");
    x.style.display = "none"
}

let myHeaders = new Headers()
myHeaders.append("Authorization", 'Basic ' + btoa('XszxZyce5n6aQuuHJl6:x'))


function showTicket(){
    ticketId = document.getElementById("ticketId").value

    fetch(`https://rupam0912.freshdesk.com/api/v2/tickets/${ticketId}`, {
        headers: myHeaders
    })
    .then((val) => val.json())
    .then((val) => {
        var x = document.getElementById("formDiv");
        if(val.deleted){
            throw new Error("Deleted")
        }
        x.style.display = "block"

        document.getElementById("sub").value = val.subject
        document.getElementById("type").value = val.type
        document.getElementById("status").value = fetchStatus(val.status)
        document.getElementById("priority").value = fetchPriority(val.priority)
        document.getElementById("description").value = val.description_text
        var form = document.getElementById("myForm");
        var elements = form.elements;
        for (var i = 0, len = elements.length; i < len; ++i) {
            if(elements[i].id != "submitbutton" && elements[i].id != "deletebutton" ){
                elements[i].disabled = true;
            }
            
        }
    })
    .catch((error) => {
        var x = document.getElementById("formDiv");
        alert("No Such Ticket Id exists")
        x.style.display = "none"
    })
}


function editTicket(){
    var form = document.getElementById("myForm");
        var elements = form.elements;
        for (var i = 0, len = elements.length; i < len; ++i) {
            if(elements[i].id != "submitbutton" && elements[i].id != "deletebutton" ){
                elements[i].disabled = false;
            }
            
        }
}

function updateTicket() {
    document.getElementById("submit").disabled = true;
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
    ticketId = document.getElementById("ticketId").value

    fetch(`https://rupam0912.freshdesk.com/api/v2/tickets/${ticketId}`, {
    method:'PUT',
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
    alert('Your ticket is updated!')
    var form = document.getElementById("myForm");
    var elements = form.elements;
    for (var i = 0, len = elements.length; i < len; ++i) {
        if(elements[i].id != "submitbutton" && elements[i].id != "deletebutton"){
            elements[i].disabled = true;
        }
        
    }
    document.getElementById("submit").disabled = true

})
}

function deleteTicket() {
    result = confirm("Do you want to continue?")
    if (result === true){
        ticketId = document.getElementById("ticketId").value
        fetch(`https://rupam0912.freshdesk.com/api/v2/tickets/${ticketId}`, {
            method:'DELETE',
             headers: {
            "Authorization": "Basic " + btoa("XszxZyce5n6aQuuHJl6" + ":" + "x"),
            'Accept': 'application/json',
             'Content-Type': 'application/json'
                
            }
        })
        alert("your Ticket is deleted!")
        var x = document.getElementById("formDiv")
        x.style.display = "none"

    }

    
}

    
