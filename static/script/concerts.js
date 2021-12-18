window.addEventListener('load', init);

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
                if(resElement.NESTO){
                    //todo error
                }
                else{
                    //todo dodaj bend u listu
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
    //response -> list item on page (html)
}