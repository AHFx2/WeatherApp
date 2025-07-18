const apiKey = "ba429b7053c94fed6c74ef1d270d5ea0";
const lang = "ar";

async function loadWeatherData(apiUrl) {
    let response = await fetch(apiUrl);

    if (response.ok) {
        document.querySelector("section.content:first-of-type").classList.add("show");
        document.querySelector("section.content:last-of-type").classList.remove("show");
        response.json().then((data) => fillWeatherInfo(data));
    }

    else {
        document.querySelector("section.content:first-of-type").classList.remove("show");
        document.querySelector("section.content:last-of-type").classList.add("show");
    }
    
}



function fillWeatherInfo(response) {
    let city = document.querySelector(".city-name");
    city.textContent = response.name;
    // let country = document.querySelector(".city-name > .country-code");
    // country.textContent = response.sys.country;
    let icon = document.querySelector(".main-info h4 .icon img");
    icon.src = handleImage(response.weather[0].icon);
    let temp = document.querySelector(".main-info h4 .text .temp");
    temp.innerHTML = Math.round(response.main.temp - 273.15) + "°c";
    let description = document.querySelector(".main-info h4 .text .description");
    description.textContent = response.weather[0].description;
    let feel = document.querySelector("#feel > .box-details p.value");
    feel.textContent = Math.round(response.main.feels_like - 273.15) + "°c"
    let humidity = document.querySelector("#humidity > .box-details p.value");
    humidity.textContent = response.main.humidity + "%";
    let wind = document.querySelector("#wind > .box-details p.value");
    wind.textContent = response.wind.speed + "km/h";
    let visibility = document.querySelector("#visibility > .box-details p.value");
    visibility.textContent = response.visibility / 1000 + "km";
}

function handleImage(iconCode) {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

function GetAPI(cityName) {
    return `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=${lang}&appid=${apiKey}`;
}

document.querySelector("input[type=\"submit\"]").addEventListener("click", (e) => {
    let cityName = document.querySelector("input[type=\"text\"]").value;
    loadWeatherData(GetAPI(cityName));
    
});