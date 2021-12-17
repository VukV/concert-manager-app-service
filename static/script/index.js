window.addEventListener('load', init);

function init(){

    document.getElementById("user-mgmt").addEventListener('click', e => setOnClick('users'));
    document.getElementById("band-mgmt").addEventListener('click', e => setOnClick('bands'));
    document.getElementById("concert-mgmt").addEventListener('click', e => setOnClick('concerts'));
    document.getElementById("venue-mgmt").addEventListener('click', e => setOnClick('venues'));
    document.getElementById("res-mgmt").addEventListener('click', e => setOnClick('reservations'));
}


function setOnClick(link){
    console.log(link);
    window.location.href = link + '.html';
}