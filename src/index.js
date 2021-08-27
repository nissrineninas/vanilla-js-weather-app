let apiKey = "ab10edc1d32f1dd18832060f89f088c3";
let units = "metric";
let city = "Munich";
let today = new Date();
let temperature = null;
let form = document.querySelector("#search-form");
let fahrenheitLink = document.querySelector("#fahrenheit-convertor");
let celsiusLink = document.querySelector("#celsius-convertor");
let setCurrentLocation = document.querySelector("#current-location");

form.addEventListener("submit", searchCity);
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);
celsiusLink.addEventListener("click", showCelsiusTemperature);
setCurrentLocation.addEventListener("click", getCurrentLocation);

getCityWeather("Munich");
//unit controller
function unitDisplay() {
  let showWindUnit = document.querySelector("#wind-unit");

  let imperialWindSpeedUnit = " mph";
  let metricWindSpeedUnit = " m/s";

  if (celsiusLink.classList.contains("active") === true) {
    units = "metric";
    showWindUnit.innerHTML = metricWindSpeedUnit;
  } else {
    showFahrenheitTemperature;
    units = "imperial";
    showWindUnit.innerHTML = imperialWindSpeedUnit;
  }
  return units;
}
//current location button calls geolocation
function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(setLocation);
}
//append current location -geolocation- coordinatees to apiUrl
// then call on the displayWeather function to show weather
function setLocation(location) {
  let coordinates;
  let lat = location.coords.latitude;
  let lon = location.coords.longitude;
  coordinates = `lat=${lat}&lon=${lon}`;
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?${coordinates}&units=${unit}&appid=${apiKey}`;

  axios.get(apiUrl).then(displayTemperature);
}

//user clicks button to search for city
//function sends value to getCityWeather for api connection
function searchCity(event) {
  event.preventDefault();
  let getUserCity = document.querySelector("#city-input");
  city = getUserCity.value;
  getCityWeather(city);
}

//ajax call to connect to weather api
function getCityWeather(myCity) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  console.log("helpme");
  axios
    .get(apiUrl)
    .then(displayTemperature)
    .catch(function (error) {
      alert(
        "Sorry, that city doesn't seem to exist! Are you sure it is spelt right?"
      );
    });
}

// manipulate of the html content takes place here for weather data to display
function displayTemperature(response) {
  showDate(today);

  let latitude = response.data.coord.lat;
  let longitude = response.data.coord.lon;
  connectForecastWeatherApi(latitude, longitude, units);

  temperature = Math.round(response.data.main.temp);
  city = response.data.name;
  let searchedForCity = `${response.data.name}, ${response.data.sys.country}`;
  let weather = response.data.weather[0].main;
  let weatherdescription = response.data.weather[0].description;

  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let iconImage = response.data.weather[0].icon;
  let iconLink = `https://openweathermap.org/img/wn/${iconImage}.png`;
  let altText = response.data.weather[0].description;
  // weather last updated
  let lastUpdatedWeather = `weather data last updated at ${moment(
    response.data.dt,
    "X"
  ).format("HH:mm")}`;

  let showCity = document.querySelector("#city");
  let showWeatherDescription = document.querySelector("#weather-description");
  let showTemperature = document.querySelector("#temperature-display");
  let showHumidity = document.querySelector("#humidity");
  let showWind = document.querySelector("#wind");
  let showIcon = document.querySelector("#weather-icon");
  let showLastUpdated = document.querySelector("#show-last-updated");
  let showPrecipitation = document.querySelector("#precipitation");

  let showUnit = document.querySelector(".unit");
  showUnit.removeAttribute("hidden");

  showTemperature.innerHTML = temperature;
  showWeatherDescription.innerHTML = weatherdescription;
  showCity.innerHTML = searchedForCity;
  showHumidity.innerHTML = `Humidity: ${humidity} %`;
  showWind.innerHTML = `wind: ${wind}`;
  showIcon.removeAttribute("hidden");
  showIcon.setAttribute("src", iconLink);
  showIcon.setAttribute("alt", altText);
  showLastUpdated.innerHTML = lastUpdatedWeather;

  //control viewing the precipitation or the code breaks when there's no rain
  //with error "cannot set innerHTML to null"
  if (weather === "Rain") {
    let precipitation = response.data.rain["1h"].toFixed(1);
    showPrecipitation.removeAttribute("style");
    showPrecipitation.innerHTML = `Precipitaion: ${precipitation} mm<br/>`;
  } else {
    showPrecipitation.setAttribute("style", "display:none");
    precipitation = null;
    showPrecipitation.innerHTML = "";
  }
  unitDisplay();
}
//date function
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
//manipulating the units click-ability
//setting the data to desired unit view
//Fahrenheit view
function showFahrenheitTemperature(event) {
  event.preventDefault();
  //remove the active class from the celsius link
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  units = "imperial";
  getCityWeather(city);
}
//manipulating the units click-ability
//setting the data to desired unit view
//celsius view
function showCelsiusTemperature(event) {
  event.preventDefault();
  let showCelsiusTemperature = document.querySelector("#temperature-display");
  showCelsiusTemperature.innerHTML = temperature;
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  units = "metric";
  getCityWeather(city);
}
