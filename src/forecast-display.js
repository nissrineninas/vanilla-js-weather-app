function connectForecastWeatherApi(latitude, longitude) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=minutely,hourly&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
  console.log(apiUrl);
}
// alternatively this function can be used to display the forecast day
//  but it is too redundant in the code
// instead moment was used as it is much less code to write and repeat
// use  formatDay(forecastDay.dt) instead of day in displayForecast
// to show the day in the widget
// function formatDay(timestamp) {
//   let date = new Date(timestamp * 1000);
//   let day = date.getDay();
//   let days = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];
//   return days[day];
// }
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
