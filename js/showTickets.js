//get all tickets

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
        return "open"
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

let myHeaders = new Headers()
myHeaders.append("Authorization", 'Basic ' + btoa('XszxZyce5n6aQuuHJl6:x'))


fetch("https://rupam0912.freshdesk.com/api/v2/tickets", {
    headers: myHeaders
})
.then((val)=> val.json())
.then((val)=> {

    
    val.forEach((element)=> {
        var dataTable = $('#example').DataTable();
        dataTable.row.add([element.id,element.requester_id,element.type,element.subject,fetchStatus(element.status),fetchPriority(element.priority)]).draw();
    })

})