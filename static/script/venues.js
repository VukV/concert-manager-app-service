window.addEventListener('load', init);

const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];
let currentId;

function init(){

    getVenues();

    document.getElementById("btn-add-venue").addEventListener('click', addVenue)

    document.getElementById("btn-update-venue").addEventListener('click', updateVenue);
    document.getElementById("btn-cancel").addEventListener('click', closePopUp);
}

function addVenue(){
    var data = {
        name: document.getElementById('venue-name').value,
        capacity: document.getElementById('venue-capacity').value,
        address: document.getElementById('venue-address').value,
        website: document.getElementById('venue-website').value
    }

    fetch('http://localhost:8081/admin/venues', {
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
                        <td>${resElement.name}</td>
                        <td>${resElement.capacity}</td>
                        <td>${resElement.address}</td>
                        <td>${resElement.website}</td>
                        <td class="tdeb"> <button id="btn-edit-${resElement.id}" class="btn-edit" onclick="openPopUp(${resElement.id})"> Edit </button> </td>
                        <td> <button id="btn-del-${resElement.id}" class="btn-del" onclick="deleteVenue(${resElement.id})"> Delete </button> </td>
                    </tr>`;

                    document.querySelector('#venues-body').innerHTML = document.querySelector('#venues-body').innerHTML + newRow;
                    clearInput();
                }
            });
}

function getVenues(){
    fetch('http://localhost:8081/admin/venues', {
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
                        <td>${element.name}</td>
                        <td>${element.capacity}</td>
                        <td>${element.address}</td>
                        <td>${element.website}</td>
                        <td class="tdeb"> <button id="btn-edit-${element.id}" class="btn-edit" onclick="openPopUp(${element.id})"> Edit </button> </td>
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
                let trDelete = document.getElementById(`btn-del-${venueId}`).parentNode.parentNode;
                trDelete.parentNode.removeChild(trDelete); 
            }
        });
}

function openPopUp(venueId){
    currentId = venueId;
    document.getElementById('popup').style.visibility = 'visible';
}

function closePopUp(){
    document.getElementById('popup').style.visibility = 'hidden';
}

function updateVenue(){
    var data = {
        id: currentId,
        name: document.getElementById('name-popup').value,
        capacity: document.getElementById('capacity-popup').value,
        address: document.getElementById('address-popup').value,
        website: document.getElementById('website-popup').value
    }

    fetch('http://localhost:8081/admin/venues', {
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
                document.querySelector('#venues-body').innerHTML = '';
                getVenues();

                closePopUp();
                clearUpdate();
                currentId = null;
            }
        });
}

function clearUpdate(){
    document.getElementById('name-popup').value = '';
    document.getElementById('capacity-popup').value = '';
    document.getElementById('address-popup').value = '';
    document.getElementById('website-popup').value = '';
}