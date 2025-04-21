// Project: Weather App
// JavaScript Course
// Golan van der Bend
// 21-04-2025

// Get search input 
function getLocation(){
    // Uiteindelijk moet je de input krijgen van de search bar. 
    // Voor nu houden we het even bij handmatig 'Rosmalen'
    let searchRequest = 'Rosmalen';
    return searchRequest;
}

// API used = weatherapi.com
function apiRequest(version, location){
    const website = "http://api.weatherapi.com/v1/";
    let api = version + ".json";
    const apiKey = "?key=6412dd409c6f4dbfb9c135705251104&q=";
    const aqi = "&days=7&aqi=no"; // vandaag plus 6 dagen en geen 'air quality information'

    let url = website + api + apiKey + location + aqi;
    return url
}
let url = apiRequest('forecast', getLocation()); // 'current' wheather info. 

// Feel free to use promises or async/await in your code, though you should try to become 

//Promises example: 
//get current Data
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
        console.log(getLocation(), regionName, country);
        console.log(localTime);
        console.log('Het weer is:', temp_c, 'ºC', 'maar het voelt als', feelsLike_c, 'ºC');
        console.log(condition);

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
        console.log('Er is iets mis', error);
    });

// async/await example: 
// get forecast data
// apiRequest('forecast', 'Rosmalen');

// async function getInfo(){
//     try {
//         const response = await fetch(url);
//         if (!response.ok) {
//         throw new Error('Network response was not ok');
//         }

//         const data = await response.json();
//         console.log(data);
//         return data;
//     } 
//     catch (error) {
//         console.error('Er ging iets mis:', error);
//     }
// }
// getInfo();

// // Write the functions that hit the API. You’re going to want functions that can take a location and return the weather data for that location. For now, just console.log() the information.
// function searchLocation(x){
//    console.log(x); // returns user input
// }

// // changing the color of the background or by adding images that describe the weather.
// function backgroundImage() {
//     switch(expression) {
//         case sunny: 
//             // code block:
//             break;
//         case Cloudy: 
//             // code block:
//             break;
//         case Rain: 
//             // code block:
//             break;
//         case Storm: 
//             // code block:
//             break;
//     }
// }

// function getTemperature(temperature) {
//     console.log(temperature);
// }

// function getWeatherCondition(weatherCondition){
//     console.log(weatherCondition);
// }
// // function getWeatherValues(){
// //     let temperature = getTemperature;
// //     let weatherCondition = getWeatherCondition;// Sun, Cloudy, Rain, Thunder, Snow 
// // }

// // Write the functions that process the JSON data you’re getting from the API and return an object with only the data you require for your app.

// function processJSON(jsonFile){

// }
