// Project: Weather App
// JavaScript Course
// Golan van der Bend
// 09-04-2025

// API used = weatherapi.com
const website = "http://api.weatherapi.com/v1/current.json?key=";
const apiKey = "6412dd409c6f4dbfb9c135705251104&q=";
let searchRequest = 'Rosmalen';
const aqi = "&aqi=no";

let url = website + apiKey + searchRequest + aqi;
// Feel free to use promises or async/await in your code, though you should try to become 

//Promises example: 
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
        console.log(searchRequest, regionName, country);
        console.log(localTime);
        console.log('Het weer is:', temp_c, 'ºC', 'maar het voelt als', feelsLike_c, 'ºC');
        console.log(condition);
        return data;

    })
    .catch(error => {
        console.log('Er is iets mis', error);
    });

// async/await example: 
async function getInfo(){
    try {
        const response = await fetch(url);
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
        console.log('Het weer is:', data.current.temp_c + '°C');
    } 
    catch (error) {
        console.error('Er ging iets mis:', error);
    }
}

// Write the functions that hit the API. You’re going to want functions that can take a location and return the weather data for that location. For now, just console.log() the information.
function searchLocation(x){
   console.log(x); // returns user input
}

// changing the color of the background or by adding images that describe the weather.
function backgroundImage() {
    switch(expression) {
        case sunny: 
            // code block:
            break;
        case Cloudy: 
            // code block:
            break;
        case Rain: 
            // code block:
            break;
        case Storm: 
            // code block:
            break;
    }
}

function getTemperature(temperature) {
    console.log(temperature);
}

function getWeatherCondition(weatherCondition){
    console.log(weatherCondition);
}
// function getWeatherValues(){
//     let temperature = getTemperature;
//     let weatherCondition = getWeatherCondition;// Sun, Cloudy, Rain, Thunder, Snow 
// }

// Write the functions that process the JSON data you’re getting from the API and return an object with only the data you require for your app.

function processJSON(jsonFile){

}