const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "77e14c2776adef163b515d6c78ddcbb2"

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }

    }
    else{
        displayError("Please enter a city");
    }

});

async function getWeatherData(city){

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    console.log(response);

    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }

    return await response.json();

}

function displayWeatherInfo(data){

    const {name: city, 
        main: {temp, humidity}, 
        weather: [{description, id}]} = data;  
    
    card.textContent= "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p"); 

    cityDisplay.textContent = city;
    tempDisplay.textContent = `Temperature: ${(temp - 273.15).toFixed(1)} °C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);


    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");
    

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
    
}

function getWeatherEmoji(weaherId){

    switch(true){
        case (weaherId >= 200 && weaherId < 300):
            return "⛈️";
        case (weaherId >= 300 && weaherId < 400):
            return "🌧️";
        case (weaherId >= 500 && weaherId < 600):
             return "🌧️";
        case (weaherId >= 600 && weaherId < 700):
            return "❄️";
        case (weaherId >= 700 && weaherId < 800):
                return "🌁";
        case (weaherId === 800 ):
            return "🌞";
        case (weaherId >= 801 &&  weaherId < 810):
            return "☁️";
        default:
            return "🦕";
    }
}

function displayError(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.computedStyleMap.display = "flex";
    card.appendChild(errorDisplay);
}