function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  // let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
  let forecast = response.data.daily;

  forecast.forEach(function (forecastDay) {
    forecastHTML += `
              <div class="col-2 forecast-first-day">
                <div class="weather-forecast-date">${forecastDay.dt}</div>
                <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}.png"
                alt="forecast-icon"
                class="weather-forecast-icon"/>
                <div class="weather-forecast-temperature">
                  <span class="weather-forecast-temperature-max"> ${forecastDay.temp.max}°</span>
                  <span class="weather-forecast-temperature-min"> ${forecastDay.temp.min}°</span>
                </div>
              </div> `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function connectForecastWeatherApi(latitude, longitude) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=current,minutely,hourly&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
  console.log(apiUrl);
}
