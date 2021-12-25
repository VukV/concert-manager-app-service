window.addEventListener('load', init);

function init(){
    document.getElementById('register-button').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
            email: document.getElementById('email').value
        };

        fetch('http://localhost:8082/auth/register', {
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
                        window.location.href = 'registration_success.html';
                    }
                });
    });
}