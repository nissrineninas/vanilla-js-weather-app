let city = "jordan";
let today = new Date();

function searchCity(event) {
  event.preventDefault();
  let getUserCity = document.querySelector("#city-input");
  city = getUserCity.value;
  getCityWeather(city);
}

//ajax call to connect to weather api
function getCityWeather(myCity) {
  let apiKey = "ab10edc1d32f1dd18832060f89f088c3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}

function displayTemperature(response) {
  celsiusTemperature = Math.round(response.data.main.temp);
  let searchedForCity = `${response.data.name}, ${response.data.sys.country}`;
  let weatherdescription = response.data.weather[0].main;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let iconImage = response.data.weather[0].icon;
  let iconLink = `https://openweathermap.org/img/wn/${iconImage}.png`;
  let altText = response.data.weather[0].description;

  let showCity = document.querySelector("#city");
  let showWeatherDescription = document.querySelector("#weather-description");
  let showCelsiusTemperature = document.querySelector("#temperature-display");
  let showHumidity = document.querySelector("#humidity");
  let showWind = document.querySelector("#wind");
  let showIcon = document.querySelector("#weather-icon");

  showCelsiusTemperature.innerHTML = celsiusTemperature;
  showWeatherDescription.innerHTML = weatherdescription;
  showCity.innerHTML = searchedForCity;
  showHumidity.innerHTML = humidity;
  showWind.innerHTML = wind;
  showIcon.setAttribute("src", iconLink);
  showIcon.setAttribute("alt", altText);

  showDate(today);
}

function showDate(today) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[today.getDay()];
  let hour = today.getHours();
  let minute = today.getMinutes().toString().padStart(2, "0");
  let time = `${hour}:${minute}`;
  let showDate = `${day} ${time}`;

  let displayNow = document.querySelector("#show-date");
  displayNow.innerHTML = showDate;
}

function showFahrenheitUnit() {
  fahrenheitTemperatureClicked.setAttribute("style", "display:unset");
}
function showFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  let showFahrenheitTemperature = document.querySelector(
    "#temperature-display"
  );
  showFahrenheitTemperature.innerHTML = fahrenheitTemperature;
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let showCelsiusTemperature = document.querySelector("#temperature-display");
  showCelsiusTemperature.innerHTML = celsiusTemperature;
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

let fahrenheitTemperatureClicked = document.querySelector(
  "#fahrenheit-convertor"
);
fahrenheitTemperatureClicked.addEventListener(
  "click",
  showFahrenheitTemperature
);

let celsiusTemperatureClicked = document.querySelector("#celsius-convertor");
celsiusTemperatureClicked.addEventListener("click", showCelsiusTemperature);
