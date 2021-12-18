window.addEventListener('load', init);

function init(){
    
    //todo cookies, token

    getVenues();

    document.getElementById("btn-add-venue").addEventListener('click', e => {
        e.preventDefault();

        var data = {
            name: document.getElementById('venue-name').value,
            capacity: document.getElementById('venue-capacity').value,
            address: document.getElementById('venue-address').value,
            website: document.getElementById('venue-website').value
        }

        fetch('http://localhost:8081/admin/venues', {
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

function getVenues(){
    fetch('http://localhost:8081/admin/venues', {
        headers: {
            //TODO 'Authorization': 'Bearer ' + token
        }
    })
    //response -> list item on page (html)
}