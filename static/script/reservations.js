window.addEventListener('load', init);
let currentId;

function init(){
    //TODO cookies, token

    getReservations();

    document.getElementById("btn-add-reservation").addEventListener('click', addReservation);

    document.getElementById("btn-update-reservation").addEventListener('click', updateReservation);
    document.getElementById("btn-cancel").addEventListener('click', closePopUp);
}

function addReservation(){
    var data = {
        userId: document.getElementById('user-id').value,
        concertId: document.getElementById('concert-id').value,
        ticketsNumber: document.getElementById('tickets-count').value
    }

    fetch('http://localhost:8081/admin/reservations', {
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
                        <td>${resElement.userId}</td>
                        <td>${resElement.concertId}</td>
                        <td>${resElement.ticketsNumber}</td>
                        <td>${resElement.totalPrice}</td>
                        <td>${resElement.validUntil}</td>
                        <td class="tdeb"> <button id="btn-edit-${resElement.id}" class="btn-edit" onclick="openPopUp(${resElement.id})"> Edit </button> </td>
                        <td> <button id="btn-del-${resElement.id}" class="btn-del" onclick="deleteReservation(${resElement.id})"> Delete </button> </td>
                    </tr>`;

                    document.querySelector('#reservations-body').innerHTML = document.querySelector('#reservations-body').innerHTML + newRow;
                    clearInput();
                }
            });
}

function getReservations(){
    fetch('http://localhost:8081/admin/reservations', {
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
                        <td>${element.userId}</td>
                        <td>${element.concertId}</td>
                        <td>${element.ticketsNumber}</td>
                        <td>${element.totalPrice}</td>
                        <td>${element.validUntil}</td>
                        <td class="tdeb"> <button id="btn-edit-${element.id}" class="btn-edit" onclick="openPopUp(${element.id})"> Edit </button> </td>
                        <td> <button id="btn-del-${element.id}" class="btn-del" onclick="deleteReservation(${element.id})"> Delete </button> </td>
                    </tr>`;

                document.querySelector('#reservations-body').innerHTML = document.querySelector('#reservations-body').innerHTML + newRow;
            });
        });
}

function clearInput(){
    document.getElementById('user-id').value = '';
    document.getElementById('concert-id').value = '';
    document.getElementById('tickets-count').value = '';
}

function deleteReservation(reservationId){
    var data = {
        id: reservationId
    }

    fetch('http://localhost:8081/admin/reservations', {
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
            let trDelete = document.getElementById(`btn-del-${reservationId}`).parentNode.parentNode;
            trDelete.parentNode.removeChild(trDelete); 
        }
    });
}

function openPopUp(reservationId){
    currentId = reservationId;
    document.getElementById('popup').style.visibility = 'visible';
}

function closePopUp(){
    document.getElementById('popup').style.visibility = 'hidden';
}

function updateReservation(){
    var data = {
        id: currentId,
        userId: document.getElementById('user-popup').value,
        concertId: document.getElementById('concert-popup').value,
        ticketsNumber: document.getElementById('tickets-popup').value,
        totalPrice: document.getElementById('price-popup').value,
        validUntil: document.getElementById('date-popup').value
    }
    currentId = null;

    fetch('http://localhost:8081/admin/reservations', {
        method: 'PUT',
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
            document.querySelector('#reservations-body').innerHTML = '';
            getReservations();

            closePopUp();
            clearUpdate();
        }
    });
}

function clearUpdate(){
    document.getElementById('user-popup').value = '';
    document.getElementById('concert-popup').value = '';
    document.getElementById('tickets-popup').value = '';
    document.getElementById('price-popup').value = '';
    document.getElementById('date-popup').value = '';
}