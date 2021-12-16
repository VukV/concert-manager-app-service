window.addEventListener('load', init);

function init(){
    setHeader();

    //TODO buttons
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