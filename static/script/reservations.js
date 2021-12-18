window.addEventListener('load', init);

function init(){
    //TODO cookies, token

    getReservations();

    document.getElementById("btn-add-user").addEventListener('click', e => {
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
                if(resElement.NESTO){
                    //todo error
                }
                else{
                    //todo dodaj bend u listu
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
    //response -> list item on page (html)
}