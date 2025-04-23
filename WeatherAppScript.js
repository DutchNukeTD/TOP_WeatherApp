// Project: Weather App
// JavaScript Course
// Golan van der Bend
// 23-04-2025


////////////// HMTL buttons //////////////]
let buttonSearch = document.querySelector('#search');
let btnSearch = document.querySelector('#query');
let searchRequest = 'Rosmalen';

// DIV Vandaag info
let locatie = document.querySelector('.locatie');
let provincie = document.querySelector('.provincie');
let Land = document.querySelector('.Land');
let DatumTijd = document.querySelector('.DatumTijd');



//Promises example: 
//get current Data
function fetchData(url){
    fetch(url) 
        .then(response =>{
            if (!response.ok) {
                throw new Error('Request was is goed');
            }
            return response.json();
        })
        .then(data => {
            let temp_c = data.current.temp_c;
            let feelsLike_c = data.current.feelslike_c;
            let regionName = data.location.region;
            let localTime = data.location.localtime;
            let country = data.location.country;
            let condition = data.current.condition.text;
            // console.log(getLocation(), regionName, country);
            console.log(searchRequest, regionName, country);
            console.log(localTime);
            console.log('Het weer is:', temp_c, 'ºC', 'maar het voelt als', feelsLike_c, 'ºC');
            console.log(condition);

            // Change html values
            locatie.innerHTML = searchRequest;
            provincie.innerHTML = regionName;
            Land.innerHTML = country;
            DatumTijd.innerHTML = localTime;


            // convert AM/PM to 24hours --> sunrise, sunset
            function convertTime(time){
                const tijdString = time;
                const datum = new Date("1970-01-01 " + tijdString); // Je plakt er een datum bij
                const tijd24 = datum.toLocaleTimeString('nl-NL', { hour12: false }).slice(0, 5);
            return tijd24;
            }

            let week = data.forecast.forecastday;
            week.forEach(index=> {
                let datum = new Date(index.date);
                let vandaag = new Date();
                if (datum.toLocaleDateString() == vandaag.toLocaleDateString()) { // datum = vandaag. 
                    console.log('Vandaag', 'maximaal :', index.day.maxtemp_c, 'minimaal :', index.day.mintemp_c, 'hoeveelheid regen:', data.current.precip_mm, 'mm', 'UV - zonsterkte:', data.current.uv, 'zonsopkomst:', convertTime(index.astro.sunrise),'zondersondergang:', convertTime(index.astro.sunset));
                    localTime = localTime.slice(11, 13); // "2025-04-18 - 12:05" --> 12
                    localTime = localTime -1; // Zonder de for loop op de correcte waarde start. 
                    let forLoop = 0;
                    for (let i = 0; i < 12; i++){
                        localTime = localTime + 1;
                        if (localTime > 23 && forLoop == 0) {
                            localTime = Number(0); // Als we voorbij de 23 uur gaan beginnen we met 00 tellen.
                            forLoop = 1;
                            console.log('tijd:', data.forecast.forecastday[1].hour[localTime].time.slice(11, 17), 'temperatuur:', data.forecast.forecastday[1].hour[localTime].temp_c, 'neerslag:', data.forecast.forecastday[1].hour[localTime].precip_mm, 'mm'); // morgen
                        } else if (forLoop == 1) {
                            console.log('tijd:', data.forecast.forecastday[1].hour[localTime].time.slice(11, 17), 'temperatuur:', data.forecast.forecastday[1].hour[localTime].temp_c, 'neerslag:', data.forecast.forecastday[1].hour[localTime].precip_mm, 'mm'); // morgen
                        } else {
                            console.log('tijd:', data.forecast.forecastday[0].hour[localTime].time.slice(11, 17), 'temperatuur:', data.forecast.forecastday[0].hour[localTime].temp_c, 'neerslag:', data.forecast.forecastday[0].hour[localTime].precip_mm, 'mm'); // vandaag // vandaag
                        }
                        
                    }
                } else {
                    const datumNaarDag = datum.toLocaleDateString('nl-NL', { weekday: 'long' });
                    let datumDagHoofdletter = datumNaarDag.charAt(0).toUpperCase() + datumNaarDag.slice(1);
                    console.log(datumDagHoofdletter, 'maximaal :', index.day.maxtemp_c, 'minimaal :', index.day.mintemp_c, 'hoeveelheid regen:', index.day.totalprecip_mm, 'mm');
                }
            });
            return data;

        })
        .catch(error => {
            console.log(url);
            console.log('Er is iets mis', error);
        });
};

// API used = weatherapi.com
function apiRequest(version, location){
    if (location == ''){
        // do nothing
    }
    else {
        const website = "http://api.weatherapi.com/v1/";
        let api = version + ".json";
        const apiKey = "?key=6412dd409c6f4dbfb9c135705251104&q=";
        const aqi = "&days=7&aqi=no"; // vandaag plus 6 dagen en geen 'air quality information'

        let url = website + api + apiKey + location + aqi;
        // console.log(url);
        // return url
        fetchData(url);
    }
    
}

// Making sure that the first time opening the website it's on Rosmalen. 
let count = 0; 


////////////// Events //////////////
buttonSearch.addEventListener('click', (event) => {
    event.preventDefault();
    searchRequest = btnSearch.value;
    console.log(searchRequest);
    let url = apiRequest('forecast', searchRequest); // functie oproepen
    return searchRequest;
})

/////// AT START ///////
let url = apiRequest('forecast', searchRequest)
////////////////////////
