window.addEventListener('load', init);

const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];
let currentId;

function init(){

    getBands();

    document.getElementById("btn-add-band").addEventListener('click', addBand);

    document.getElementById("btn-update-band").addEventListener('click', updateBand);
    document.getElementById("btn-cancel").addEventListener('click', closePopUp);
}

function addBand(){
    var data = {
        name: document.getElementById('band-name').value,
        country: document.getElementById('band-country').value,
        year: document.getElementById('band-year').value,
        genre: document.getElementById('band-genre').value
    }

    fetch('http://localhost:8081/admin/bands', {
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
                        <td>${resElement.genre}</td>
                        <td>${resElement.country}</td>
                        <td>${resElement.year}</td>
                        <td class="tdeb"> <button id="btn-edit-${resElement.id}" class="btn-edit" onclick="openPopUp(${resElement.id})"> Edit </button> </td>
                        <td> <button id="btn-del-${resElement.id}" class="btn-del" onclick="deleteBand(${resElement.id})"> Delete </button> </td>
                    </tr>`;

                    document.querySelector('#bands-body').innerHTML = document.querySelector('#bands-body').innerHTML + newRow;
                    clearInput();
                }
            });
}

function getBands(){
    fetch('http://localhost:8081/admin/bands', {
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
                        <td>${element.genre}</td>
                        <td>${element.country}</td>
                        <td>${element.year}</td>
                        <td class="tdeb"> <button id="btn-edit-${element.id}" class="btn-edit" onclick="openPopUp(${element.id})"> Edit </button> </td>
                        <td> <button id="btn-del-${element.id}" class="btn-del" onclick="deleteBand(${element.id})"> Delete </button> </td>
                    </tr>`;

                document.querySelector('#bands-body').innerHTML = document.querySelector('#bands-body').innerHTML + newRow;
            });
        });
}

function clearInput(){
    document.getElementById('band-name').value = '';
    document.getElementById('band-country').value = '';
    document.getElementById('band-year').value = '';
    document.getElementById('band-genre').value = '';
}

function deleteBand(bandId){
    var data = {
        id: bandId
    }

    fetch('http://localhost:8081/admin/bands', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    })
    .then(res => {
        if(res.json().message){
            alert(res.json().message);
        }
        else{
            let trDelete = document.getElementById(`btn-del-${bandId}`).parentNode.parentNode;
            trDelete.parentNode.removeChild(trDelete); 
        }
    });
}

function openPopUp(bandId){
    currentId = bandId;
    document.getElementById('popup').style.visibility = 'visible';
}

function closePopUp(){
    document.getElementById('popup').style.visibility = 'hidden';
}

function updateBand(){
    var data = {
        id: currentId,
        name: document.getElementById('name-popup').value,
        country: document.getElementById('country-popup').value,
        year: document.getElementById('year-popup').value,
        genre: document.getElementById('genre-popup').value
    }
    currentId = null;

    fetch('http://localhost:8081/admin/bands', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    })
    .then(res => {
        if(res.json().message){
            alert(res.json().message);
        }
        else{
            document.querySelector('#bands-body').innerHTML = '';
            getBands();

            closePopUp();
            clearUpdate();
        }
    });
}

function clearUpdate(){
    document.getElementById('name-popup').value = '';
    document.getElementById('country-popup').value = '';
    document.getElementById('year-popup').value = '';
    document.getElementById('genre-popup').value = '';
}