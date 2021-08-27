//connect to api using latitude and longitude for the forecast
function connectForecastWeatherApi(latitude, longitude, unit) {
  units = unit;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=${units}&exclude=minutely,hourly&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

//add html code for the forecast including the fetched data
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let forecast = response.data.daily;
  forecast.forEach((forecastDay, index) => {
    if (index <= 5) {
      let day = moment(forecastDay.dt, "X").format("ddd");
      forecastHTML += `
              <div class="col-2 forecast-first-day">
                <div class="weather-forecast-date">${day}</div>
                <img src="https://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }.png"
                alt="forecast-icon"
                class="weather-forecast-icon"/>
                <div class="weather-forecast-temperature">
                  <span class="weather-forecast-temperature-max"> ${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                  <span class="weather-forecast-temperature-min"> ${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                </div>
              </div> `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
