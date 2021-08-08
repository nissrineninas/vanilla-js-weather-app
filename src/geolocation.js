let tempString;
let header = document.querySelector("#temperature-display");

function getLocation(location) {
  let coordinates;
  let lat = location.coords.latitude;
  let lon = location.coords.longitude;
  coordinates = `lat=${lat}&lon=${lon}`;
  let unit = "metric";
  let key = "ab10edc1d32f1dd18832060f89f088c3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?${coordinates}&units=${unit}&appid=${key}`;
  console.log(apiUrl);
  axios.get(`${apiUrl}`).then(locationTemperature);
}

function locationTemperature(response) {
  let myCity = response.data.name;
  let myCountru = response.data.sys.country;
  let myLocation = `${myCity}, ${myCountru}`;
  tempString = `your current location is ${myLocation}`;

  let myTemp = Math.round(response.data.main.temp);
  let weatherdescription = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let iconImage = response.data.weather[0].icon;
  let iconLink = `https://openweathermap.org/img/wn/${iconImage}.png`;
  let altText = response.data.weather[0].main;

  let displayCurrentLocation = document.querySelector("#city");
  let showWeatherDescription = document.querySelector("#weather-description");
  let showHumidity = document.querySelector("#humidity");
  let showWind = document.querySelector("#wind");
  let showIcon = document.querySelector("#weather-icon");

  displayCurrentLocation.innerHTML = tempString;
  showWeatherDescription.innerHTML = weatherdescription;
  showHumidity.innerHTML = humidity;
  showWind.innerHTML = wind;
  showIcon.setAttribute("src", iconLink);
  showIcon.setAttribute("alt", altText);

  header.innerHTML = myTemp;
}

navigator.geolocation.getCurrentPosition(getLocation);
