window.addEventListener('load', init);

function init(){
    setHeader();

    document.getElementById("btn-home-shared").addEventListener('click', returnHome);
    document.getElementById("btn-logout-shared").addEventListener('click', logOut);
}

function setHeader(){
   
    let h = document.createElement("header");
    h.setAttribute("class", "buttons-header-shared");
    h.setAttribute("id", "bhs");
    document.body.insertBefore(h, document.body.firstChild);

    let headerElement = 
    `<span class="header-span-shared">
        <button id="btn-home-shared">Home</button>
        <button id="btn-logout-shared">Log Out</button>
    </span>`;
    document.getElementById("bhs").innerHTML = headerElement;
}

function returnHome(){
    window.location.href = 'index.html';
}

function logOut(){
    document.cookie = `token=;SameSite=Lax`;
    window.location.href = '/login';
}