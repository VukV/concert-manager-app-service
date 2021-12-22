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
                    if(resElement.message){
                        alert(resElement.message);
                    }
                    else{
                        let newRow = 
                        `<tr>
                            <td>${resElement.id}</td>
                            <td>${resElement.name}</td>
                            <td>${resElement.capacity}</td>
                            <td>${resElement.address}</td>
                            <td>${resElement.website}</td>
                            <td class="tdeb"> <button id="btn-edit-${resElement.id}" class="btn-edit"> Edit </button> </td>
                            <td> <button id="btn-del-${resElement.id}" class="btn-del" onclick="deleteVenue(${resElement.id})"> Delete </button> </td>
                        </tr>`;

                        document.querySelector('#venues-body').innerHTML = document.querySelector('#venues-body').innerHTML + newRow;
                        clearInput();
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
    .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                let newRow = 
                    `<tr>
                        <td>${element.id}</td>
                        <td>${element.name}</td>
                        <td>${element.capacity}</td>
                        <td>${element.address}</td>
                        <td>${element.website}</td>
                        <td class="tdeb"> <button id="btn-edit-${element.id}" class="btn-edit"> Edit </button> </td>
                        <td> <button id="btn-del-${element.id}" class="btn-del" onclick="deleteVenue(${element.id})"> Delete </button> </td>
                    </tr>`;

                document.querySelector('#venues-body').innerHTML = document.querySelector('#venues-body').innerHTML + newRow;
            });
        });
}

function clearInput(){
    document.getElementById('venue-name').value = '';
    document.getElementById('venue-capacity').value = '';
    document.getElementById('venue-address').value = '';
    document.getElementById('venue-website').value = '';
}

function deleteVenue(venueId){
    var data = {
        id: venueId
    }

    fetch('http://localhost:8081/admin/venues', {
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
            let trDelete = document.getElementById(`btn-del-${venueId}`).parentNode.parentNode;
            trDelete.parentNode.removeChild(trDelete); 
        }
    });
}