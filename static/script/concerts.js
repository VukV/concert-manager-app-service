window.addEventListener('load', init);
let currentId;

function init(){
    //TODO cookies, tokens

    getConcerts();

    document.getElementById("btn-add-concert").addEventListener('click', e => {
        e.preventDefault();

        var data = {
            bandId: document.getElementById('band-id').value,
            venueId: document.getElementById('venue-id').value,
            ticketPrice: document.getElementById('concert-ticket-price').value,
            date: document.getElementById('concert-date').value,
            time: document.getElementById('concert-time').value
        }

        fetch('http://localhost:8081/admin/concerts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                //TODO 'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
            .then(resElement => {    
                if(resElement.message){
                    alert(resElement.message);
                }
                else{
                    let newRow = 
                    `<tr>
                        <td>${resElement.id}</td>
                        <td>${resElement.bandId}</td>
                        <td>${resElement.venueId}</td>
                        <td>${resElement.date}</td>
                        <td>${resElement.time}</td>
                        <td>${resElement.ticketsNumber}</td>
                        <td>${resElement.ticketPrice}</td>
                        <td class="tdeb"> <button id="btn-edit-${resElement.id}" class="btn-edit"> Edit </button> </td>
                        <td> <button id="btn-del-${resElement.id}" class="btn-del" onclick="deleteConcert(${resElement.id})"> Delete </button> </td>
                    </tr>`;

                    document.querySelector('#concerts-body').innerHTML = document.querySelector('#concerts-body').innerHTML + newRow;
                    clearInput();
                }
            });
    });
}

function getConcerts(){
    fetch('http://localhost:8081/admin/concerts', {
        headers: {
            //TODO 'Authorization': 'Bearer ' + token
        }
    })
    .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                let newRow = 
                    `<tr>
                        <td>${element.id}</td>
                        <td>${element.bandId}</td>
                        <td>${element.venueId}</td>
                        <td>${element.date}</td>
                        <td>${element.time}</td>
                        <td>${element.ticketsNumber}</td>
                        <td>${element.ticketPrice}</td>
                        <td class="tdeb"> <button id="btn-edit-${element.id}" class="btn-edit"> Edit </button> </td>
                        <td> <button id="btn-del-${element.id}" class="btn-del" onclick="deleteConcert(${element.id})"> Delete </button> </td>
                    </tr>`;

                document.querySelector('#concerts-body').innerHTML = document.querySelector('#concerts-body').innerHTML + newRow;
            });
        });
}

function clearInput(){
    document.getElementById('band-id').value = '';
    document.getElementById('venue-id').value = '';
    document.getElementById('concert-ticket-price').value = '';
    document.getElementById('concert-date').value = '';
    document.getElementById('concert-time').value = '';
}

function deleteConcert(concertId){
    var data = {
        id: concertId
    }

    fetch('http://localhost:8081/admin/concerts', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
            //TODO 'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    })
    .then(res => {
        if(res.json().message){
            alert(res.json().message);
        }
        else{
            let trDelete = document.getElementById(`btn-del-${concertId}`).parentNode.parentNode;
            trDelete.parentNode.removeChild(trDelete); 
        }
    });
}