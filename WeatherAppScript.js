// Project: Weather App
// JavaScript Course
// Golan van der Bend
// 25-04-2025

////////////// HMTL buttons //////////////]
let buttonSearch = document.querySelector('#search');
let btnSearch = document.querySelector('#query');
let searchRequest = 'Rosmalen';

// DIV Vandaag info
let locatie = document.querySelector('.locatie');
let provincie = document.querySelector('.provincie');
let datumTijd = document.querySelector('.DatumTijd');

let temperatuur = document.querySelector('.Temperatuur');
let gevoelsTemp = document.querySelector('.GevoelsTemp');

// Extra
let extraTempMax = document.querySelector('.ExtraTempMax');
let extraTempMin = document.querySelector('.ExtraTempMin');
let extraTempNeerslag = document.querySelector('.ExtraTempNeerslag');
let UV = document.querySelector('.UV');
let zonsopkomst = document.querySelector('.Zonsopkomst');
let zondersondergang = document.querySelector('.Zondersondergang');

// Urenblok
    // Uren
let tijd = document.querySelectorAll('.Tijd');
let graden = document.querySelectorAll('.Graden');
let neerslag = document.querySelectorAll('.neerslag');

//Dagen
let dag = document.querySelectorAll('.Dag');
let regen = document.querySelectorAll('.regen');
let weekTempMax = document.querySelectorAll('.WeekTempMax');
let weekTempMin = document.querySelectorAll('.WeekTempMin');

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
            let localTime = data.location.localtime; // 2025-04-25 12:45
            let localTimeTijd = localTime.split(' ')[1];
            let localTimeJaar = localTime.split(' ')[0]
            let localTimeDisplay =  localTimeTijd + ' ' + localTimeJaar.split('-')[2] + '-' + localTimeJaar.split('-')[1] + '-' + localTimeJaar.split('-')[0] // 12:45 25-04-2025 
            let country = data.location.country;
            let condition = data.current.condition.text;
            // console.log(getLocation(), regionName, country);
            console.log(searchRequest, regionName, country);
            console.log(localTime, localTimeDisplay);
            console.log('Het weer is:', temp_c, 'ºC', 'maar het voelt als', feelsLike_c, 'ºC');
            console.log(condition);

            // Change html values
            locatie.innerHTML = searchRequest;
            provincie.innerHTML = regionName + ', ' + country;
            datumTijd.innerHTML = localTimeDisplay; //localTime;

            // convert AM/PM to 24hours --> sunrise, sunset
            function convertTime(time){
                const tijdString = time;
                const datum = new Date("1970-01-01 " + tijdString); // Je plakt er een datum bij
                const tijd24 = datum.toLocaleTimeString('nl-NL', { hour12: false }).slice(0, 5);
            return tijd24;
            }

            let enumator = 0; 
            let week = data.forecast.forecastday;
            console.log(data);
            week.forEach(index=> {
                console.log('enumator = ' + enumator);
                let datum = new Date(index.date);
                let vandaag = new Date();
                if (datum.toLocaleDateString() == vandaag.toLocaleDateString()) { // datum = vandaag. 
                    console.log('Vandaag', 'maximaal :', index.day.maxtemp_c, 'minimaal :', index.day.mintemp_c, 'hoeveelheid regen:', data.current.precip_mm, 'mm', 'UV - zonsterkte:', data.current.uv, 'zonsopkomst:', convertTime(index.astro.sunrise),'zondersondergang:', convertTime(index.astro.sunset));

                    dag[enumator].innerHTML = 'Vandaag';
                    regen[enumator].innerHTML = index.day.totalprecip_mm+ ' mm';
                    weekTempMax[enumator].innerHTML = 'Max. ' + index.day.maxtemp_c + ' ºC';
                    weekTempMin[enumator].innerHTML = 'Min. '+ index.day.mintemp_c + ' ºC';

                    // Extra
                    temperatuur.innerHTML = temp_c + ' ºC';
                    gevoelsTemp.innerHTML = 'Gevoeltemp. ' + feelsLike_c + ' ºC';
                    extraTempMax.innerHTML = 'Max. '+ index.day.maxtemp_c + ' ºC';
                    extraTempMin.innerHTML = 'Min. ' + index.day.mintemp_c + ' ºC';
                    extraTempNeerslag.innerHTML = data.current.precip_mm +  ' mm';
                    UV.innerHTML = 'UV ' + data.current.uv;
                    zonsopkomst.innerHTML = 'Zonsopkomst: ' + convertTime(index.astro.sunrise);
                    zondersondergang.innerHTML = 'Zonsondergang: ' + convertTime(index.astro.sunset);
                  
                    localTime = localTime.slice(11, 13); // "2025-04-18 - 12:05" --> 12
                    localTime = localTime -1; // Zonder de for loop op de correcte waarde start. 
                    let forLoop = 0;
                    for (let i = 0; i < 12; i++){
                        localTime = localTime + 1;
                        if (localTime > 23 && forLoop == 0) {
                            localTime = Number(0); // Als we voorbij de 23 uur gaan beginnen we met 00 tellen.
                            forLoop = 1;
                            console.log('tijd:', data.forecast.forecastday[1].hour[localTime].time.slice(11, 17), 'temperatuur:', data.forecast.forecastday[1].hour[localTime].temp_c, 'neerslag:', data.forecast.forecastday[1].hour[localTime].precip_mm, 'mm'); // morgen
                            // Uren html
                            tijd[i].innerHTML = data.forecast.forecastday[1].hour[localTime].time.slice(11, 17);
                            graden[i].innerHTML = data.forecast.forecastday[1].hour[localTime].temp_c + ' ºC';
                            neerslag[i].innerHTML = data.forecast.forecastday[1].hour[localTime].precip_mm + ' mm';
                        } else if (forLoop == 1) {
                            console.log('tijd:', data.forecast.forecastday[1].hour[localTime].time.slice(11, 17), 'temperatuur:', data.forecast.forecastday[1].hour[localTime].temp_c, 'neerslag:', data.forecast.forecastday[1].hour[localTime].precip_mm, 'mm'); // morgen
                            // Uren html
                            tijd[i].innerHTML = data.forecast.forecastday[1].hour[localTime].time.slice(11, 17);
                            graden[i].innerHTML = data.forecast.forecastday[1].hour[localTime].temp_c + ' ºC';
                            neerslag[i].innerHTML = data.forecast.forecastday[1].hour[localTime].precip_mm + ' mm';
                        } else {
                            console.log('tijd:', data.forecast.forecastday[0].hour[localTime].time.slice(11, 17), 'temperatuur:', data.forecast.forecastday[0].hour[localTime].temp_c, 'neerslag:', data.forecast.forecastday[0].hour[localTime].precip_mm, 'mm'); // vandaag // vandaag
                            // Uren html
                            tijd[i].innerHTML = data.forecast.forecastday[0].hour[localTime].time.slice(11, 17);
                            graden[i].innerHTML = data.forecast.forecastday[0].hour[localTime].temp_c + ' ºC';
                            neerslag[i].innerHTML = data.forecast.forecastday[0].hour[localTime].precip_mm + ' mm';
                        }


                        
                    }                  
                } else {
                    const datumNaarDag = datum.toLocaleDateString('nl-NL', { weekday: 'long' });
                    let datumDagHoofdletter = datumNaarDag.charAt(0).toUpperCase() + datumNaarDag.slice(1);
                    console.log(datumDagHoofdletter, 'maximaal :', index.day.maxtemp_c, 'minimaal :', index.day.mintemp_c, 'hoeveelheid regen:', index.day.totalprecip_mm, 'mm');
                    // Week info
                    // console.log('enumator = ' + enumator);
                    dag[enumator].innerHTML = datumDagHoofdletter;
                    regen[enumator].innerHTML = index.day.totalprecip_mm+ ' mm';
                    weekTempMax[enumator].innerHTML = 'Max. ' + index.day.maxtemp_c + ' ºC';
                    weekTempMin[enumator].innerHTML = 'Min. '+ index.day.mintemp_c + ' ºC';
                }
                enumator = enumator + 1;
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
