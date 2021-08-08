let apiKey = "ab10edc1d32f1dd18832060f89f088c3";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&units=metric&appid=${apiKey}`;
let today = new Date();

function formatDate(timestamp) {
  console.log(timestamp);
  let today = new Date();
  let hour = timestamp.getHours;
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[timestamp.getDay()];
  let minute = timestamp.getMinutes().toString().padStart(2, "0");
  let time = `${hour}:${minute}`;
  let showDate = `${day} ${time}`;
  return showDate;

  //   let showDateElement = document.querySelector("#show-date-time");
  //   showDateElement.innerHTML = formatDate(dateElement);
}

function displayTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let searchedForCity = `${response.data.name}, ${response.data.sys.country}`;
  let weatherdescription = response.data.weather[0].main;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);

  let dateElement = response.data.dt * 10000;

  let showCity = document.querySelector("#city");
  let showWeatherDescription = document.querySelector("#weather-description");
  let showTemperature = document.querySelector("#temperature-display");
  let showHumidity = document.querySelector("#humidity");
  let showWind = document.querySelector("#wind");

  showTemperature.innerHTML = temperature;
  showWeatherDescription.innerHTML = weatherdescription;
  showCity.innerHTML = searchedForCity;
  showHumidity.innerHTML = humidity;
  showWind.innerHTML = wind;
  showDate(today);
  formatDate(dateElement);
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
axios.get(apiUrl).then(displayTemperature);
