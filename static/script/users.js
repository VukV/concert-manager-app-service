window.addEventListener('load', init);

function init(){
    //TODO cookies, token

    getUsers();

    document.getElementById("btn-add-user").addEventListener('click', e => {
        e.preventDefault();

        var data = {
            username: document.getElementById('user-name').value,
            password: document.getElementById('user-password').value,
            email: document.getElementById('user-email').value,
            privilege: document.getElementById('user-role').value
        }

        fetch('http://localhost:8081/admin/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                //TODO 'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(resElement => {    
                //todo if, else, todo dodaj korisnika u listu
                console.log(resElement);
            });
    });
}

function getUsers(){
    fetch('http://localhost:8081/admin/users', {
        headers: {
            //TODO 'Authorization': 'Bearer ' + token
        }
    })
    //response -> list item on page (html)
}