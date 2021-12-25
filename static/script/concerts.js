window.addEventListener('load', init);

const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];
let currentId;

function init(){

    getConcerts();

    document.getElementById("btn-add-concert").addEventListener('click', addConcert);

    document.getElementById("btn-update-concert").addEventListener('click', updateConcert);
    document.getElementById("btn-cancel").addEventListener('click', closePopUp);
}

function addConcert(){
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
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
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
                    <td class="tdeb"> <button id="btn-edit-${resElement.id}" class="btn-edit" onclick="openPopUp(${resElement.id})"> Edit </button> </td>
                    <td> <button id="btn-del-${resElement.id}" class="btn-del" onclick="deleteConcert(${resElement.id})"> Delete </button> </td>
                </tr>`;

                document.querySelector('#concerts-body').innerHTML = document.querySelector('#concerts-body').innerHTML + newRow;
                clearInput();
            }
        });
}

function getConcerts(){
    fetch('http://localhost:8081/admin/concerts', {
        headers: {
            'Authorization': 'Bearer ' + token
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
                        <td class="tdeb"> <button id="btn-edit-${element.id}" class="btn-edit" onclick="openPopUp(${element.id})"> Edit </button> </td>
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
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
        .then(resElement => {
            if(resElement.message){
                alert(resElement.message);
            }
            else{
                let trDelete = document.getElementById(`btn-del-${concertId}`).parentNode.parentNode;
                trDelete.parentNode.removeChild(trDelete); 
            }
        });
}

function openPopUp(concertId){
    currentId = concertId;
    document.getElementById('popup').style.visibility = 'visible';
}

function closePopUp(){
    document.getElementById('popup').style.visibility = 'hidden';
}

function updateConcert(){
    var data = {
        id: currentId,
        bandId: document.getElementById('band-popup').value,
        venueId: document.getElementById('venue-popup').value,
        ticketPrice: document.getElementById('price-popup').value,
        ticketsNumber: document.getElementById('tickets-popup').value,
        date: document.getElementById('date-popup').value,
        time: document.getElementById('time-popup').value
    }

    fetch('http://localhost:8081/admin/concerts', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
        .then(resElement => {
            if(resElement.message){
                alert(resElement.message);
            }
            else{
                document.querySelector('#concerts-body').innerHTML = '';
                getConcerts();

                closePopUp();
                clearUpdate();
                currentId = null;
            }
        });
}

function clearUpdate(){
    document.getElementById('band-popup').value = '';
    document.getElementById('venue-popup').value = '';
    document.getElementById('price-popup').value = '';
    document.getElementById('tickets-popup').value = '';
    document.getElementById('date-popup').value = '';
    document.getElementById('time-popup').value = '';
}