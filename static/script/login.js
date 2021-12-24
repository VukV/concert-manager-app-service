window.addEventListener('load', init);


function init(){
    document.getElementById('login-button').addEventListener('click', e => {
        e.preventDefault();
        
        const data = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        };

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
                        console.log('EEEEEE');
                        document.cookie = `token=${resElement.token};SameSite=Lax`;
                        //window.location.href = '/';
                        console.log('AAAAA');
                    }
                });
    });
}