window.addEventListener('load', init);

function init(){

    //todo cookies, token

    getBands();

    document.getElementById("btn-add-band").addEventListener('click', e => {
        e.preventDefault();

        var data = {
            name: document.getElementById('band-name').value,
            country: document.getElementById('band-country').value,
            year: document.getElementById('band-year').value,
            genre: document.getElementById('band-genre').value
        }

        fetch('http://localhost:8081/admin/bands', {
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

function getBands(){
    fetch('http://localhost:8081/admin/bands', {
        headers: {
            //TODO 'Authorization': 'Bearer ' + token
        }
    })
    //response -> list item on page (html)
}