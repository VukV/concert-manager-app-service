window.addEventListener('load', init);

const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];
let currentId;

function init(){

    getUsers();

    document.getElementById("btn-add-user").addEventListener('click', addUser);

    document.getElementById("btn-update-user").addEventListener('click', updateUser);
    document.getElementById("btn-cancel").addEventListener('click', closePopUp);
}

function addUser(){
    var data = {
        username: document.getElementById('user-name').value,
        password: document.getElementById('user-password').value,
        email: document.getElementById('user-email').value,
        privilege: document.getElementById('user-role').value
    }

    fetch('http://localhost:8081/admin/users', {
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
                        <td>${resElement.username}</td>
                        <td>${resElement.email}</td>
                        <td>${resElement.privilege}</td>
                        <td class="tdeb"> <button id="btn-edit-${resElement.id}" class="btn-edit" onclick="openPopUp(${resElement.id})"> Edit </button> </td>
                        <td> <button id="btn-del-${resElement.id}" class="btn-del" onclick="deleteUser(${resElement.id})"> Delete </button> </td>
                    </tr>`;

                    document.querySelector('#users-body').innerHTML = document.querySelector('#users-body').innerHTML + newRow;
                    clearInput();
                }
            });
}

function getUsers(){
    fetch('http://localhost:8081/admin/users', {
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
                        <td>${element.username}</td>
                        <td>${element.email}</td>
                        <td>${element.privilege}</td>
                        <td class="tdeb"> <button id="btn-edit-${element.id}" class="btn-edit" onclick="openPopUp(${element.id})"> Edit </button> </td>
                        <td> <button id="btn-del-${element.id}" class="btn-del" onclick="deleteUser(${element.id})"> Delete </button> </td>
                    </tr>`;

                document.querySelector('#users-body').innerHTML = document.querySelector('#users-body').innerHTML + newRow;
            });
        });
}

function clearInput(){
    document.getElementById('user-name').value = '';
    document.getElementById('user-password').value = '';
    document.getElementById('user-email').value = '';
}

function deleteUser(userId){
    var data = {
        id: userId
    }

    fetch('http://localhost:8081/admin/users', {
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
            let trDelete = document.getElementById(`btn-del-${userId}`).parentNode.parentNode;
            trDelete.parentNode.removeChild(trDelete); 
        }
    });
}

function openPopUp(userId){
    currentId = userId;
    document.getElementById('popup').style.visibility = 'visible';
}

function closePopUp(){
    document.getElementById('popup').style.visibility = 'hidden';
}

function updateUser(){
    var data = {
        id: currentId,
        name: document.getElementById('name-popup').value,
        password: document.getElementById('password-popup').value,
        email: document.getElementById('email-popup').value,
        privilege: document.getElementById('role-popup').value
    }
    currentId = null;

    fetch('http://localhost:8081/admin/users', {
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
            document.querySelector('#users-body').innerHTML = '';
            getUsers();

            closePopUp();
            clearUpdate();
        }
    });
}

function clearUpdate(){
    document.getElementById('name-popup').value = '';
    document.getElementById('password-popup').value = '';
    document.getElementById('email-popup').value = '';
}