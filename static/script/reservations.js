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
                //todo if, else, todo dodaj rezervaciju u listu
                console.log(resElement);
            });
    });
}

function getReservations(){
    fetch('http://localhost:8081/admin/reservations', {
        headers: {
            //TODO 'Authorization': 'Bearer ' + token
        }
    })
    //response -> list item on page (html)
}