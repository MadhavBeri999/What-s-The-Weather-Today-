const apiKey = "f0a9cddf3c5d5f190ecaf093847a9e77";
const form = document.querySelector("#for");
const results = document.querySelector("#weather-results");
const errorMessage = document.querySelector("#weather-error");

async function fetchJson(url) {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || `Request failed (${response.status})`);
    }

    return data;
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    results.hidden = true;
    errorMessage.hidden = true;

    const city = String(new FormData(form).get("City") || "").trim();
    if (!city) {
        errorMessage.textContent = "Please choose a city.";
        errorMessage.hidden = false;
        return;
    }

    try {
        const geocodingUrl = new URL("https://api.openweathermap.org/geo/1.0/direct");
        geocodingUrl.search = new URLSearchParams({
            q: `${city},IN`,
            limit: "1",
            appid: apiKey
        });

        const locations = await fetchJson(geocodingUrl);
        if (locations.length === 0) {
            throw new Error(`Couldn't find weather for ${city}.`);
        }

        const weatherUrl = new URL("https://api.openweathermap.org/data/2.5/weather");
        weatherUrl.search = new URLSearchParams({
            lat: locations[0].lat,
            lon: locations[0].lon,
            appid: apiKey,
            units: "metric"
        });

        const weather = await fetchJson(weatherUrl);
        document.querySelector("#temperature-value").textContent =
            `${weather.main.temp.toFixed(1)}°C`;
        document.querySelector("#feels-value").textContent =
            `${weather.main.feels_like.toFixed(1)}°C`;
        document.querySelector("#rain-value").textContent =
            weather.weather[0].description;
        document.querySelector("#wind-value").textContent =
            `${weather.wind.speed} m/s`;

        results.hidden = false;
    } catch (error) {
        errorMessage.textContent = `Unable to load weather: ${error.message}`;
        errorMessage.hidden = false;
        console.error(error);
    }
});
//The async await method

// const form = document.querySelector("#for");

// form.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const formData = new FormData(form);
//     const data = Object.fromEntries(formData);

//     const city = data.city;
//     const state = data.state;

//     let latitude;
//     let longitude;

//     try {

//         // STEP 1: Fetch latitude and longitude
//         let geoApi = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)},IN&limit=5&appid=${apiKey}`;

//         let geoResponse = await fetch(geoApi);

//         let geoData = await geoResponse.json();

//         if (!geoResponse.ok) {
//             throw new Error("Geocoding API failed");
//         }

//         if (geoData.length === 0) {
//             throw new Error("City not found");
//         }

//         // Match city and state
//         let location = geoData.find(place =>
//             place.name.toLowerCase() === city.toLowerCase() &&
//             place.state?.toLowerCase() === state.toLowerCase()
//         );

//         if (!location) {
//             throw new Error("City and state not found");
//         }

//         latitude = location.lat;
//         longitude = location.lon;

//         console.log("Latitude:", latitude);
//         console.log("Longitude:", longitude);


//         // STEP 2: Fetch weather information
//         let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

//         let response = await fetch(api);

//         let results = await response.json();

//         if (!response.ok) {
//             throw new Error("Weather API failed");
//         }


//         // STEP 3: Extract weather information
//         let temp = results.main.temp;
//         let feels = results.main.feels_like;
//         let rain = results.weather[0].description;
//         let wind = results.wind.speed;

//         console.log("Temperature:", temp);
//         console.log("Feels Like:", feels);
//         console.log("Weather:", rain);
//         console.log("Wind Speed:", wind);

//     }

//     catch (err) {
//         console.log("Error:", err.message);
//     }

// });



// the .then . catch method



// let latitude;
// let longitude;

// let geoApi = fetch(
//     `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)},IN&limit=5&appid=${apiKey}`
// );

// geoApi
//     .then((res) => {
//         if (!res.ok) {
//             throw new Error("Geocoding API request failed");
//         }

//         return res.json();
//     })

//     .then((data) => {

//         // Check whether location exists
//         if (data.length === 0) {
//             throw new Error("City not found");
//         }

//         latitude = data[0].lat;
//         longitude = data[0].lon;

//         console.log("Latitude:", latitude);
//         console.log("Longitude:", longitude);

//         // SECOND API CALL INSIDE FIRST API CALL

//         return fetch(
//             `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
//         );
//     })

//     .then((res) => {
//         if (!res.ok) {
//             throw new Error("Weather API request failed");
//         }

//         return res.json();
//     })

//     .then((weatherData) => {

//         // Now you have the actual weather object!

//         console.log(weatherData);

//         let temp = weatherData.main.temp;
//         let feels = weatherData.main.feels_like;
//         let rain = weatherData.weather[0].description;
//         let wind = weatherData.wind.speed;

//         console.log("Temperature:", temp);
//         console.log("Feels Like:", feels);
//         console.log("Weather:", rain);
//         console.log("Wind Speed:", wind);

//     })

//     .catch((err) => {
//         console.log("Error:", err.message);
//     });

