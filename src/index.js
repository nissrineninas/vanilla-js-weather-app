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
  fahrenheitLink.setAttribute("style", "display:unset");
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let showFahrenheitTemperature = document.querySelector(
    "#temperature-display"
  );
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  //remove the active class from the celsius link
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  showFahrenheitTemperature.innerHTML = fahrenheitTemperature;
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let showCelsiusTemperature = document.querySelector("#temperature-display");
  showCelsiusTemperature.innerHTML = celsiusTemperature;
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

let fahrenheitLink = document.querySelector("#fahrenheit-convertor");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-convertor");
celsiusLink.addEventListener("click", showCelsiusTemperature);
