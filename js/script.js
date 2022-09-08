const api = "1aaf122a75138e64c11cebcdab4a9129";


const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if(evt.keyCode == 13){
        getResults(searchbox.value);
        console.log(searchbox.value);
    }
}

function getResults (query){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&lang=pt_br&APPID=${api}`)
    .then(weather => {
        console.log(weather);
        return weather.json();
    }).then(displayResults);
}

function displayResults (weather){
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerHTML = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerHTML = `${Math.round(weather.main.temp_min)}°c / 
    ${Math.round(weather.main.tem_max)}°c`;
}

function dateBuilder (d){
    let months  = ["Janeiro","Fevereiro","Março","Abril", "Maio", "Junho",
"Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    let days = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira",
"Quinta-feira", "Sexta-feira", "Sábado"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}