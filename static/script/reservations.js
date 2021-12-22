window.addEventListener('load', init);

function init(){
    //TODO cookies, token

    getReservations();

    document.getElementById("btn-add-reservation").addEventListener('click', e => {
        e.preventDefault();

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
                            <td class="tdeb"> <button id="btn-edit-${resElement.id}" class="btn-edit"> Edit </button> </td>
                            <td> <button id="btn-del-${resElement.id}" class="btn-del"> Delete </button> </td>
                        </tr>`;

                        document.querySelector('#reservations-body').innerHTML = document.querySelector('#reservations-body').innerHTML + newRow;
                        clearInput();
                    }
                });
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
                        <td class="tdeb"> <button id="btn-edit-${element.id}" class="btn-edit"> Edit </button> </td>
                        <td> <button id="btn-del-${element.id}" class="btn-del"> Delete </button> </td>
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