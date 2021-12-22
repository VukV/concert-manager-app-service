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
                            <td class="tdeb"> <button id="btn-edit-${resElement.id}" class="btn-edit"> Edit </button> </td>
                            <td> <button id="btn-del-${resElement.id}" class="btn-del" onclick="deleteBand(${resElement.id})"> Delete </button> </td>
                        </tr>`;

                        document.querySelector('#bands-body').innerHTML = document.querySelector('#bands-body').innerHTML + newRow;
                        clearInput();
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
                        <td class="tdeb"> <button id="btn-edit-${element.id}" class="btn-edit"> Edit </button> </td>
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
            let trDelete = document.getElementById(`btn-del-${bandId}`).parentNode.parentNode;
            trDelete.parentNode.removeChild(trDelete); 
        }
    });
}
