window.addEventListener('load', init);


function init(){
    document.getElementById('login-button').addEventListener('click', e => {
        e.preventDefault();
        
        const data = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        };

        if(validate(data)){
            fetch('http://localhost:8082/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
                .then(resElement => {
                    if(resElement.message){
                        alert(resElement.message);
                    } 
                    else{
                        document.cookie = `token=${resElement.token};SameSite=Lax`;
                        window.location.href = 'index.html';
                    }
                });
        }
    });
}

function validate(data){
    if(data.username.length < 3 || data.name.length > 12){
        alert('Invalid username format');
        return false;
    }
    if(data.password.length < 4 || data.password.length > 12){
        alert('Invalid password format');
        return false;
    }

    return true;
}