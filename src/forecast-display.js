function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
              <div class="col-2 forecast-first-day">
                <div class="weather-forecast-date">${day}</div>
                <img src="https://openweathermap.org/img/wn/01d.png"
                alt="forecast-icon"
                class="weather-forecast-icon"/>
                <div class="weather-forecast-temperature">
                  <span class="weather-forecast-temperature-max"> 18°</span>
                  <span class="weather-forecast-temperature-min"> 12°</span>
                </div>
              </div> `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
