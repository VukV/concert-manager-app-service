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
                        <td> <button id="btn-edit-${resElement.id}" class="btn-edit"> Edit </button> </td>
                        <td> <button id="btn-del-${resElement.id}" class="btn-del"> Delete </button> </td>
                    </tr>`;

                document.querySelector('#bands-body').innerHTML = document.querySelector('#bands-body').innerHTML + newRow;
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
                        <td> <button id="btn-edit-${element.id}" class="btn-edit"> Edit </button> </td>
                        <td> <button id="btn-del-${element.id}" class="btn-del"> Delete </button> </td>
                    </tr>`;

                document.querySelector('#bands-body').innerHTML = document.querySelector('#bands-body').innerHTML + newRow;
            });
        });
}